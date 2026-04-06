import type { AppMessageSchema } from '@/i18n/types'

export const accountMessages: AppMessageSchema = {
    nav: {
      overview: 'Overview',
      profile: 'My profile',
      events: 'My registrations',
      favorites: 'Favorites',
      messages: 'Messages',
      privacy: 'Privacy',
    },
    membership: {
      free: 'Free member',
      silver: 'Silver member',
      gold: 'Gold member',
      diamond: 'Diamond member',
    },
    hero: {
      eyebrow: 'Account',
      title: 'Matchmaking account overview',
      subtitle: 'This is the control surface for profile progress, saved profiles, event registrations, and conversations. The user leads every core decision, while family only assists within explicitly granted boundaries.',
    },
    stats: {
      completion: 'Profile completion',
      events: 'Registrations',
      unread: 'Unread threads',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'The user leads the process',
        description: 'The overview centers on profile quality, saved profiles, event momentum, and direct conversations controlled by the user.',
        point1: 'Profile visibility is decided by the user',
        point2: 'Favorites, registrations, and messaging follow the user s own pace',
        point3: 'Advisors or family only enter as support when needed',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family stays within a limited role',
        description: 'Family is not a second operator of the account and only sees the information that has been explicitly opened.',
        point1: 'Only family-visible materials are shared',
        point2: 'Family can help with context and event preparation',
        point3: 'They do not decide, register, or chat on the user s behalf',
      },
    },
    quickActions: {
      eyebrow: 'Actions',
      title: 'Quick actions',
      subtitle: 'Direct entry points, but named around the matchmaking flow rather than a generic dashboard pattern.',
      profile: {
        title: 'Refine profile',
        desc: 'Review completion, visibility, and family-assisted settings.',
      },
      events: {
        title: 'Check registrations',
        desc: 'Track confirmed, waitlist, and completed offline events.',
      },
      favorites: {
        title: 'Review favorites',
        desc: 'Separate private saves from profiles that can be shared with family.',
      },
      messages: {
        title: 'Continue conversations',
        desc: 'See unread threads and keep user-led communication momentum.',
      },
      privacy: {
        title: 'Adjust permissions',
        desc: 'Control advisor contact, family assistance, and profile field exposure.',
      },
      upgrade: {
        title: 'Upgrade membership',
        desc: 'Return to the membership flow and unlock stronger support.',
      },
    },
    snapshot: {
      eyebrow: 'Snapshot',
      title: 'Current account state',
      joined: 'Joined',
      membership: 'Membership',
      currentProfile: 'Current profile',
      latestEvent: 'Latest registration',
      familyAssist: 'Family assistance',
      unread: 'Unread messages',
      enabled: 'Enabled',
      disabled: 'Disabled',
      none: 'Not set',
    },
    nextSteps: {
      eyebrow: 'Next',
      title: 'Recommended next steps',
      point1: 'Tighten profile quality before widening outreach.',
      point2: 'Prepare for confirmed or waitlisted events in advance.',
      point3: 'Open family collaboration only when it actually helps the process.',
    },
  }
