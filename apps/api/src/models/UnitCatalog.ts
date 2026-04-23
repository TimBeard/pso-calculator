import { CHARACTER_CLASS_IDS, CHARACTER_UNIT_VALUE_IDS } from '@pso/shared'
import { Schema, model } from 'mongoose'

const statBonusesSchema = new Schema(
  {
    hp: { type: Number, required: true },
    tp: { type: Number, required: true },
    atp: { type: Number, required: true },
    dfp: { type: Number, required: true },
    mst: { type: Number, required: true },
    ata: { type: Number, required: true },
    evp: { type: Number, required: true },
    lck: { type: Number, required: true },
    efr: { type: Number, required: true },
    eic: { type: Number, required: true },
    eth: { type: Number, required: true },
    edk: { type: Number, required: true },
    elt: { type: Number, required: true },
  },
  { _id: false },
)

const conditionalRequirementsSchema = new Schema(
  {
    weaponLabels: { type: [String], default: undefined },
    armorLabels: { type: [String], default: undefined },
    shieldLabels: { type: [String], default: undefined },
    unitLabels: { type: [String], default: undefined },
    magLabels: { type: [String], default: undefined },
  },
  { _id: false },
)

const conditionalEffectSchema = new Schema(
  {
    requirements: { type: conditionalRequirementsSchema, required: true },
    bonuses: { type: statBonusesSchema, required: true },
    weaponAtpMultiplierPercent: { type: Number, required: true },
  },
  { _id: false },
)

const unitCatalogSchema = new Schema(
  {
    id: { type: String, enum: CHARACTER_UNIT_VALUE_IDS, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    hp: { type: Number, required: true },
    tp: { type: Number, required: true },
    atp: { type: Number, required: true },
    dfp: { type: Number, required: true },
    mst: { type: Number, required: true },
    ata: { type: Number, required: true },
    evp: { type: Number, required: true },
    lck: { type: Number, required: true },
    efr: { type: Number, required: true },
    eic: { type: Number, required: true },
    eth: { type: Number, required: true },
    edk: { type: Number, required: true },
    elt: { type: Number, required: true },
    bonuses: { type: statBonusesSchema, required: true },
    conditionalEffects: { type: [conditionalEffectSchema], default: [], required: true },
    compatibleClasses: {
      type: Schema.Types.Mixed,
      validate: {
        validator: (value: unknown) => value === 'all' || (Array.isArray(value) && value.every((entry) => CHARACTER_CLASS_IDS.includes(entry))),
        message: 'compatibleClasses must be "all" or a list of valid class IDs.',
      },
      required: true,
    },
    hex: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

unitCatalogSchema.index({ id: 1 }, { unique: true })

export const UnitCatalogModel = model('UnitCatalog', unitCatalogSchema)
