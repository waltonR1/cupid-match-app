import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Curated offline events',
    title: 'Event list',
    subtitle: 'Browse open, waitlist, and member-only events to understand timing, city, venue, and access level.',
    nextEvent: 'Priority event',
  },
  fields: {
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
    status: 'Status',
  },
  seats: {
    remaining: '{count} seats left',
    waitlist: '{count} on waitlist',
  },
  stats: {
    totalEvents: 'Events',
    openEvents: 'Open',
    waitlistEvents: 'Waitlist',
    cities: 'Cities',
  },
  featured: {
    eyebrow: 'Start here',
    title: 'Open and waitlist events',
    subtitle: 'Events that are still available or currently running on waitlist are surfaced first for faster review.',
  },
  schedule: {
    eyebrow: 'Full view',
    title: 'Complete event calendar',
    note: 'Exact addresses open according to login and registration status while the platform keeps participation paced.',
  },
  empty: {
    title: 'No open events',
    description: 'The platform is curating the next offline events. Please check back later.',
  },
  status: {
    open: 'Open',
    waitlist: 'Waitlist',
    closed: 'Closed',
    completed: 'Completed',
    member: 'Members only',
  },
}
