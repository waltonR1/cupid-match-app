import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
    brand: {
      name: 'Meet in Paris',
      tagline: 'Rencontre à Paris',
    },
    nav: {
      about: 'About',
      self: 'Profiles',
      family: 'Family',
      events: 'Events',
      membership: 'Membership',
      contact: 'Contact',
      register: 'Register',
      login: 'Login',
      logout: 'Logout',
      account: 'Account',
      myProfile: 'My Profile',
      messages: 'Messages',
      settings: 'Settings',

    },
    footer: {
      brandDesc: 'Starting from Paris, connecting high-quality encounters worldwide.',
      nav: 'Navigation',
      contact: 'Contact',
      lang: 'Languages',
      languageList: '中文 / Francais / English',
      rights: '© {year} Rencontre a Paris. All rights reserved.',
    },
    contact: {
      email: '{email}',
      wechat: 'WeChat: RencontreParis',
      location: 'Paris · France',
    },
    validate: {
      name: { empty: 'Please enter your name', length: 'Name must be 1–30 characters' },
      password: { empty: 'Please enter a password', tooShort: 'Password must be at least 8 characters', needLetter: 'Password must include at least one letter', needDigit: 'Password must include at least one digit' },
      identifier: { empty: 'Please enter your email or phone', invalid: 'Please enter a valid email or phone number' },
    },
  }
