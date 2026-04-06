import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Selection d evenements',
      title: 'Liste des evenements',
      subtitle: 'Consulte les evenements ouverts, en attente ou complets pour comprendre rapidement le format, la ville, le lieu et le niveau d acces.',
      nextEvent: 'Evenement prioritaire',
    },
    fields: {
      date: 'Date',
      city: 'Ville',
      venue: 'Lieu',
      format: 'Format',
      audience: 'Public',
      seats: 'Places',
    },
    stats: {
      totalEvents: 'Evenements',
      openEvents: 'Ouverts',
      waitlistEvents: 'Attente',
      cities: 'Villes',
    },
    featured: {
      eyebrow: 'A voir en premier',
      title: 'Evenements ouverts et en attente',
      subtitle: 'Les formats encore accessibles ou actuellement en attente sont mis en avant pour faciliter la lecture.',
    },
    schedule: {
      eyebrow: 'Vue complete',
      title: 'Calendrier complet',
      note: 'Cette liste donne une vision d ensemble du rythme des evenements. Elle pourra ensuite se brancher directement sur de vraies donnees d activite.',
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  }
