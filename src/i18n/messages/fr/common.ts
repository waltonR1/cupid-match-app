import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
    brand: {
      name: '相约巴黎',
      tagline: 'Rencontre à Paris',
    },
    nav: {
      about: 'À propos',
      profiles: 'Profils',
      family: 'Famille',
      events: 'Événements',
      membership: 'Abonnement',
      contact: 'Contact',
      register: 'S\'inscrire',
      login: 'Connexion',
      logout: 'Déconnexionn',
      account: 'Mon compte',
      myProfile: 'Mon profil',
      messages: 'Messages',
    },
    footer: {
      brandDesc: 'Depuis Paris, pour des rencontres de qualite a l echelle mondiale.',
      nav: 'Navigation',
      contact: 'Contact',
      lang: 'Langues',
      languageList: '中文 / Francais / English',
      rights: '© {year} Rencontre a Paris. All rights reserved.',
    },
    contact: {
      email: '{email}',
      wechat: 'WeChat: RencontreParis',
      location: 'Paris · France',
    },
  }
