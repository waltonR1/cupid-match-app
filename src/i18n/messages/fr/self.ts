import type { AppMessageSchema } from '@/i18n/types'

export const selfMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Member Directory',
      title: 'Profils membres',
      subtitle: 'Parcourir les profils ouverts, filtrer d abord selon les criteres classiques, puis decider si un profil merite d etre approfondi.',
      tags: {
        first: 'Repertoire reel',
        second: 'Voir puis filtrer',
        third: 'Navigation paginee',
      },
    },

    toolbar: {
      sortLabel: 'Tri',
    },

    loading: 'Chargement...',
    error: { title: 'Echec du chargement', description: 'Verifiez votre connexion et reessayez', retry: 'Reessayer' },
    directory: {
      title: 'Repertoire',
      resultPrefix: 'Resultat actuel :',
      resultSuffix: 'profils',
      empty: 'Aucun profil ne correspond aux filtres actuels.',
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
      height: 'Taille',
      education: 'Formation',
      eduBachelor: 'Licence',
      eduMaster: 'Master',
      eduPhD: 'Doctorat',
      intent: 'Intention',
      industry: 'Secteur',
      languages: 'Langues',
      verified: 'Verification',
      verifiedYes: 'Verifie',
      verifiedNo: 'Non verifie',
      maritalStatus: 'Statut marital',
      maritalSingle: 'Celibataire',
      maritalDivorced: 'Divorce',
      maritalWidowed: 'Veuf / veuve',
      children: 'Enfants',
      childrenYes: 'Avec enfants',
      childrenNo: 'Sans enfant',
      longDistance: 'Distance',
      longDistanceYes: 'Ouvert a distance',
      longDistanceNo: 'Pas de distance',
    },

    sort: {
      recentActive: 'Activite recente',
      priorityFirst: 'Profils prioritaires',
      ageAsc: 'Age croissant',
      ageDesc: 'Age decroissant',
    },

    fields: {
      city: 'Ville',
      education: 'Formation',
      languages: 'Langues',
    },

    pagination: {
      prev: 'Precedent',
      next: 'Suivant',
    },
  }
