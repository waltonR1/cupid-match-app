import type { AppMessageSchema } from '@/i18n/types'

export const favoritesMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Favorites',
      title: 'Favoris et tri en cours',
      subtitle: 'La page separe les profils gardes seulement pour la personne et ceux qui peuvent etre partages avec la famille au bon moment.',
    },
    stats: {
      saved: 'Favoris',
      shared: 'Visibles famille',
      private: 'Prives',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Les favoris servent d abord au tri personnel',
        description: 'Sauvegarder un profil fait partie du raisonnement personnel et n a pas besoin d etre expose tout de suite.',
        point1: 'Conserver les profils a observer de plus pres',
        point2: 'Noter les vrais points de compatibilite a suivre',
        point3: 'Ouvrir la famille seulement au moment utile',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille ne voit que ce qui est partage',
        description: 'La collaboration familiale devient pertinente plus tard, pas pendant le tri initial.',
        point1: 'Seuls les favoris family-visible passent cote famille',
        point2: 'Utile pour les profils demandant du contexte supplementaire',
        point3: 'La famille ne decide pas de la suite',
      },
    },
    sections: {
      privateEyebrow: 'Private',
      privateTitle: 'Favoris reserves a la personne',
      privateSubtitle: 'Cette partie garde l observation initiale et les notes personnelles.',
      sharedEyebrow: 'Family-visible',
      sharedTitle: 'Favoris partageables avec la famille',
      sharedSubtitle: 'Ces profils peuvent entrer dans une lecture familiale autorisee et limitee.',
      openUser: 'Voir le profil',
      openFamily: 'Voir la vue famille',
      savedAt: 'Sauvegarde',
      emptyTitle: 'Aucun contenu',
      emptyDescription: 'Aucun profil n est encore present dans cette section.',
      familyBadge: 'Visible famille',
      privateBadge: 'Tri personnel',
    },
  }
