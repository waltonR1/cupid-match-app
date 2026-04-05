import type { AppLocaleMessages } from '@/i18n/types'

export const loginMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Login',
      title: '进入你的婚恋路径',
      subtitle: '登录后系统会根据你的账号自动识别身份，并进入对应的使用路径。',
      formTitle: '账号进入',
      panelTitle: '登录你的账户',
      panelHint: '这里不再手动选择身份。系统会依据账号信息自动进入本人路径或家长路径。',
      submit: '进入账户',
      secondary: '还没有账号？去注册',
      accessTitle: '登录后可体验',
    },
    form: {
      identity: { label: '邮箱或微信', placeholder: '请输入你的常用联系方式' },
      password: { label: '密码', placeholder: '当前为演示模式，无需真实密码' },
    },
    access: {
      account: { title: '账户总览', desc: '查看资料完善进度、顾问跟进节奏与当前状态。' },
      favorites: { title: '收藏与沟通', desc: '继续浏览意向对象、收藏记录与沟通线索。' },
      events: { title: '活动与安排', desc: '查看报名活动、待确认行程与后续见面安排。' },
    },
  },

  fr: {
    hero: {
      eyebrow: 'Login',
      title: 'Entrez dans votre parcours',
      subtitle: 'Apres connexion, le systeme reconnait automatiquement votre identite et vous dirige vers le bon parcours.',
      formTitle: 'Acces compte',
      panelTitle: 'Connectez votre compte',
      panelHint: 'Il n y a plus de selection manuelle du role ici. Le systeme determine automatiquement le bon parcours.',
      submit: 'Entrer dans le compte',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Disponible apres connexion',
    },
    form: {
      identity: { label: 'Email ou WeChat', placeholder: 'Entrez votre contact habituel' },
      password: { label: 'Mot de passe', placeholder: 'Mode demo, aucun vrai mot de passe requis' },
    },
    access: {
      account: { title: 'Vue compte', desc: 'Suivre l avancement du profil, le rythme conseiller et le statut courant.' },
      favorites: { title: 'Favoris et echanges', desc: 'Retrouver les profils suivis, les favoris et les pistes de communication.' },
      events: { title: 'Evenements et agenda', desc: 'Voir les inscriptions, les confirmations et les prochaines rencontres.' },
    },
  },

  en: {
    hero: {
      eyebrow: 'Login',
      title: 'Enter your matchmaking path',
      subtitle: 'After login, the system will automatically recognize your account identity and take you to the appropriate path.',
      formTitle: 'Account access',
      panelTitle: 'Log in to your account',
      panelHint: 'There is no manual role selection here anymore. The system will determine the correct path from your account identity.',
      submit: 'Enter account',
      secondary: 'No account yet? Register',
      accessTitle: 'Available after login',
    },
    form: {
      identity: { label: 'Email or WeChat', placeholder: 'Enter your usual contact info' },
      password: { label: 'Password', placeholder: 'Demo mode only, no real password is required' },
    },
    access: {
      account: { title: 'Account overview', desc: 'Review profile completion, advisor follow-up, and current journey status.' },
      favorites: { title: 'Favorites and contact', desc: 'Continue into saved profiles, interest records, and communication threads.' },
      events: { title: 'Events and arrangements', desc: 'Check event registrations, confirmation status, and upcoming meetings.' },
    },
  },
}