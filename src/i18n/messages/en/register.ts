import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Registration',
    title: 'Create your account and begin your matchmaking path',
    subtitle: 'Finish the core account signup first, then continue into the member or parent flow that fits your identity. You can complete the broader profile and follow-up steps after registration.',
    selectedRole: 'Selected identity',
    formTitle: 'Account Setup',
    panelTitle: 'Create your account',
    panelHint: 'Use your main email or WeChat, set your password, and add the minimum details needed to open the account and continue into the right identity path.',
    submit: 'Create account',
    processTitle: 'How signup works',
    agreementPrefix: 'I have read and agree to the',
    agreementTerms: 'Platform Terms',
    agreementConnector: ' and ',
    agreementPrivacy: 'Privacy Notice',
    agreementSuffix: '. After registration, the platform may use my account information for necessary service contact and will control profile visibility according to my identity path and privacy settings.',
    formFootnote: 'After registration, you can continue completing your profile, adjust visibility settings, and add more detailed relationship information inside the account.',
  },
  roles: {
    self: {
      badge: 'Member path',
      title: 'Register for myself',
      desc: 'Best for members who want to build their own profile, define relationship preferences directly, and move into matching and advisor guidance themselves.',
      note: 'This path emphasizes personal profile quality, preference clarity, advisor support, and communication led directly by the member.',
    },
    parent: {
      badge: 'Family path',
      title: 'Register as a parent',
      desc: 'Best for parents who want to understand the process first, review candidates from a family perspective, and join the early communication flow.',
      note: 'This path emphasizes family participation, review boundaries, profile screening, and later coordination around the child.',
    },
  },
  form: {
    email: { label: 'Email or WeChat', placeholder: 'Enter your main email or WeChat' },
    password: { label: 'Password', placeholder: 'Set your login password' },
    confirmPassword: { label: 'Confirm password', placeholder: 'Enter the password again' },
    name: { label: 'Name or display name', placeholder: 'Enter your name or the name you want to use' },
    city: { label: 'City', placeholder: 'Example: Paris / Lyon / Brussels' },
  },
  process: {
    step1: {
      title: 'Create the account',
      desc: {
        self: 'Start by setting your email or WeChat and your password to open the member account.',
        parent: 'Start by setting your email or WeChat and your password to open the family-side account.',
      },
    },
    step2: {
      title: 'Add the basics',
      desc: {
        self: 'Add your name and city first, then continue into the broader personal profile afterwards.',
        parent: 'Add the parent-side name and city first, then continue into the broader family setup afterwards.',
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
