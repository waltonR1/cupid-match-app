import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
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
  }
