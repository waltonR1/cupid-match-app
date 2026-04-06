import type { AppMessageSchema } from '@/i18n/types'

export const myEventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Events',
      title: 'My registrations and event pace',
      subtitle: 'Events are a key progression point in the matchmaking flow. This page separates what the user must confirm and prepare personally from the limited support that family may provide.',
    },
    stats: {
      confirmed: 'Confirmed',
      waitlist: 'Waitlist',
      completed: 'Completed',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'The user decides what to attend',
        description: 'Registration and attendance pace should remain a personal judgment, with events serving the relationship process rather than replacing it.',
        point1: 'Check whether each event actually fits the current stage',
        point2: 'Prepare for both confirmed and waitlisted entries',
        point3: 'Post-event follow-up still belongs to the user',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family only fills specific gaps',
        description: 'Family may help around parent salons, background context, or pre-event preparation, but not replace registration or attendance.',
        point1: 'Best suited for family briefings or context-heavy formats',
        point2: 'Can help organize practical details and follow-up ideas',
        point3: 'Cannot replace the user s participation or judgment',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: 'Current registrations',
      seats: 'Registrations',
      action: 'Open event',
    },
    support: {
      eyebrow: 'Support',
      title: 'Event progression reminders',
      point1: 'Review location, timing, and notes early for confirmed events.',
      point2: 'Keep a lighter pace for waitlisted events instead of overcommitting.',
      point3: 'Completed events are better used for feedback and next-step judgment.',
    },
    family: {
      eyebrow: 'Family',
      title: 'What can involve family',
      point1: 'Event context and parent salon information can be shared.',
      point2: 'The user still decides whether to continue afterward.',
      point3: 'If family should stay out, the current boundary can remain unchanged.',
    },
    status: {
      confirmed: 'Confirmed',
      waitlist: 'Waitlist',
      completed: 'Completed',
    },
  }
