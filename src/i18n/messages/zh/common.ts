import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
    brand: {
      name: '相约巴黎',
      tagline: 'Rencontre à Paris',
    },
    nav: {
      about: '关于我们',
      self: '会员资料',
      family: '家庭参与',
      events: '活动日历',
      membership: '会员体系',
      contact: '联系我们',
      register: '立即注册',
      login: '登录',
      logout: '退出登录',
      account: '个人中心',
      myProfile: '我的资料',
      messages: '消息中心',
    },
    footer: {
      brandDesc: '以巴黎为起点，连接全球高质量的相遇。',
      nav: '网站导航',
      contact: '联系我们',
      lang: '支持语言',
      languageList: '中文 / Francais / English',
      rights: '© {year} Rencontre a Paris. All rights reserved.',
    },
    contact: {
      email: '{email}',
      wechat: '微信: RencontreParis',
      location: '巴黎 · 法国',
    },
    validate: {
      name: { empty: '请输入名字', length: '名字需在 1-30 个字符之间' },
      city: { empty: '请输入所在城市', tooLong: '城市名称需在 60 个字符以内' },
      password: { empty: '请输入密码', tooShort: '密码至少 8 个字符', needLetter: '密码需包含至少一个字母', needDigit: '密码需包含至少一个数字' },
      identifier: { empty: '请输入邮箱或手机号', invalid: '请输入有效的邮箱或手机号' },
    },
  }
