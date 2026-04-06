import type { AppMessageSchema } from '@/i18n/types'

export const eventDetailMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Event detail',
    },
    fields: {
      status: 'Status',
      date: 'Date',
      city: 'City',
      venue: 'Venue',
      format: 'Format',
      audience: 'Audience',
      seats: 'Seats',
    },
    actions: {
      register: 'Submit interest',
      joinWaitlist: 'Join waitlist',
      full: 'Currently full',
      registerHint: 'After submission, an advisor reviews availability and overall profile fit before confirming the seat.',
      waitlistHint: 'This event is on waitlist. Suitable profiles are still reviewed and prioritized if a seat opens.',
      fullHint: 'This edition is full. It is better to return to the list and review the next suitable session.',
      backToEvents: 'Back to events',
    },
    sections: {
      agenda: 'Agenda',
      notes: 'Registration notes',
      relatedProfiles: 'Related members',
      relatedEmpty: 'No related member profiles are currently available.',
      notFound: 'No event information is currently available.',
    },
    rules: {
      step1: { title: 'Manual review after submission', desc: 'Seats are not confirmed automatically. An advisor checks availability and overall fit first.' },
      step2: { title: 'Waitlist still moves forward', desc: 'If the room is full, strong profiles stay in sequence and are contacted first if space opens.' },
      step3: { title: 'Pre-event guidance follows', desc: 'Once confirmed, the attendee receives pacing, arrival, and evening guidance ahead of the event.' },
      step4: { title: 'A no is still useful guidance', desc: 'If the format is not the right fit now, the user will be directed to a more suitable upcoming session.' },
    },
    relatedReason: {
      sameCity: 'Same city',
      priority: 'Priority profile',
      verified: 'Well-prepared profile',
      curated: 'Format match',
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  }
