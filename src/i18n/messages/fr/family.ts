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

    toolbar: {
      sortLabel: 'Tri',
    },

    loading: 'Chargement...',
    error: { title: 'Echec du chargement', description: 'Verifiez votre connexion et reessayez', retry: 'Reessayer' },
    directory: {
      title: 'Filtrage famille',
      resultPrefix: 'Selection actuelle :',
      resultSuffix: 'dossiers',
      empty: 'Aucun dossier familial ne correspond aux criteres actuels.',
      pagePrefix: 'Affichage',
      favoriteFailed: 'Impossible de mettre a jour le favori.',
    },

    filters: {
      all: 'Tous',
      clear: 'Tout effacer',
      expand: 'Afficher plus',
      collapse: 'Replier',
      gender: 'Genre',
      genderMale: 'Homme',
      genderFemale: 'Femme',
      age: 'Age',
      ageUnder25: 'Moins de 25 ans',
      age25to29: '25-29 ans',
      age30to34: '30-34 ans',
      age35to39: '35-39 ans',
      age40plus: '40 ans et plus',
      city: 'Ville',
      education: 'Formation',
      eduBachelor: 'Licence',
      eduMaster: 'Master',
      eduPhD: 'Doctorat',
      intent: 'Projet relationnel',
      familyMode: 'Mode famille',
      modeContextOnly: 'Contexte seulement',
      modeContactReady: 'Pret pour echange famille',
      modePriority: 'Priorite famille',
      industry: 'Secteur',
      maritalStatus: 'Statut marital',
      maritalSingle: 'Celibataire',
      maritalDivorced: 'Divorce',
      maritalWidowed: 'Veuf / veuve',
      children: 'Enfants',
      childrenYes: 'Avec enfants',
      childrenNo: 'Sans enfant',
      longDistance: 'Distance',
      longDistanceYes: 'Ouvert a distance',
      longDistanceNo: 'Plutot meme ville',
    },

    sort: {
      priorityFirst: 'Priorite famille',
      recentActive: 'Activite recente',
      ageAsc: 'Age croissant',
      ageDesc: 'Age decroissant',
    },

    fields: {
      city: 'Ville',
      education: 'Formation',
      residencePlan: 'Projet de vie',
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
