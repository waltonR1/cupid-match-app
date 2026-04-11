import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: 'Log in and continue your path',
      subtitle: 'Enter your account to return to saved profiles, event plans, and advisor follow-up.',
      formTitle: 'Account Login',
      panelTitle: 'Welcome back',
      panelHint: 'Enter your account details to continue into your profile progress, saved records, and event planning.',
      submit: 'Log in',
      secondary: 'No account yet? Register',
      accessTitle: 'Available after login',
      agreementPrefix: 'By continuing, you agree to the',
      agreementTerms: 'Platform Terms',
      agreementConnector: ' and ',
      agreementPrivacy: 'Privacy Notice',
      agreementSuffix: '. Continuing means you understand the platform rules, account visibility logic, and later contact boundaries.',
      consentConfirm: {
        kicker: 'Login confirmation',
        title: 'Please agree to the terms before logging in',
        desc: 'Before continuing, you need to confirm that you have read the Platform Terms and Privacy Notice. Choosing agree will tick the checkbox automatically and continue the login flow.',
        accept: 'Agree and log in',
        reject: 'Not now',
      },
      autoRouteTitle: 'Auto route',
      autoRouteHeading: 'Login sends you to the right identity flow',
      autoRouteDesc: 'The system reads your account context and opens the matching member or parent path directly.',
    },
    form: {
      identity: { label: 'Email or WeChat', placeholder: 'Enter your usual contact info' },
      password: { label: 'Password', placeholder: 'Enter your account password' },
    },
    access: {
      account: { title: 'Account overview', desc: 'Review profile completion, advisor follow-up, and current journey status.' },
      favorites: { title: 'Favorites and contact', desc: 'Continue into saved profiles, interest records, and communication threads.' },
      events: { title: 'Events and arrangements', desc: 'Check event registrations, confirmation status, and upcoming meetings.' },
    },
  }
