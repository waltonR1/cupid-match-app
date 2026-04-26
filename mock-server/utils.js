function withDisplayName(record) {
  return {
    ...record,
    displayName: resolveDisplayName(record),
  }
}

function resolveDisplayName(record) {
  return record.displayName || record.nickName || record.realName || record.id || 'Unknown'
}

function buildSession(authUser) {
  return {
    token: `mock-token-${authUser.id}`,
    user: {
      id: authUser.accountId,
      displayName: authUser.displayName,
      avatarUrl: authUser.avatarUrl || '',
    },
  }
}

function buildRelatedProfiles(profiles, cityKey) {
  return [...profiles]
    .sort((left, right) => getRelatedProfilePriority(right) - getRelatedProfilePriority(left))
    .sort((left, right) => {
      if (left.city.en === cityKey && right.city.en !== cityKey) return -1
      if (left.city.en !== cityKey && right.city.en === cityKey) return 1
      return 0
    })
    .slice(0, 2)
    .map((profile) => ({
      id: profile.id,
      displayName: resolveDisplayName(profile),
      age: profile.age,
      city: profile.city,
      intent: profile.intent,
      summary: profile.summary,
      status: profile.status,
      isVerified: profile.isVerified,
    }))
}

function getRelatedProfilePriority(profile) {
  let score = 0
  if (profile.status === 'vip') score += 4
  if (profile.isVerified) score += 2
  if (profile.familyVisible) score += 1
  return score
}

function nextId(prefix, items) {
  return `${prefix}-${String(items.length + 1).padStart(3, '0')}`
}

function omitId(record) {
  const { id, accountId, ...rest } = record
  return rest
}

function omitAccountId(record) {
  const { accountId, ...rest } = record
  return rest
}

function localized(zh, fr, en) {
  return { zh, fr, en }
}

module.exports = {
  withDisplayName,
  buildSession,
  buildRelatedProfiles,
  nextId,
  omitId,
  omitAccountId,
  localized,
}
