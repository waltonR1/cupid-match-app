// 为记录补齐前端消费用的 displayName。
function withDisplayName(record) {
  return {
    ...record,
    displayName: resolveDisplayName(record),
  }
}

// 按优先级推导展示名称。
function resolveDisplayName(record) {
  return record.displayName || record.nickName || record.realName || record.id || 'Unknown'
}

// 组装登录/注册成功后的会话响应。
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

// 生成活动详情页需要的关联资料列表。
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

// 计算关联资料排序时使用的优先级分数。
function getRelatedProfilePriority(profile) {
  let score = 0
  if (profile.status === 'vip') score += 4
  if (profile.isVerified) score += 2
  if (profile.familyVisible) score += 1
  return score
}

// 基于现有集合生成下一个业务 ID。
function nextId(prefix, items) {
  return `${prefix}-${String(items.length + 1).padStart(3, '0')}`
}

// 去掉记录里的 id 和 accountId 字段。
function omitId(record) {
  const { id, accountId, ...rest } = record
  return rest
}

// 去掉记录里的 accountId 字段。
function omitAccountId(record) {
  const { accountId, ...rest } = record
  return rest
}

// 构造统一的多语言文本对象。
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
