import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Registration',
      title: 'Choose identity before signup',
      subtitle: 'Registration now begins with a clear choice: are you joining for yourself, or as a parent participating in the process?',
      selectedRole: 'Active identity',
      formTitle: 'Registration details',
      submit: 'Submit this request',
      processTitle: 'Process',
      roleBenefitTitle: 'What this registration focuses on',
    },
    roles: {
      self: {
        badge: 'Member path',
        title: 'Register for myself',
        desc: 'For members who want to build their own profile and move directly into the matching journey.',
        note: 'This path emphasizes the personal profile, preferences, advisor guidance, and member-led communication.',
      },
      parent: {
        badge: 'Family path',
        title: 'Register as a parent',
        desc: 'For parents who want to screen first, understand the process, and help guide the next step.',
        note: 'This path emphasizes family participation, communication boundaries, and assisted profile progression.',
      },
    },
    form: {
      name: { label: 'Name', placeholder: 'Enter your name' },
      city: { label: 'City', placeholder: 'Example: Paris / Lyon / Brussels' },
      contact: { label: 'Email or WeChat', placeholder: 'Used for advisor follow-up' },
      intent: {
        label: 'Registration intent',
        placeholder: {
          self: 'Example: serious dating / marriage-minded / want to explore the profile library first',
          parent: 'Example: exploring for my child / parent-first communication / screening suitable families first',
        },
      },
    },
    process: {
      step1: {
        title: 'Confirm identity',
        desc: {
          self: 'Confirm that you are joining as the member yourself before starting the registration flow.',
          parent: 'Confirm that you are joining as a parent before starting the family-side flow.',
        },
      },
      step2: {
        title: 'Submit your basic details',
        desc: {
          self: 'Share your core contact details, city, and relationship intent to begin profile completion and advisor follow-up.',
          parent: 'Share the parent-side contact details and support intent before adding more child and family context later.',
        },
      },
      step3: {
        title: 'Move into the right flow',
        desc: {
          self: 'From there, the journey continues into personal profile building, browsing, advisor guidance, and meetings.',
          parent: 'From there, the journey continues into family participation, screening, authorization, and coordination.',
        },
      },
    },
    roleBenefits: {
      self: {
        title: 'Registering as the member',
        desc: 'This path works best when the member wants to present themselves directly and lead the pace of contact.',
      },
      parent: {
        title: 'Registering as the parent',
        desc: 'This path works best when the family wants to screen and coordinate first before the formal member introduction.',
      },
    },
  }
