import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: 'Log in and continue your path',
      subtitle: 'Enter your account to return to saved profiles, event plans, and advisor follow-up.',
      formTitle: 'Account Login',
      panelTitle: 'Welcome back',
      panelHint: 'This is still a demo login. Clicking the button will enter the account directly without validating the input.',
      submit: 'Log in',
      secondary: 'No account yet? Register',
      accessTitle: 'Available after login',
      autoRouteTitle: 'Auto route',
      autoRouteHeading: 'Login sends you to the right identity flow',
      autoRouteDesc: 'The system reads your account context and opens the matching member or parent path directly.',
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
  }
