import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Evenements hors ligne',
    title: 'Liste des evenements',
    subtitle: 'Consulte les evenements ouverts, en attente et reserves aux membres pour lire le lieu, le rythme et le niveau d acces.',
    nextEvent: 'Evenement prioritaire',
  },
  fields: {
    date: 'Date',
    city: 'Ville',
    venue: 'Lieu',
    address: 'Adresse exacte',
    format: 'Format',
    audience: 'Public',
    seats: 'Places',
    focus: 'Theme relationnel',
    languages: 'Langues',
    curatorNote: 'Note du curateur',
    status: 'Statut',
  },
  seats: {
    remaining: '{count} places restantes',
    waitlist: '{count} en attente',
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
    note: 'Les adresses exactes sont ouvertes selon la connexion et la confirmation, avec un rythme controle par la plateforme.',
  },
  empty: {
    title: 'Aucun evenement ouvert',
    description: 'La plateforme prepare les prochains evenements hors ligne. Merci de revenir plus tard.',
  },
  status: {
    open: 'Ouvert',
    waitlist: 'Attente',
    closed: 'Ferme',
    completed: 'Termine',
    member: 'Membres',
  },
}
