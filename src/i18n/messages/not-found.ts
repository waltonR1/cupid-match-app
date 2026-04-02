import type { AppLocaleMessages } from '@/i18n/types'

export const notFoundMessages: AppLocaleMessages = {
  zh: {
    hero: {
      title: '页面不存在',
      subtitle: '你访问的链接可能已失效、输入错误，或该页面暂未开放。',
    },
    actions: {
      home: '返回首页',
      account: '进入用户中心',
    },
  },
  fr: {
    hero: {
      title: 'Page introuvable',
      subtitle: 'Le lien est peut-etre invalide, incorrect, ou cette page n est pas encore ouverte.',
    },
    actions: {
      home: 'Retour accueil',
      account: 'Espace utilisateur',
    },
  },
  en: {
    hero: {
      title: 'Page not found',
      subtitle: 'The link may be invalid, mistyped, or the page is not available yet.',
    },
    actions: {
      home: 'Back Home',
      account: 'User Center',
    },
  },
}
