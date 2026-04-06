import type { AppMessageSchema } from '@/i18n/types'

export const familyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Family Participation',
      title: 'Participation famille',
      subtitle: 'Cette page correspond a l etape de participation familiale ou la famille consulte d abord les dossiers autorises.',
      tags: {
        first: 'Voir les dossiers',
        second: 'Filtrer d abord',
        third: 'Evaluer la compatibilite',
      },
    },

    stats: {
      visibleProfiles: 'Dossiers visibles',
      priorityProfiles: 'Priorite famille',
      contactReady: 'Pret pour echange',
    },

    toolbar: {
      sortLabel: 'Tri',
    },

    directory: {
      title: 'Filtrage famille',
      resultPrefix: 'Selection actuelle :',
      resultSuffix: 'dossiers',
      empty: 'Aucun dossier familial ne correspond aux criteres actuels.',
      pagePrefix: 'Affichage',
    },

    filters: {
      clear: 'Tout effacer',
      expand: 'Afficher plus',
      collapse: 'Replier',
      gender: 'Genre',
      genderMale: 'Homme',
      genderFemale: 'Femme',
      age: 'Age',
      city: 'Ville',
      education: 'Formation',
      intent: 'Projet relationnel',
      familyMode: 'Mode famille',
      occupation: 'Metier',
      industry: 'Secteur',
      maritalStatus: 'Statut marital',
      children: 'Enfants',
      longDistance: 'Distance',
    },

    fields: {
      city: 'Ville',
      education: 'Formation',
      residencePlan: 'Projet de vie',
      job: 'Metier',
    },

    modes: {
      contextOnly: 'Contexte seulement',
      contactReady: 'Pret pour echange famille',
      priority: 'Priorite famille',
    },

    tags: {
      maritalSingle: 'Celibataire',
      maritalDivorced: 'Divorce',
      maritalWidowed: 'Veuf / veuve',
      childrenYes: 'Avec enfants',
      childrenNo: 'Sans enfant',
      longDistanceYes: 'Ouvert a distance',
      longDistanceNo: 'Plutot meme ville',
    },

    card: {
      labelObserve: 'A evaluer en famille',
      labelContactReady: 'Echange famille possible',
      labelReview: 'Dossier encore en verification',
      labelPriority: 'A pousser en priorite',
    },

    pagination: {
      prev: 'Precedent',
      next: 'Suivant',
    },
  }
