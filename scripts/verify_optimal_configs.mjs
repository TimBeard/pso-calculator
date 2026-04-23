import {
  CHARACTER_CLASS_MAX_STATS,
  INITIAL_CLASS_LEVEL_STATS,
  HUMAR_OPTIMAL_CONFIG,
  HUNEWEARL_OPTIMAL_CONFIG,
  HUCAST_OPTIMAL_CONFIG,
  HUCASEAL_OPTIMAL_CONFIG,
  RAMAR_OPTIMAL_CONFIG,
  RAMARL_OPTIMAL_CONFIG,
  RACAST_OPTIMAL_CONFIG,
  RACASEAL_OPTIMAL_CONFIG,
  FOMAR_OPTIMAL_CONFIG,
  FOMARL_OPTIMAL_CONFIG,
  FONEWM_OPTIMAL_CONFIG,
  FONEWEARL_OPTIMAL_CONFIG,
  CHARACTER_UNIT_OPTIONS,
  CHARACTER_WEAPON_OPTIONS,
  CHARACTER_ARMOR_OPTIONS,
  CHARACTER_SHIELD_OPTIONS,
} from '../packages/shared/dist/index.js'

const isCompat = (item, classId) =>
  item && (item.compatibleClasses === 'all' || (Array.isArray(item.compatibleClasses) && item.compatibleClasses.includes(classId)))

const configs = {
  humar: HUMAR_OPTIMAL_CONFIG,
  hunewearl: HUNEWEARL_OPTIMAL_CONFIG,
  hucast: HUCAST_OPTIMAL_CONFIG,
  hucaseal: HUCASEAL_OPTIMAL_CONFIG,
  ramar: RAMAR_OPTIMAL_CONFIG,
  ramarl: RAMARL_OPTIMAL_CONFIG,
  racast: RACAST_OPTIMAL_CONFIG,
  racaseal: RACASEAL_OPTIMAL_CONFIG,
  fomar: FOMAR_OPTIMAL_CONFIG,
  fomarl: FOMARL_OPTIMAL_CONFIG,
  fonewm: FONEWM_OPTIMAL_CONFIG,
  fonewearl: FONEWEARL_OPTIMAL_CONFIG,
}

for (const [classId, cfg] of Object.entries(configs)) {
  const base = INITIAL_CLASS_LEVEL_STATS.find(e => e.classId === classId && e.level === 200)
  const caps = CHARACTER_CLASS_MAX_STATS[classId]
  const slots = [cfg.unitSlot1Id, cfg.unitSlot2Id, cfg.unitSlot3Id, cfg.unitSlot4Id]
  const u = { atp: 0, dfp: 0, mst: 0, ata: 0, evp: 0, lck: 0 }
  for (const s of slots) {
    const unit = CHARACTER_UNIT_OPTIONS.find(x => x.id === s)
    if (!unit) continue
    u.atp += unit.bonuses.atp
    u.dfp += unit.bonuses.dfp
    u.mst += unit.bonuses.mst
    u.ata += unit.bonuses.ata
    u.evp += unit.bonuses.evp
    u.lck += unit.bonuses.lck
  }
  const m = cfg.materials
  const stats = {
    atp: Math.min(base.atp + cfg.magPow * 2 + m.power * 2 + u.atp, caps.atp),
    dfp: Math.min(base.dfp + cfg.magDef + m.def * 2 + u.dfp, caps.dfp),
    mst: Math.min(base.mst + cfg.magMind + m.mind * 2 + u.mst, caps.mst),
    ata: Math.min(base.ata + Math.floor(cfg.magDex / 2) + u.ata, caps.ata),
    evp: Math.min(base.evp + m.evade * 2 + u.evp, caps.evp),
    lck: Math.min(base.lck + m.luck * 2 + u.lck, caps.lck),
  }
  const matsReg = m.power + m.def + m.mind + m.evade + m.luck
  const matLimit = ['humar', 'ramar', 'ramarl', 'fomar', 'fomarl'].includes(classId) ? 250 : 150
  const magTotal = cfg.magDef + cfg.magPow + cfg.magDex + cfg.magMind
  const issues = []
  for (const k of ['atp', 'dfp', 'mst', 'ata', 'evp', 'lck']) {
    if (stats[k] !== caps[k]) issues.push(`${k.toUpperCase()}=${stats[k]}/${caps[k]}`)
  }
  if (matsReg > matLimit) issues.push(`MATS_OVER=${matsReg}/${matLimit}`)
  if (magTotal > 200) issues.push(`MAG_OVER=${magTotal}/200`)
  if (cfg.magDef < 5) issues.push(`MAG_DEF<5=${cfg.magDef}`)

  const weapon = CHARACTER_WEAPON_OPTIONS.find(x => x.id === cfg.weaponId)
  if (!isCompat(weapon, classId)) issues.push(`weapon_incompat=${cfg.weaponId}`)
  const armor = CHARACTER_ARMOR_OPTIONS.find(x => x.id === cfg.armorId)
  if (!isCompat(armor, classId)) issues.push(`armor_incompat=${cfg.armorId}`)
  const shield = CHARACTER_SHIELD_OPTIONS.find(x => x.id === cfg.shieldId)
  if (!isCompat(shield, classId)) issues.push(`shield_incompat=${cfg.shieldId}`)
  for (const slot of ['unitSlot1Id', 'unitSlot2Id', 'unitSlot3Id', 'unitSlot4Id']) {
    if (cfg[slot] === 'none') continue
    const unit = CHARACTER_UNIT_OPTIONS.find(x => x.id === cfg[slot])
    if (!isCompat(unit, classId)) issues.push(`${slot}_incompat=${cfg[slot]}`)
  }

  const status = issues.length === 0 ? 'ALL CAPS ✓' : issues.join(' ')
  console.log(`${classId.padEnd(10)} mats=${String(matsReg).padStart(3)}/${matLimit} mag=${magTotal}/200  ${status}`)
}
