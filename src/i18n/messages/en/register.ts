import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Registration',
    title: 'Create your account and begin your matchmaking path',
    subtitle: 'Finish the core account signup first, then continue into the member or parent flow that fits your identity. You can complete the broader profile and follow-up steps after registration.',
    selectedPath: 'Selected identity',
    formTitle: 'Account Setup',
    panelTitle: 'Create your account',
    panelHint: 'Use your email or phone number, set a password, and choose the path you want to start with.',
    submit: 'Create account',
    loading: 'Creating account...',
    processTitle: 'How signup works',
    agreementPrefix: 'I have read and agree to the',
    agreementTerms: 'Platform Terms',
    agreementConnector: ' and ',
    agreementPrivacy: 'Privacy Notice',
    agreementSuffix: '. After registration, the platform may use my account information for necessary service contact and will control profile visibility according to my identity path and privacy settings.',
    formFootnote: 'After registration, you can continue completing your profile, adjust visibility settings, and add more detailed relationship information inside the account.',
  },
  paths: {
    self: {
      badge: 'Member path',
      title: 'Register for myself',
      desc: 'Best for members who want to build their own profile, define relationship preferences directly, and move into matching and advisor guidance themselves.',
      note: 'This path emphasizes personal profile quality, preference clarity, advisor support, and communication led directly by the member.',
    },
    family: {
      badge: 'Family path',
      title: 'Register as a parent',
      desc: 'Best for parents who want to understand the process first, review candidates from a family perspective, and join the early communication flow.',
      note: 'This path emphasizes family participation, review boundaries, profile screening, and later coordination around the child.',
    },
  },
  form: {
    accountName: { label: 'Your name', placeholder: 'Your name' },
    identifier: { label: 'Email or phone', placeholder: 'Email or phone' },
    password: { label: 'Password', placeholder: 'Set password' },
    confirmPassword: { label: 'Confirm password', placeholder: 'Enter password again' },
    error: { duplicate: 'Account already exists. Please log in instead.', mismatch: 'Passwords do not match', agreement: 'Please accept the platform terms and privacy notice before creating your account.', server: 'Registration is temporarily unavailable. Please try again later.' },
  },
  process: {
    step1: {
      title: 'Create the account',
      desc: {
        self: 'Set your login method and password to open the member account.',
        parent: 'Set your login method and password to open the family-side account.',
      },
    },
    step2: {
      title: 'Save onboarding intent',
      desc: {
        self: 'The platform records that you want to continue through the member path.',
        parent: 'The platform records that you want to continue through the family path.',
      },
    },
    step3: {
      title: 'Continue into your path',
      desc: {
        self: 'After signup, continue into the member path for browsing, profile completion, and later matching.',
        parent: 'After signup, continue into the parent path for screening, coordination, and later communication.',
      },
    },
  },
}
