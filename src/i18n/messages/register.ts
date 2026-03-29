import type { AppLocaleMessages } from '@/i18n/types'

export const registerMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Registration',
      title: '注册体验',
      subtitle: '这是演示版注册页，使用 mock 数据和展示型表单，后续可直接接入真实注册、审核和会员购买流程。',
      selectedPlan: '当前入口',
      planNote: '当前页面只负责演示注册与申请流程，不会真的提交数据。',
      formTitle: '演示表单',
      submit: '提交申请',
      processTitle: '流程说明',
    },
    plans: {
      free: '免费注册',
      silver: '白银会员申请',
      gold: '黄金会员申请',
      diamond: '钻石会员申请',
      vip: 'VIP 咨询',
      contact: '联系入口',
      event: '活动报名',
    },
    form: {
      name: { label: '姓名', placeholder: '请输入你的姓名' },
      city: { label: '所在城市', placeholder: '例如：巴黎 / 里昂 / 布鲁塞尔' },
      contact: { label: '邮箱或微信', placeholder: '用于后续顾问联系' },
      intent: { label: '关系意向', placeholder: '例如：认真交往 / 婚姻导向 / 先了解' },
    },
    process: {
      step1: { title: '提交基础信息', desc: '先提交基础联系信息和关系意向。' },
      step2: { title: '资料审核与回访', desc: '顾问会基于 mock 流程展示审核和回访节奏。' },
      step3: { title: '进入资料或活动路径', desc: '根据你的需求进入会员资料浏览、活动报名或会员升级。' },
    },
    policy: {
      privacy: { title: '隐私边界', desc: '演示站仍保留资料可见范围、家长授权和顾问沟通边界的概念。' },
      upgrade: { title: '会员升级', desc: '后续可把这个页面接到真实支付、会员权益和购买确认流程。' },
    },
  },
  fr: {
    hero: {
      eyebrow: 'Registration',
      title: 'Inscription Demo',
      subtitle: 'Il s agit d une page de demonstration avec formulaire mock, prete a etre remplacee plus tard par un vrai tunnel d inscription.',
      selectedPlan: 'Entree active',
      planNote: 'Cette page ne soumet aucune donnee reelle pour le moment.',
      formTitle: 'Formulaire demo',
      submit: 'Envoyer la demande',
      processTitle: 'Etapes',
    },
    plans: {
      free: 'Inscription gratuite',
      silver: 'Demande Silver',
      gold: 'Demande Gold',
      diamond: 'Demande Diamond',
      vip: 'Consultation VIP',
      contact: 'Entree contact',
      event: 'Inscription evenement',
    },
    form: {
      name: { label: 'Nom', placeholder: 'Entrez votre nom' },
      city: { label: 'Ville', placeholder: 'Ex: Paris / Lyon / Bruxelles' },
      contact: { label: 'Email ou WeChat', placeholder: 'Pour un suivi conseiller' },
      intent: { label: 'Intention', placeholder: 'Ex: relation serieuse / mariage / decouverte' },
    },
    process: {
      step1: { title: 'Envoyer les informations de base', desc: 'Laisser un contact de base et votre intention relationnelle.' },
      step2: { title: 'Verification et retour conseiller', desc: 'La demonstration montre ensuite le rythme de verification et de suivi.' },
      step3: { title: 'Entrer dans le bon parcours', desc: 'Selon le besoin, on passe vers profils, evenements ou offre membre.' },
    },
    policy: {
      privacy: { title: 'Limites de confidentialite', desc: 'La demo garde deja la logique de visibilite des profils, d accord parental et de cadre conseiller.' },
      upgrade: { title: 'Upgrade membre', desc: 'Cette page pourra plus tard se connecter a un vrai flux de paiement et d activation.' },
    },
  },
  en: {
    hero: {
      eyebrow: 'Registration',
      title: 'Registration Demo',
      subtitle: 'This is a demonstration registration page with a mock form, ready to be replaced later by real signup, review, and membership purchase flows.',
      selectedPlan: 'Active entry',
      planNote: 'This page is for browsing and demo purposes only and does not submit real data.',
      formTitle: 'Demo form',
      submit: 'Submit Request',
      processTitle: 'Process',
    },
    plans: {
      free: 'Free registration',
      silver: 'Silver application',
      gold: 'Gold application',
      diamond: 'Diamond application',
      vip: 'VIP consultation',
      contact: 'Contact entry',
      event: 'Event registration',
    },
    form: {
      name: { label: 'Name', placeholder: 'Enter your name' },
      city: { label: 'City', placeholder: 'Example: Paris / Lyon / Brussels' },
      contact: { label: 'Email or WeChat', placeholder: 'Used for advisor follow-up' },
      intent: { label: 'Relationship intent', placeholder: 'Example: serious dating / marriage / exploring' },
    },
    process: {
      step1: { title: 'Submit your basic info', desc: 'Leave core contact details and your relationship intent.' },
      step2: { title: 'Review and advisor follow-up', desc: 'The demo then shows a mock review and follow-up rhythm.' },
      step3: { title: 'Enter the right flow', desc: 'From there, you move into profiles, events, or a membership upgrade path.' },
    },
    policy: {
      privacy: { title: 'Privacy boundaries', desc: 'Even the demo keeps the concepts of profile visibility, parent authorization, and advisor communication limits.' },
      upgrade: { title: 'Membership upgrade', desc: 'Later this page can be connected to real payment, membership activation, and purchase confirmation.' },
    },
  },
}
