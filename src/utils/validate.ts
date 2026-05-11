const NAME_MIN = 1
const NAME_MAX = 30

const PASSWORD_MIN = 8
const CITY_MAX = 60

/**
 * 校验账号名称
 * - 去除首尾空格
 * - 必填
 * - 长度限制：1 ~ 30
 */
export function validateAccountName(value: string): string | null {
  const trimmed = value.trim()

  // 名称为空
  if (!trimmed) {
    return 'common.validate.name.empty'
  }

  // 名称长度不合法
  if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
    return 'common.validate.name.length'
  }

  return null
}

/**
 * 校验密码
 * - 必填
 * - 至少 8 位
 * - 必须包含字母
 * - 必须包含数字
 */
export function validatePassword(value: string): string | null {
  // 密码为空
  if (!value) {
    return 'common.validate.password.empty'
  }

  // 密码长度不足
  if (value.length < PASSWORD_MIN) {
    return 'common.validate.password.tooShort'
  }

  // 缺少字母
  if (!/[a-zA-Z]/.test(value)) {
    return 'common.validate.password.needLetter'
  }

  // 缺少数字
  if (!/[0-9]/.test(value)) {
    return 'common.validate.password.needDigit'
  }

  return null
}

/**
 * 校验城市
 * - 去除首尾空格
 * - 必填
 * - 最大长度：60
 */
export function validateCity(value: string): string | null {
  const trimmed = value.trim()

  // 城市为空
  if (!trimmed) {
    return 'common.validate.city.empty'
  }

  // 城市长度超限
  if (trimmed.length > CITY_MAX) {
    return 'common.validate.city.tooLong'
  }

  return null
}

/**
 * 校验登录标识
 * 支持：
 * - 邮箱
 * - 国际手机号
 */
export function validateIdentifier(value: string): string | null {
  const trimmed = value.trim()

  // 输入为空
  if (!trimmed) {
    return 'common.validate.identifier.empty'
  }

  // 邮箱格式校验
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)

  // 国际手机号格式校验
  // 允许：
  // - + 前缀
  // - 空格
  // - 连字符
  const isPhone = /^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s-]/g, ''))

  // 既不是邮箱也不是手机号
  if (!isEmail && !isPhone) {
    return 'common.validate.identifier.invalid'
  }

  return null
}