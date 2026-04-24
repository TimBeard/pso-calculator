#!/usr/bin/env node
// Optimizer: per-class L200 build maximizing the # of stats hitting their cap.
// Same global params: Ultimate, Solo, Shifta 81, Zalure 30.
//
// Strategy: enumerate 4-unit combinations (with replacement) from a curated candidate set.
// For each combo, analytically allocate MAG (200 pts, def≥5) and regular materials (limit 150/250)
// to fill remaining cap deficits using cheapest source first.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  CHARACTER_CLASS_IDS,
  CHARACTER_ARMOR_OPTIONS,
  CHARACTER_SHIELD_OPTIONS,
  CHARACTER_UNIT_OPTIONS,
  CHARACTER_WEAPON_OPTIONS,
  CHARACTER_RANGED_WEAPON_TYPES,
  CHARACTER_MATERIAL_LIMITS,
  CHARACTER_ANDROID_CLASS_IDS,
  INITIAL_CLASS_LEVEL_STATS,
  CHARACTER_CLASS_MAX_STATS,
  characterConfigSchema,
  createBaseCharacterConfigForClass,
  getRegularMaterialLimit,
} from '../packages/shared/dist/index.js'

const CAPPED_STATS = ['atp', 'dfp', 'mst', 'ata', 'evp', 'lck']

const HUNTER_CLASS_IDS = ['humar', 'hunewearl', 'hucast', 'hucaseal']
const RANGER_CLASS_IDS = ['ramar', 'ramarl', 'racast', 'racaseal']
const FORCE_CLASS_IDS = ['fomar', 'fomarl', 'fonewm', 'fonewearl']
const MELEE_WEAPON_TYPES = new Set(['Saber', 'Sword', 'Dagger', 'Partisan', 'Slicer', 'Double Saber', 'Claw', 'Katana', 'Twin Sword', 'Fist'])
const RANGED_WEAPON_TYPES = new Set(CHARACTER_RANGED_WEAPON_TYPES)
const FORCE_WEAPON_TYPES = new Set(['Cane', 'Rod', 'Wand', 'Card'])

const isCompat = (o, classId) => o.compatibleClasses === 'all' || o.compatibleClasses.includes(classId)

function pickWeapon(classId) {
  let allowedTypes
  let scoreFn
  if (HUNTER_CLASS_IDS.includes(classId)) {
    allowedTypes = MELEE_WEAPON_TYPES
    scoreFn = (w) => w.atpMax + (w.bonuses?.atp ?? 0)
  } else if (RANGER_CLASS_IDS.includes(classId)) {
    allowedTypes = RANGED_WEAPON_TYPES
    scoreFn = (w) => w.atpMax + (w.bonuses?.atp ?? 0)
  } else {
    allowedTypes = FORCE_WEAPON_TYPES
    scoreFn = (w) => w.bonuses?.mst ?? 0
  }
  const candidates = CHARACTER_WEAPON_OPTIONS.filter(w => w.id !== 'none' && allowedTypes.has(w.type) && isCompat(w, classId))
  if (candidates.length === 0) return null
  return candidates.reduce((a, b) => (scoreFn(b) > scoreFn(a) ? b : a))
}

function pickArmor(classId) {
  return CHARACTER_ARMOR_OPTIONS
    .filter(o => o.id !== 'none' && isCompat(o, classId))
    .reduce((a, b) => (b.dfpMax + b.evpMax > a.dfpMax + a.evpMax ? b : a))
}
function pickShield(classId) {
  return CHARACTER_SHIELD_OPTIONS
    .filter(o => o.id !== 'none' && isCompat(o, classId))
    .reduce((a, b) => {
      const sa = a.dfpMax + a.evpMax + (a.atp ?? 0) * 2
      const sb = b.dfpMax + b.evpMax + (b.atp ?? 0) * 2
      return sb > sa ? b : a
    })
}

function unitCandidates(classId) {
  const ids = [
    'heavenly_power', 'god_power',
    'heavenly_body', 'god_body',
    'heavenly_mind', 'god_mind',
    'heavenly_arms', 'adept', 'god_arm',
    'heavenly_legs', 'god_legs',
    'heavenly_luck', 'god_luck',
    'heavenly_hp', 'god_hp',
    'heavenly_tp', 'god_tp',
    'heavenly_ability', 'centurion_ability', 'god_ability',
    'v101',
  ]
  return ids
    .map(id => CHARACTER_UNIT_OPTIONS.find(u => u.id === id))
    .filter(u => u && isCompat(u, classId))
}

function unitTotal(units) {
  const t = { hp: 0, tp: 0, atp: 0, dfp: 0, mst: 0, ata: 0, evp: 0, lck: 0 }
  for (const u of units) for (const k of Object.keys(t)) t[k] += u[k] ?? 0
  return t
}

// Allocate MAG (def fixed at 5, remaining 195 across pow/dex/mind) and materials
// to maximize number of capped stats reached, given units already chosen.
function allocateForUnits(classId, levelStats, ut) {
  const caps = CHARACTER_CLASS_MAX_STATS[classId]
  const isAndroid = CHARACTER_ANDROID_CLASS_IDS.includes(classId)
  const tpMax = isAndroid ? 0 : CHARACTER_MATERIAL_LIMITS.tpMax
  const regularLimit = getRegularMaterialLimit(classId)

  // Deficit (pre-mag, pre-mat) — what we still need from mag+mats to reach cap
  const def0 = {}
  for (const k of CAPPED_STATS) def0[k] = Math.max(0, caps[k] - (levelStats[k] ?? 0) - ut[k])

  // mag def=5 is fixed and contributes 5 to DFP
  let dfpDeficit = Math.max(0, def0.dfp - 5)

  // Initialize allocations
  let magPow = 0, magDex = 0, magMind = 0
  const mats = { hp: CHARACTER_MATERIAL_LIMITS.hpMax, tp: tpMax, power: 0, def: 0, mind: 0, evade: 0, luck: 0 }

  // 1) ATA — only via magDex (÷2). magDex needed = 2*deficitATA, capped at 195
  const ataNeed = Math.min(195, def0.ata * 2)
  magDex = ataNeed
  let magBudget = 195 - magDex

  // 2) LCK — only via mat luck (×2), max 45 mats (LCK base 10 + 90 = 100)
  const luckNeed = Math.min(45, Math.ceil(def0.lck / 2))
  mats.luck = luckNeed
  let matBudget = regularLimit - mats.luck

  // 3) EVP — only via mat evade (×2)
  const evadeNeed = Math.min(matBudget, Math.ceil(def0.evp / 2))
  mats.evade = evadeNeed
  matBudget -= mats.evade

  // 4) DFP — prefer mat def (×2) over mag def (×1)
  if (dfpDeficit > 0) {
    const defNeed = Math.min(matBudget, Math.ceil(dfpDeficit / 2))
    mats.def = defNeed
    matBudget -= mats.def
    dfpDeficit -= defNeed * 2
  }
  // Fallback to mag pts for DFP
  if (dfpDeficit > 0 && magBudget > 0) {
    const used = Math.min(magBudget, dfpDeficit)
    // We model this by reducing the "free" portion and adding to magPow/Mind decisions later.
    // Easiest: keep extra magDef beyond 5 — but mag total is hard-capped at 200 with def already 5.
    // Adjust: instead allocate from magBudget to a phantom slot — but mag schema only has 4. We'll add to magMind and accept it was for DFP indirectly? No — magMind only boosts MST.
    // Actually we can lift magDef above 5 (it gives +1 DFP per pt, capped at 200 def total).
    // The schema allows magDef up to 200 — so we can push more into magDef. Let's redo with variable magDef.
    // (Restart this branch using magDef extra.)
  }

  // 5) MST — mat mind (×2) or magMind (×1)
  let mstDeficit = def0.mst
  if (mstDeficit > 0) {
    const mindMatNeed = Math.min(matBudget, Math.ceil(mstDeficit / 2))
    mats.mind = mindMatNeed
    matBudget -= mats.mind
    mstDeficit -= mindMatNeed * 2
  }
  if (mstDeficit > 0) {
    const magMindNeed = Math.min(magBudget, mstDeficit)
    magMind += magMindNeed
    magBudget -= magMindNeed
    mstDeficit -= magMindNeed
  }

  // 6) ATP — mat power (×2) or magPow (×2). Prefer the one with budget.
  let atpDeficit = def0.atp
  if (atpDeficit > 0) {
    const powMatNeed = Math.min(matBudget, Math.ceil(atpDeficit / 2))
    mats.power = powMatNeed
    matBudget -= mats.power
    atpDeficit -= mats.power * 2
  }
  if (atpDeficit > 0) {
    const magPowNeed = Math.min(magBudget, Math.ceil(atpDeficit / 2))
    magPow += magPowNeed
    magBudget -= magPowNeed
    atpDeficit -= magPow * 2
  }

  // Spend remaining mat budget on POW (offensive bonus, even past cap)
  if (matBudget > 0) {
    mats.power += matBudget
    matBudget = 0
  }
  // Spend remaining mag budget on POW too
  if (magBudget > 0) {
    magPow += magBudget
    magBudget = 0
  }

  // Re-handle DFP shortfall by raising magDef (mag total still ≤ 200 because we have def=5 + (pow+dex+mind))
  // After all the above, magPow + magDex + magMind ≤ 195. We can lift magDef to absorb leftover deficit.
  let magDef = 5
  if (dfpDeficit > 0) {
    const headroom = 200 - (magDef + magPow + magDex + magMind)
    const add = Math.min(headroom, dfpDeficit, 200 - magDef)
    magDef += add
    dfpDeficit -= add
  }

  return { magDef, magPow, magDex, magMind, mats }
}

function computeStats(classId, levelStats, mag, mats, units, weaponBonus = null) {
  const ut = unitTotal(units)
  const caps = CHARACTER_CLASS_MAX_STATS[classId]
  const wb = weaponBonus ?? { hp: 0, tp: 0, atp: 0, dfp: 0, mst: 0, ata: 0, evp: 0, lck: 0 }
  const result = {}
  for (const k of CAPPED_STATS) {
    let raw = (levelStats[k] ?? 0) + ut[k] + (wb[k] ?? 0)
    if (k === 'atp') raw += mag.magPow * 2 + mats.power * 2
    if (k === 'dfp') raw += mag.magDef + mats.def * 2
    if (k === 'mst') raw += mag.magMind + mats.mind * 2
    if (k === 'ata') raw += Math.floor(mag.magDex / 2)
    if (k === 'evp') raw += mats.evade * 2
    if (k === 'lck') raw += mats.luck * 2
    result[k] = { raw, capped: Math.min(raw, caps[k]), cap: caps[k] }
  }
  result.hp = { raw: (levelStats.hp ?? 0) + mats.hp * 2 + ut.hp + (wb.hp ?? 0) }
  result.tp = { raw: (levelStats.tp ?? 0) + mats.tp * 2 + ut.tp + (wb.tp ?? 0) }
  return result
}

const V101_PREFERRED_CLASS_IDS = new Set([...HUNTER_CLASS_IDS, ...RANGER_CLASS_IDS, 'fomar'])

function score(stats, units, classId) {
  // Lexicographic: cap count >> v101 count (for preferred classes) >> partial cap fill + hp/tp
  let capCount = 0
  let partial = 0
  for (const k of CAPPED_STATS) {
    if (stats[k].raw >= stats[k].cap) capCount++
    else partial += stats[k].raw / stats[k].cap
  }
  const v101Raw = units.filter(u => u.id === 'v101').length
  // Penalize having more than one V101 (no extra benefit, wastes a slot)
  if (v101Raw > 1) return -Infinity
  const v101Count = V101_PREFERRED_CLASS_IDS.has(classId) ? v101Raw : 0
  const hpTp = (stats.hp.raw + stats.tp.raw) / 100000
  return capCount * 1e6 + v101Count * 1e3 + partial + hpTp
}

function optimizeClass(classId) {
  const levelStats = INITIAL_CLASS_LEVEL_STATS.find(e => e.classId === classId && e.level === 200)
  const armor = pickArmor(classId)
  const shield = pickShield(classId)
  const weapon = pickWeapon(classId)
  const candidates = unitCandidates(classId)
  const n = candidates.length

  // Treat weapon bonuses (atp/dfp/mst/ata/evp/lck/hp/tp) like a fixed stat addition
  const weaponBonus = { hp: 0, tp: 0, atp: 0, dfp: 0, mst: 0, ata: 0, evp: 0, lck: 0 }
  if (weapon) for (const k of Object.keys(weaponBonus)) weaponBonus[k] += weapon.bonuses?.[k] ?? 0

  let best = null, bestScore = -Infinity

  for (let a = 0; a < n; a++) {
    for (let b = a; b < n; b++) {
      for (let c = b; c < n; c++) {
        for (let d = c; d < n; d++) {
          const units = [candidates[a], candidates[b], candidates[c], candidates[d]]
          const ut = unitTotal(units)
          // Fold weapon bonuses into unit total for deficit calc
          const utWithWeapon = { ...ut }
          for (const k of Object.keys(weaponBonus)) utWithWeapon[k] += weaponBonus[k]
          const alloc = allocateForUnits(classId, levelStats, utWithWeapon)
          const stats = computeStats(classId, levelStats, alloc, alloc.mats, units, weaponBonus)
          const sc = score(stats, units, classId)
          if (sc > bestScore) { bestScore = sc; best = { units, alloc, stats } }
        }
      }
    }
  }

  return { classId, levelStats, armor, shield, weapon, ...best }
}

const labels = {
  humar: 'HUmar', hunewearl: 'HUnewearl', hucast: 'HUcast', hucaseal: 'HUcaseal',
  ramar: 'RAmar', ramarl: 'RAmarl', racast: 'RAcast', racaseal: 'RAcaseal',
  fomar: 'FOmar', fomarl: 'FOmarl', fonewm: 'FOnewm', fonewearl: 'FOnewearl',
}

function pickClassConfig(c) {
  return {
    level: c.level, attackType: c.attackType, weaponId: c.weaponId, specialId: c.specialId,
    grind: c.grind, weaponAttributes: { ...c.weaponAttributes },
    armorId: c.armorId, armorDfp: c.armorDfp, armorEvp: c.armorEvp,
    shieldId: c.shieldId, shieldDfp: c.shieldDfp, shieldEvp: c.shieldEvp,
    magDef: c.magDef, magPow: c.magPow, magDex: c.magDex, magMind: c.magMind,
    materials: { ...c.materials },
    unitSlot1Id: c.unitSlot1Id, unitSlot2Id: c.unitSlot2Id, unitSlot3Id: c.unitSlot3Id, unitSlot4Id: c.unitSlot4Id,
  }
}

function toUrlSafeBase64(v) { return v.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '') }
function encode(state) {
  const payload = { v: 5, a: state.activeClassId, s: state.shiftaLevel, z: state.zalureLevel, d: state.difficulty, g: state.gameMode, c: state.perClass }
  return toUrlSafeBase64(Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64'))
}

const allConfigs = {}
const summaries = []

for (const classId of CHARACTER_CLASS_IDS) {
  process.stderr.write(`Optimizing ${classId}... `)
  const opt = optimizeClass(classId)
  process.stderr.write('done\n')

  const base = createBaseCharacterConfigForClass(classId)
  const cfg = {
    ...base,
    level: 200, difficulty: 'ultimate', gameMode: 'oneperson',
    shiftaLevel: 81, zalureLevel: 30,
    weaponId: opt.weapon ? opt.weapon.id : base.weaponId,
    grind: opt.weapon ? opt.weapon.maxGrind : base.grind,
    specialId: 'none',
    weaponAttributes: { enemy: 0, hit: 0 },
    armorId: opt.armor.id,
    armorDfp: opt.armor.dfpMax - opt.armor.dfpMin,
    armorEvp: opt.armor.evpMax - opt.armor.evpMin,
    shieldId: opt.shield.id,
    shieldDfp: opt.shield.dfpMax - opt.shield.dfpMin,
    shieldEvp: opt.shield.evpMax - opt.shield.evpMin,
    magDef: opt.alloc.magDef, magPow: opt.alloc.magPow, magDex: opt.alloc.magDex, magMind: opt.alloc.magMind,
    materials: opt.alloc.mats,
    unitSlot1Id: opt.units[0].id,
    unitSlot2Id: opt.units[1].id,
    unitSlot3Id: opt.units[2].id,
    unitSlot4Id: opt.units[3].id,
  }
  const parsed = characterConfigSchema.safeParse(cfg)
  if (!parsed.success) {
    console.error(`\nValidation FAILED for ${classId}:`, JSON.stringify(parsed.error.format(), null, 2))
    process.exit(1)
  }
  allConfigs[classId] = pickClassConfig(parsed.data)
  summaries.push({ classId, opt })
}

const combined = encode({
  activeClassId: 'humar', shiftaLevel: 81, zalureLevel: 30,
  difficulty: 'ultimate', gameMode: 'oneperson', perClass: allConfigs,
})

console.log('=== Stats summary (raw/cap) ===')
for (const { classId, opt } of summaries) {
  const s = opt.stats
  const cappedCount = CAPPED_STATS.filter(k => s[k].raw >= s[k].cap).length
  const statStr = CAPPED_STATS.map(k => {
    const ok = s[k].raw >= s[k].cap ? '✓' : ' '
    return `${k.toUpperCase()}=${s[k].raw}/${s[k].cap}${ok}`
  }).join('  ')
  console.log(`${labels[classId].padEnd(10)} [${cappedCount}/6]  ${statStr}`)
}

console.log('\n=== Build per class ===')
for (const { classId, opt } of summaries) {
  const wInfo = opt.weapon
    ? `${opt.weapon.id} (${opt.weapon.type}, ATP=${opt.weapon.atpMax}, +ATP ${opt.weapon.bonuses?.atp ?? 0}, +MST ${opt.weapon.bonuses?.mst ?? 0})`
    : '(default)'
  console.log(`${labels[classId]}: weapon=${wInfo}`)
  console.log(`  armor=${opt.armor.id} shield=${opt.shield.id}`)
  console.log(`  units=${opt.units.map(u => u.id).join(', ')}`)
  console.log(`  mag def=${opt.alloc.magDef} pow=${opt.alloc.magPow} dex=${opt.alloc.magDex} mind=${opt.alloc.magMind}`)
  console.log(`  mats hp=${opt.alloc.mats.hp} tp=${opt.alloc.mats.tp} pow=${opt.alloc.mats.power} def=${opt.alloc.mats.def} mind=${opt.alloc.mats.mind} evade=${opt.alloc.mats.evade} luck=${opt.alloc.mats.luck}`)
}

const baseUrl = process.env.BASE_URL ?? '/pso-calculator/'
console.log('\n=== Combined URL (all 12 classes loaded, active=HUmar) ===')
console.log(`${baseUrl}?c=${combined}`)

// Dump per-class optimal configs as a TypeScript module for embedding in @pso/shared.
const outPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'shared', 'src', 'optimalCharacterConfigs.ts')
const tsBody = `// AUTO-GENERATED by scripts/generate_optimal_urls.mjs. Do not edit by hand.
import type { CharacterClassId, CharacterConfigInput } from './index.js'

export type OptimalCharacterClassConfig = Omit<
  CharacterConfigInput,
  'classId' | 'shiftaLevel' | 'zalureLevel' | 'difficulty' | 'gameMode'
>

export const OPTIMAL_CHARACTER_CONFIGS: Record<CharacterClassId, OptimalCharacterClassConfig> = ${JSON.stringify(allConfigs, null, 2)} as const
`
writeFileSync(outPath, tsBody, 'utf-8')
console.log(`\nWrote optimal per-class configs to ${outPath}`)
