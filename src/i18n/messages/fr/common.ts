import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
  brand: {
    name: 'Rendez-vous à Paris',
    tagline: 'Rencontre à Paris',
  },
  nav: {
    about: 'À propos',
    self: 'Profils',
    family: 'Famille',
    events: 'Événements',
    membership: 'Abonnement',
    contact: 'Contact',
    register: 'S’inscrire',
    login: 'Connexion',
    logout: 'Déconnexion',
    account: 'Mon compte',
    myProfile: 'Mon profil',
    messages: 'Messages',
    settings: 'Paramètres',
  },
  footer: {
    brandDesc: 'Depuis Paris, pour des rencontres de qualité à l’échelle mondiale.',
    nav: 'Navigation',
    contact: 'Contact',
    lang: 'Langues',
    languageList: '中文 / Français / English',
    rights: '© {year} Rencontre à Paris. All rights reserved.',
  },
  contact: {
    email: '{email}',
    wechat: 'WeChat: {wechat}',
    location: '{location}',
  },
  validate: {
    name: { empty: 'Veuillez entrer votre nom', length: 'Le nom doit contenir 1 à 30 caractères' },
    password: { empty: 'Veuillez entrer un mot de passe', tooShort: '8 caractères minimum', needLetter: 'Le mot de passe doit contenir au moins une lettre', needDigit: 'Le mot de passe doit contenir au moins un chiffre' },
    identifier: { empty: 'Veuillez entrer votre email ou téléphone', invalid: 'Veuillez entrer un email ou un numéro de téléphone valide' },
  },
}
