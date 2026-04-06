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
      format: 'Format',
      audience: 'Public',
      seats: 'Places',
    },
    actions: {
      register: 'Envoyer une demande',
      joinWaitlist: 'Rejoindre la liste d attente',
      full: 'Complet',
      registerHint: 'Apres la demande, une conseillere confirme selon les places et la coherence du dossier.',
      waitlistHint: 'Le profil entre en attente et reste prioritaire si une place se libere ou si une nouvelle edition ouvre.',
      fullHint: 'Cette edition est complete. Il vaut mieux revenir a la liste pour consulter une autre session.',
      backToEvents: 'Retour aux evenements',
    },
    sections: {
      agenda: 'Deroule',
      notes: 'Modalites inscription',
      relatedProfiles: 'Profils lies',
      relatedEmpty: 'Aucun profil lie n est disponible pour le moment.',
      notFound: 'Aucune information evenement n a ete trouvee.',
    },
    rules: {
      step1: { title: 'Validation humaine apres demande', desc: 'La participation est confirmee par une conseillere selon les places et la coherence du profil.' },
      step2: { title: 'La liste d attente reste suivie', desc: 'Si les places sont prises, les dossiers adaptes restent prioritaires en cas de desistement ou de nouvelle session.' },
      step3: { title: 'Rappel avant l evenement', desc: 'Une fois la place confirmee, le participant recoit les indications de rythme, d arrivee et de preparation.' },
      step4: { title: 'Un refus reste explicite', desc: 'Si le format ne correspond pas au bon moment, une autre session plus pertinente sera recommandee.' },
    },
    relatedReason: {
      sameCity: 'Meme ville',
      priority: 'Profil prioritaire',
      verified: 'Dossier solide',
      curated: 'Bon format',
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  }
