import type { AppMessageSchema } from '@/i18n/types'

export const commonMessages: AppMessageSchema = {
    brand: {
      name: 'Meet in Paris',
      tagline: 'Rencontre à Paris',
    },
    nav: {
      about: 'About',
      profiles: 'Profiles',
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
  }
