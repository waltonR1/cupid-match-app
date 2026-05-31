const CODE_TTL_MS = 5 * 60 * 1000

interface CodeEntry {
  id: string
  identifier: string
  provider: 'email' | 'phone'
  code: string
  expiresAt: number
  consumed: boolean
}

let nextId = 1
const store = new Map<string, CodeEntry>()

function purgeExpired(): void {
  const now = Date.now()
  for (const [id, entry] of store) {
    if (entry.expiresAt < now) store.delete(id)
  }
}

export function generateCode(provider: string, identifier: string) {
  if (!['email', 'phone'].includes(provider)) return 'invalid_provider' as const
  const trimmed = (identifier || '').trim()
  if (!trimmed) return 'invalid_identifier' as const

  purgeExpired()

  const id = String(nextId++)
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = Date.now() + CODE_TTL_MS

  store.set(id, { id, identifier: trimmed, provider: provider as 'email' | 'phone', code, expiresAt, consumed: false })

  return { id, expiresAt: new Date(expiresAt).toISOString() }
}

export function verifyAndConsume(provider: string, identifier: string, code: string): boolean {
  const trimmed = (identifier || '').trim()
  const trimmedCode = code.trim()
  if (!trimmed || !trimmedCode) return false

  purgeExpired()

  for (const [, entry] of store) {
    if (
      entry.provider === provider &&
      entry.identifier === trimmed &&
      entry.code === trimmedCode &&
      !entry.consumed
    ) {
      entry.consumed = true
      return true
    }
  }

  return false
}

export function listCodes() {
  purgeExpired()
  return Array.from(store.values())
    .filter((e) => !e.consumed)
    .map((e) => ({
      id: e.id,
      identifier: e.identifier,
      provider: e.provider,
      code: e.code,
      expiresAt: new Date(e.expiresAt).toISOString(),
    }))
}
