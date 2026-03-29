import type { AppLocaleMessages } from '@/i18n/types'

export const emptyStateMessages: AppLocaleMessages = {
  zh: {
    hero: {
      title: '页面不存在或暂未配置',
      subtitle: '这个页面用于演示空状态、未配置入口或错误跳转时的统一兜底展示。',
    },
    actions: {
      home: '返回首页',
      account: '进入个人中心',
    },
  },
  fr: {
    hero: {
      title: 'Page absente ou non configuree',
      subtitle: 'Cette page sert de fallback visuel pour une page vide, une entree non prete ou une mauvaise redirection.',
    },
    actions: {
      home: 'Retour accueil',
      account: 'Entrer dans le compte',
    },
  },
  en: {
    hero: {
      title: 'Page not found or not configured yet',
      subtitle: 'This page is used as a shared fallback for empty states, unfinished routes, or broken demo navigation.',
    },
    actions: {
      home: 'Back Home',
      account: 'Open Account',
    },
  },
}
