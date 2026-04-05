import type { AppLocaleMessages } from '@/i18n/types'

export const loginMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Login',
      title: '登录体验',
      subtitle: '这是演示版登录页，当前通过 mock 登录进入个人中心，后续可以替换为真实认证流程。',
      formTitle: '演示登录',
      submit: '进入个人中心',
      secondary: '还没有账号？去注册',
      accessTitle: '登录后可体验',
    },
    form: {
      identity: { label: '邮箱或微信', placeholder: '请输入你的常用联系方式' },
      password: { label: '密码', placeholder: '当前为演示模式，无需真实密码' },
    },
    access: {
      account: { title: '账户总览', desc: '查看个人中心、当前资料进度与顾问跟进状态。' },
      favorites: { title: '收藏与消息', desc: '继续浏览收藏对象和消息中心的演示数据。' },
      events: { title: '活动报名', desc: '进入已报名活动、待确认状态和历史记录。' },
    },
  },
  fr: {
    hero: {
      eyebrow: 'Login',
      title: 'Connexion Demo',
      subtitle: 'Cette page de connexion utilise un acces mock pour entrer dans le compte utilisateur, en attendant une vraie authentification.',
      formTitle: 'Connexion demo',
      submit: 'Entrer dans mon compte',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Acces apres connexion',
    },
    form: {
      identity: { label: 'Email ou WeChat', placeholder: 'Entrez votre contact habituel' },
      password: { label: 'Mot de passe', placeholder: 'Mode demo, aucun vrai mot de passe requis' },
    },
    access: {
      account: { title: 'Vue compte', desc: 'Retrouver le centre personnel, le profil courant et le suivi conseiller.' },
      favorites: { title: 'Favoris et messages', desc: 'Continuer la demonstration des favoris et du centre de messages.' },
      events: { title: 'Inscriptions evenements', desc: 'Voir les inscriptions confirmees, en attente et l historique.' },
    },
  },
  en: {
    hero: {
      eyebrow: 'Login',
      title: 'Login Demo',
      subtitle: 'This demo login page uses a mock sign-in flow and sends the user into the account area for the next step.',
      formTitle: 'Demo login',
      submit: 'Enter Account',
      secondary: 'No account yet? Register',
      accessTitle: 'Available after login',
    },
    form: {
      identity: { label: 'Email or WeChat', placeholder: 'Enter your usual contact info' },
      password: { label: 'Password', placeholder: 'Demo mode only, no real password is required' },
    },
    access: {
      account: { title: 'Account overview', desc: 'Review the account center, profile completion, and advisor follow-up status.' },
      favorites: { title: 'Favorites and messages', desc: 'Continue into the demo favorites list and message center.' },
      events: { title: 'Event registrations', desc: 'Check confirmed registrations, waitlist status, and event history.' },
    },
  },
}
