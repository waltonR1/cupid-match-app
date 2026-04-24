type DisplayNameSource = {
  displayName?: string
  id?: string
  profileId?: string
  gender?: string
  nickName?: string
}

export function getDisplayName(source: DisplayNameSource | null | undefined) {
  if (!source) return ''

  return source.displayName?.trim()
    || buildAnonymousDisplayName(source)
    || source.nickName?.trim()
    || 'U-000'
}

function buildAnonymousDisplayName(source: DisplayNameSource) {
  const rawId = source.profileId?.trim() || source.id?.trim()
  if (!rawId) return ''

  const prefix = source.gender === 'female'
    ? 'F'
    : source.gender === 'male'
      ? 'M'
      : 'U'

  return `${prefix}-${normalizeDisplayId(rawId)}`
}

function normalizeDisplayId(rawId: string) {
  const numericSuffix = rawId.match(/(\d+)$/)?.[1]
  if (numericSuffix) return numericSuffix.padStart(3, '0')

  const compactId = rawId.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  if (!compactId) return '000'

  return compactId.slice(-3).padStart(3, '0')
}
