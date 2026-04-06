import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Curated offline events',
      title: 'Event list',
      subtitle: 'Browse open, waitlist, and full events to quickly understand timing, city, venue, and participation fit.',
      nextEvent: 'Priority event',
    },
    fields: {
      date: 'Date',
      city: 'City',
      venue: 'Venue',
      format: 'Format',
      audience: 'Audience',
      seats: 'Seats',
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
      note: 'This full list helps users read the current event rhythm and distribution. It can later connect directly to live event data.',
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  }
