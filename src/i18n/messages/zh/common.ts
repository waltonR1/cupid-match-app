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
  }
