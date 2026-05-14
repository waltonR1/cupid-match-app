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
    address: 'Exact address',
    format: 'Format',
    audience: 'Audience',
    seats: 'Seats',
    focus: 'Relationship focus',
    languages: 'Languages',
    advisorNote: 'Advisor note',
  },
  actions: {
    register: 'Request a seat',
    cancel: 'Cancel request',
    loading: 'Processing',
    login: 'Log in to request',
    membership: 'View membership',
    backToEvents: 'Back to events',
  },
  address: {
    locked: 'The exact address opens at the appropriate stage.',
    login_required: 'Log in to view the exact address.',
    registration_required: 'Register for the event to view the exact address.',
    confirmation_required: 'The exact address opens after participation is confirmed.',
  },
  seats: {
    remaining: '{count} seats left',
    waitlist: '{count} on waitlist',
  },
  registration: {
    guest: {
      title: 'Log in before requesting a seat',
      desc: 'Event participation requires an account so the platform can review profile fit and pacing.',
    },
    available: {
      title: 'Currently available',
      desc: 'After submission, an advisor reviews seat availability, profile readiness, and event fit.',
    },
    requested: {
      title: 'Request pending',
      desc: 'Your request has been submitted. An advisor will confirm seat availability and fit before the next step.',
    },
    confirmed: {
      title: 'Seat confirmed',
      desc: 'Your participation is confirmed. Further guidance can be shared before the event.',
    },
    declined: {
      title: 'Not confirmed this time',
      desc: 'A seat is not confirmed for this event. The platform will continue matching you with better-fit sessions.',
    },
    waitlist: {
      title: 'On waitlist',
      desc: 'If a seat opens or a new session is arranged, suitable waitlisted members are contacted first.',
    },
    cancelled: {
      title: 'Request cancelled',
      desc: 'You can request again and the platform will reassess current availability and fit.',
    },
    closed: {
      title: 'Not open for requests',
      desc: 'This event is not accepting new requests. Return to the list for other sessions.',
    },
    member_required: {
      title: 'Member-only event',
      desc: 'This event is open to members. Review membership access before requesting a seat.',
    },
  },
  sections: {
    agenda: 'Agenda',
    notes: 'Event notes',
    notFound: 'No event information is currently available.',
  },
  status: {
    open: 'Open',
    waitlist: 'Waitlist',
    closed: 'Closed',
    member: 'Members only',
  },
}
