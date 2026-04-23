import { characterConfigSchema, type CharacterConfigInput } from '@pso/shared'

export const CHARACTER_CONFIG_URL_PARAM = 'c'

function toUrlSafeBase64(value: string): string {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromUrlSafeBase64(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const paddingNeeded = (4 - (normalized.length % 4)) % 4
  return normalized + '='.repeat(paddingNeeded)
}

function encodeUtf8ToBase64(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'utf-8').toString('base64')
  }

  const bytes = new TextEncoder().encode(value)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return window.btoa(binary)
}

function decodeBase64ToUtf8(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'base64').toString('utf-8')
  }

  const binary = window.atob(value)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new TextDecoder().decode(bytes)
}

export function encodeCharacterConfig(config: CharacterConfigInput): string {
  return toUrlSafeBase64(encodeUtf8ToBase64(JSON.stringify(config)))
}

export function decodeCharacterConfig(encoded: string): CharacterConfigInput | null {
  if (!encoded) {
    return null
  }

  try {
    const json = decodeBase64ToUtf8(fromUrlSafeBase64(encoded))
    const parsed = JSON.parse(json) as unknown
    const result = characterConfigSchema.safeParse(parsed)

    return result.success ? (result.data as CharacterConfigInput) : null
  } catch {
    return null
  }
}
