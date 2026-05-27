import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: '登录后继续你的路径',
      subtitle: '输入账号后即可继续浏览资料、收藏记录、活动安排与顾问跟进。',
      formTitle: 'Account Login',
      panelTitle: '欢迎回来',
      panelHint: '输入你的账号信息后即可继续进入账户、查看资料进度、收藏记录与活动安排。',
      submit: '登录',
      loading: '登录中...',
      secondary: '还没有账号？去注册',
      agreementPrefix: '继续登录即表示你同意',
      agreementTerms: '平台服务条款',
      agreementConnector: '与',
      agreementPrivacy: '隐私说明',
      agreementSuffix: '。继续登录即表示你理解平台服务规则、账号资料展示方式与后续联系边界。',
    },
    form: {
      identifier: { label: '邮箱或手机号', placeholder: '邮箱或手机号' },
      password: { label: '密码', placeholder: '密码' },
      forgotPassword: '忘记密码？',
      error: { invalid: '账号或密码错误，请重试', agreement: '请先同意平台服务条款和隐私说明。' },
    },
    access: {
      account: { title: '账户总览', desc: '查看资料完善进度、顾问跟进节奏与当前状态。' },
      favorites: { title: '收藏与沟通', desc: '继续浏览意向对象、收藏记录与沟通线索。' },
    },
  }
