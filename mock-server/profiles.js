// 归一化目录页查询参数，补齐默认值。
function normalizeProfileQuery(query) {
  return {
    page: toInt(query.page, 1),
    pageSize: toInt(query.pageSize, 6),
    sort: getString(query.sort) || 'recentActive',
    gender: getString(query.gender),
    ageRange: getString(query.ageRange),
    city: getString(query.city),
    heightRange: getString(query.heightRange),
    education: getString(query.education),
    intentCode: getString(query.intentCode),
    industry: getString(query.industry),
    occupation: getString(query.occupation),
    language: getString(query.language),
    verified: getString(query.verified),
    maritalStatus: getString(query.maritalStatus),
    hasChildren: getString(query.hasChildren),
    acceptLongDistance: getString(query.acceptLongDistance),
    familyMode: getString(query.familyMode),
  }
}

// 生成本人筛选目录的 facets 数据。
function buildSelfDirectoryFacets(items) {
  return {
    cities: uniqueLocalized(items.map((item) => item.city)),
    intents: uniqueIntents(items),
    industries: uniqueLocalized(items.map((item) => item.industry)),
    occupations: uniqueLocalized(items.map((item) => item.occupation)),
    languages: Array.from(new Set(items.flatMap((item) => item.languages))).sort((left, right) => left.localeCompare(right)),
  }
}

// 生成家长筛选目录的 facets 数据。
function buildFamilyDirectoryFacets(items) {
  return {
    cities: uniqueLocalized(items.map((item) => item.city)),
    intents: uniqueIntents(items),
    industries: uniqueLocalized(items.map((item) => item.industry)),
    occupations: uniqueLocalized(items.map((item) => item.occupation)),
  }
}

// 判断资料是否符合本人目录筛选条件。
function matchesSelfDirectory(profile, query) {
  return [
    !query.gender || profile.gender === query.gender,
    matchAgeRange(profile.age, query.ageRange),
    !query.city || profile.city.en === query.city,
    matchHeightRange(profile.height, query.heightRange),
    !query.education || profile.degreeLevel === query.education,
    !query.intentCode || profile.intentCode === query.intentCode,
    !query.industry || profile.industry.en === query.industry,
    !query.occupation || profile.occupation.en === query.occupation,
    !query.language || profile.languages.includes(query.language),
    matchVerified(profile.isVerified, query.verified),
    !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
    matchBooleanFlag(profile.hasChildren, query.hasChildren),
    matchBooleanFlag(profile.acceptLongDistance, query.acceptLongDistance),
  ].every(Boolean)
}

// 判断资料是否符合家长目录筛选条件。
function matchesFamilyDirectory(profile, query) {
  return [
    !query.gender || profile.gender === query.gender,
    matchAgeRange(profile.age, query.ageRange),
    !query.city || profile.city.en === query.city,
    !query.education || profile.degreeLevel === query.education,
    !query.intentCode || profile.intentCode === query.intentCode,
    matchFamilyMode(profile, query.familyMode),
    !query.occupation || profile.occupation.en === query.occupation,
    !query.industry || profile.industry.en === query.industry,
    !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
    matchBooleanFlag(profile.hasChildren, query.hasChildren),
    matchBooleanFlag(profile.acceptLongDistance, query.acceptLongDistance),
  ].every(Boolean)
}

// 按本人目录的排序规则整理资料列表。
function sortSelfProfiles(items, sort) {
  const next = [...items]
  switch (sort) {
    case 'priorityFirst':
      return next.sort((left, right) => {
        const rankDiff = getSelfPriorityRank(left) - getSelfPriorityRank(right)
        if (rankDiff !== 0) return rankDiff
        return compareRecentActive(left, right)
      })
    case 'ageAsc':
      return next.sort((left, right) => left.age - right.age)
    case 'ageDesc':
      return next.sort((left, right) => right.age - left.age)
    case 'recentActive':
    default:
      return next.sort(compareRecentActive)
  }
}

// 按家长目录的排序规则整理资料列表。
function sortFamilyProfiles(items, sort) {
  const next = [...items]
  switch (sort) {
    case 'recentActive':
      return next.sort(compareRecentActive)
    case 'ageAsc':
      return next.sort((left, right) => left.age - right.age)
    case 'ageDesc':
      return next.sort((left, right) => right.age - left.age)
    case 'priorityFirst':
    default:
      return next.sort((left, right) => {
        const rankDiff = getFamilyPriorityRank(left) - getFamilyPriorityRank(right)
        if (rankDiff !== 0) return rankDiff
        return compareRecentActive(left, right)
      })
  }
}

// 根据总数和分页参数生成分页信息。
function buildPagination(total, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}

// 按分页参数裁剪当前页数据。
function paginate(items, page, pageSize) {
  const pagination = buildPagination(items.length, page, pageSize)
  const start = (pagination.page - 1) * pagination.pageSize
  return items.slice(start, start + pagination.pageSize)
}

// 对本地化字段去重并保持稳定排序。
function uniqueLocalized(items) {
  const seen = new Set()
  return items
    .filter((item) => {
      if (seen.has(item.en)) return false
      seen.add(item.en)
      return true
    })
    .sort((left, right) => left.en.localeCompare(right.en))
}

// 提取并去重意向筛选项。
function uniqueIntents(items) {
  const seen = new Set()
  return items
    .map((item) => ({ code: item.intentCode, label: item.intent }))
    .filter((item) => {
      if (seen.has(item.code)) return false
      seen.add(item.code)
      return true
    })
}

// 按最近活跃时间倒序比较两条资料。
function compareRecentActive(left, right) {
  return toTimestamp(right.lastActiveAt) - toTimestamp(left.lastActiveAt)
}

// 把时间字符串安全转换成时间戳。
function toTimestamp(value) {
  const next = new Date(value).getTime()
  return Number.isNaN(next) ? 0 : next
}

// 计算本人目录里的优先级排序权重。
function getSelfPriorityRank(profile) {
  return profile.status === 'vip' ? 0 : 1
}

// 计算家长目录里的优先级排序权重。
function getFamilyPriorityRank(profile) {
  if (profile.familyPriority) return 0
  if (profile.allowFamilyContact) return 1
  return 2
}

// 判断年龄是否命中指定区间。
function matchAgeRange(age, range) {
  if (!range) return true
  switch (range) {
    case 'under25':
      return age < 25
    case '25to29':
      return age >= 25 && age <= 29
    case '30to34':
      return age >= 30 && age <= 34
    case '35to39':
      return age >= 35 && age <= 39
    case '40plus':
      return age >= 40
    default:
      return true
  }
}

// 判断身高是否命中指定区间。
function matchHeightRange(height, range) {
  if (!range) return true
  switch (range) {
    case 'under165':
      return height < 165
    case '165to169':
      return height >= 165 && height <= 169
    case '170to174':
      return height >= 170 && height <= 174
    case '175to179':
      return height >= 175 && height <= 179
    case '180plus':
      return height >= 180
    default:
      return true
  }
}

// 判断实名校验筛选是否命中。
function matchVerified(isVerified, value) {
  if (!value) return true
  if (value === 'verified') return isVerified
  if (value === 'unverified') return !isVerified
  return true
}

// 判断 yes/no 布尔筛选是否命中。
function matchBooleanFlag(source, value) {
  if (!value) return true
  if (value === 'yes') return source
  if (value === 'no') return !source
  return true
}

// 判断家长协作模式筛选是否命中。
function matchFamilyMode(profile, value) {
  if (!value) return true
  switch (value) {
    case 'context_only':
      return profile.familyVisible && !profile.allowFamilyContact && !profile.familyPriority
    case 'contact_ready':
      return profile.allowFamilyContact
    case 'priority':
      return profile.familyPriority
    default:
      return true
  }
}

// 把整数字符串安全转换成数字。
function toInt(value, fallback) {
  const next = Number.parseInt(getString(value) || '', 10)
  return Number.isNaN(next) ? fallback : next
}

// 从 query 值里取出单个字符串。
function getString(value) {
  if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : ''
  return typeof value === 'string' ? value : ''
}

module.exports = {
  normalizeProfileQuery,
  buildSelfDirectoryFacets,
  buildFamilyDirectoryFacets,
  matchesSelfDirectory,
  matchesFamilyDirectory,
  sortSelfProfiles,
  sortFamilyProfiles,
  buildPagination,
  paginate,
  getString,
}
