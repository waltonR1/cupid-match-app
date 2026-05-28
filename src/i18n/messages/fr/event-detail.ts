import type { AppMessageSchema } from '@/i18n/types'

export const eventDetailMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Detail evenement',
  },
  fields: {
    status: 'Statut',
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
  },
  actions: {
    register: 'Demander une place',
    cancel: 'Annuler la demande',
    loading: 'Traitement',
    login: 'Se connecter',
    membership: 'Voir les abonnements',
    backToEvents: 'Retour aux evenements',
  },
  address: {
    locked: 'L adresse exacte sera ouverte au bon moment.',
    login_required: 'Connectez-vous pour voir l adresse exacte.',
    registration_required: 'Demandez une place pour voir l adresse exacte.',
    confirmation_required: 'L adresse exacte s ouvre apres confirmation.',
  },
  seats: {
    remaining: '{count} places restantes',
    waitlist: '{count} en attente',
  },
  registration: {
    guest: {
      title: 'Connexion requise',
      description: 'La participation demande un compte afin que la plateforme puisse verifier le profil et le rythme.',
    },
    available: {
      title: 'Demande possible',
      description: 'Apres la demande, une conseillere verifie les places, le dossier et la coherence avec le format.',
    },
    requested: {
      title: 'Demande en attente',
      description: 'Votre demande est envoyee. Une conseillere confirmera la place et la coherence avant la suite.',
    },
    confirmed: {
      title: 'Place confirmee',
      description: 'Votre participation est confirmee. Des indications complementaires pourront suivre avant l evenement.',
    },
    declined: {
      title: 'Non confirme cette fois',
      description: 'La place n est pas confirmee pour cet evenement. La plateforme continuera a proposer des sessions plus adaptees.',
    },
    waitlist: {
      title: 'En attente',
      description: 'Si une place se libere ou si une nouvelle session ouvre, les profils adaptes sont contactes en priorite.',
    },
    cancelled: {
      title: 'Place annulee',
      description: 'Cette place confirmee a ete annulee. Contactez l equipe de la plateforme pour organiser une nouvelle option.',
    },
    closed: {
      title: 'Demandes fermees',
      description: 'Cet evenement ne prend plus de nouvelles demandes. Consultez une autre session.',
    },
    member_required: {
      title: 'Reserve aux membres',
      description: 'Cet evenement est ouvert aux membres. Consultez les acces avant de demander une place.',
    },
  },
  sections: {
    agenda: 'Deroule',
    notes: 'Notes evenement',
    notFound: 'Aucune information evenement n est disponible.',
  },
  status: {
    open: 'Ouvert',
    waitlist: 'Attente',
    closed: 'Ferme',
    member: 'Membres',
  },
}
