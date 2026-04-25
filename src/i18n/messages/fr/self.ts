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

    directory: {
      title: 'Repertoire',
      resultPrefix: 'Resultat actuel :',
      resultSuffix: 'profils',
      empty: 'Aucun profil ne correspond aux filtres actuels.',
      pagePrefix: 'Affichage',
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
      job: 'Metier',
      languages: 'Langues',
    },

    card: {
      goalSerious: 'Relation serieuse',
      goalMarriage: 'Orientation mariage',
      goalExclusive: 'Projet durable',
      goalCrossBorder: 'Ouverture entre villes',
      labelSelected: 'Profil Selectionne',
      labelReview: 'Profil En Verification',
      labelPriority: 'Profil Prioritaire',
    },

    pagination: {
      prev: 'Precedent',
      next: 'Suivant',
    },
  }
