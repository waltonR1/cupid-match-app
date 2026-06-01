import type { AppMessageSchema } from '@/i18n/types'

export const forgotPasswordMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Reset',
    title: '重置密码',
    subtitle: '输入注册时使用的邮箱或手机号获取验证码，然后设置新密码。',
  },
  form: {
    providerLabel: { email: '邮箱', phone: '手机号' },
    identifierLabel: '邮箱或手机号',
    identifierPlaceholder: '请输入注册时使用的邮箱或手机号',
    sendCode: '发送验证码',
    sending: '发送中...',
    step1Action: '返回登录',
  },
  step2: {
    title: '输入验证码和新密码',
    codeLabel: '验证码',
    codePlaceholder: '6位验证码',
    codeHint: '请输入收到的 6 位验证码。',
    newPasswordLabel: '新密码',
    confirmPasswordLabel: '确认新密码',
    action: '重置密码',
    loading: '重置中...',
  },
  toasts: {
    codeSent: '验证码已发送。',
    passwordReset: '密码重置成功。',
  },
  validation: {
    identifierRequired: '请输入注册时使用的邮箱或手机号。',
    codeRequired: '请输入验证码。',
    passwordsMismatch: '两次输入的密码不一致。',
    passwordInvalid: '密码至少需要8位，包含字母和数字。',
  },
  error: {
    identityNotFound: '未找到与该标识符匹配的账号。',
    invalidCode: '验证码无效或已过期。',
    generic: '操作失败，请重试。',
  },
}
