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
      loading: 'Logging in...',
      secondary: 'No account yet? Register',
      agreementPrefix: 'By continuing, you agree to the',
      agreementTerms: 'Platform Terms',
      agreementConnector: ' and ',
      agreementPrivacy: 'Privacy Notice',
      agreementSuffix: '. Continuing means you understand the platform rules, account visibility logic, and later contact boundaries.',
    },
    form: {
      identifier: { label: 'Email or phone', placeholder: 'Email or phone' },
      password: { label: 'Password', placeholder: 'Password' },
      forgotPassword: 'Forgot password?',
      error: { invalid: 'Invalid account or password. Please try again.', agreement: 'Please accept the platform terms and privacy notice before logging in.' },
    },
    access: {
      account: { title: 'Account overview', desc: 'Review profile completion, advisor follow-up, and current journey status.' },
      favorites: { title: 'Favorites and contact', desc: 'Continue into saved profiles, interest records, and communication threads.' },
    },
  }
