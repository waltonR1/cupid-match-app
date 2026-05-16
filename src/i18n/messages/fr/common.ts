import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
    brand: {
      name: '相约巴黎',
      tagline: 'Rencontre à Paris',
    },
    nav: {
      about: 'À propos',
      self: 'Profils',
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
      settings: 'Parametres',
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
    validate: {
      name: { empty: 'Veuillez entrer votre nom', length: 'Le nom doit contenir 1 a 30 caracteres' },
      password: { empty: 'Veuillez entrer un mot de passe', tooShort: '8 caracteres minimum', needLetter: 'Le mot de passe doit contenir au moins une lettre', needDigit: 'Le mot de passe doit contenir au moins un chiffre' },
      identifier: { empty: 'Veuillez entrer votre email ou telephone', invalid: 'Veuillez entrer un email ou un numero de telephone valide' },
    },
  }
