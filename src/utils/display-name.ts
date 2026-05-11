/** 可用于生成展示名称的数据来源 */
type DisplayNameSource = {
  displayName?: string
  id?: string
  profileId?: string
  gender?: string
  nickName?: string
}

/**
 * 获取用户展示名称
 *
 * 优先级：
 * 1. displayName
 * 2. 匿名编号名称（F-001 / M-001）
 * 3. nickName
 * 4. 默认占位名称
 */
export function getDisplayName(source: DisplayNameSource | null | undefined) {
  // 无数据时返回空字符串
  if (!source) return ''

  return (
      // 优先使用 displayName
      source.displayName?.trim()

      // 自动生成匿名展示名
      || buildAnonymousDisplayName(source)

      // 回退到 nickname
      || source.nickName?.trim()

      // 最终默认值
      || 'U-000'
  )
}

/**
 * 构建匿名展示名称
 *
 * 示例：
 * - female → F-001
 * - male → M-001
 * - unknown → U-001
 */
function buildAnonymousDisplayName(source: DisplayNameSource) {
  // 优先使用 profileId
  const rawId = source.profileId?.trim() || source.id?.trim()

  // 无可用 id
  if (!rawId) return ''

  // 根据性别生成前缀
  const prefix = source.gender === 'female'
      ? 'F'
      : source.gender === 'male'
          ? 'M'
          : 'U'

  return `${prefix}-${normalizeDisplayId(rawId)}`
}

/**
 * 标准化展示 ID
 *
 * 规则：
 * 1. 优先提取数字后缀
 * 2. 自动补齐为 3 位
 * 3. 无数字时提取字母数字组合
 */
function normalizeDisplayId(rawId: string) {
  // 提取末尾数字
  const numericSuffix = rawId.match(/(\d+)$/)?.[1]

  // 使用数字后缀
  if (numericSuffix) return numericSuffix.padStart(3, '0')

  // 去除特殊字符并转大写
  const compactId = rawId.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

  // 清洗后为空
  if (!compactId) return '000'

  // 取最后 3 位并补齐
  return compactId.slice(-3).padStart(3, '0')
}