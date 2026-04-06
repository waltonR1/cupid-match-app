import type { AppMessageSchema } from '@/i18n/types'

export const messagesPageMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Messages',
      title: 'Messages and communication boundaries',
      subtitle: 'The messaging page stays centered on direct user-led conversation. Even if a profile is family-visible, the conversation itself is not delegated.',
    },
    stats: {
      threads: 'Threads',
      unread: 'Unread',
      familyVisible: 'Family-visible profiles',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Conversation must stay personal',
        description: 'Reply timing, tone, and next-step judgment are part of the user s own relational signal and should not be outsourced.',
        point1: 'The user decides when to reply and how to move forward',
        point2: 'Unread messages do not automatically require an instant answer',
        point3: 'Tone and relationship boundaries should stay in the user s hands',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family can understand context, not enter the dialogue',
        description: 'Even when a profile is visible to family, the conversation itself should not become a delegated channel.',
        point1: 'Family may understand general context but not the detail of the exchange',
        point2: 'If family input is useful, it should happen outside the chat thread',
        point3: 'Actual chemistry can only be judged through direct interaction',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: 'Current conversations',
      familyBadge: 'Family-visible profile',
      unreadLabel: 'Unread',
      open: 'Open profile',
    },
    support: {
      eyebrow: 'Support',
      title: 'Communication reminders',
      point1: 'The strongest signal is reply quality and clarity, not raw speed alone.',
      point2: 'If offline steps or family involvement are next, handle them outside the thread.',
      point3: 'Keep the user s own voice instead of drifting into scripted messaging.',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: 'Family boundary on this page',
      point1: 'No one sends messages on the user s behalf.',
      point2: 'Family input stays limited to outside context or follow-up advice.',
      point3: 'Real compatibility is judged through direct user interaction.',
    },
  }
