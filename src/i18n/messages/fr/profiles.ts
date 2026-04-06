import type { AppMessageSchema } from '@/i18n/types'

export const profilesMessages: AppMessageSchema = {
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
      clear: 'Tout effacer',
      expand: 'Afficher plus',
      collapse: 'Replier',
      gender: 'Genre',
      genderMale: 'Homme',
      genderFemale: 'Femme',
      age: 'Age',
      city: 'Ville',
      height: 'Taille',
      education: 'Formation',
      intent: 'Intention',
      industry: 'Secteur',
      languages: 'Langues',
      verified: 'Verification',
      maritalStatus: 'Statut marital',
      children: 'Enfants',
      longDistance: 'Distance',
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
