import type { AppMessageSchema } from '@/i18n/types'

export const messagesPageMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Messages',
      title: 'Messages et limites de communication',
      subtitle: 'La page messages reste centree sur un echange direct mene par la personne. Meme si un profil est visible cote famille, la conversation ne l est pas.',
    },
    stats: {
      threads: 'Fils',
      unread: 'Non lus',
      familyVisible: 'Profils visibles famille',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'La conversation doit rester personnelle',
        description: 'Le rythme de reponse et la maniere de faire avancer l echange ne peuvent pas etre delegues.',
        point1: 'La personne choisit quand repondre et comment avancer',
        point2: 'Un non lu n impose pas une reaction immediate',
        point3: 'Le ton et les limites relationnelles restent personnels',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille comprend le contexte, pas le dialogue',
        description: 'Meme quand un profil est partageable cote famille, la discussion elle-meme ne doit pas devenir un espace de delegation.',
        point1: 'La famille peut comprendre le contexte general, pas le detail de l echange',
        point2: 'Si une aide familiale est utile, elle se traite hors conversation',
        point3: 'La lecture humaine de l echange reste celle de la personne',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: 'Conversations en cours',
      familyBadge: 'Profil visible famille',
      unreadLabel: 'Non lu',
      open: 'Voir le profil',
    },
    support: {
      eyebrow: 'Support',
      title: 'Repères de communication',
      point1: 'Le vrai signal n est pas la vitesse seule mais la qualite de l echange.',
      point2: 'Si une phase hors ligne ou familiale arrive, mieux vaut la traiter hors messagerie.',
      point3: 'Conserver une voix personnelle reste prioritaire.',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: 'Limite familiale sur cette page',
      point1: 'Pas de messages envoyes a la place de la personne.',
      point2: 'Seulement du contexte ou du conseil hors fil de discussion.',
      point3: 'La compatibilite se lit dans l interaction directe.',
    },
  }
