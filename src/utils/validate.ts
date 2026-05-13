const NAME_MIN = 1
const NAME_MAX = 30
const PASSWORD_MIN = 8

/** 校验账号名称 */
export function validateAccountName(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'common.validate.name.empty'
  }

  if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
    return 'common.validate.name.length'
  }

  return null
}

/** 校验密码 */
export function validatePassword(value: string): string | null {
  if (!value) {
    return 'common.validate.password.empty'
  }

  if (value.length < PASSWORD_MIN) {
    return 'common.validate.password.tooShort'
  }

  if (!/[a-zA-Z]/.test(value)) {
    return 'common.validate.password.needLetter'
  }

  if (!/[0-9]/.test(value)) {
    return 'common.validate.password.needDigit'
  }

  return null
}

/** 校验登录标识，支持邮箱或国际手机号 */
export function validateIdentifier(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'common.validate.identifier.empty'
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  const isPhone = /^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s-]/g, ''))

  if (!isEmail && !isPhone) {
    return 'common.validate.identifier.invalid'
  }

  return null
}
