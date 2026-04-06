import type { AppMessageSchema } from '@/i18n/types'

export const privacyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Privacy',
      title: 'Confidentialite et perimetre familial',
      subtitle: 'Cette page ne presente pas de simples interrupteurs abstraits. Elle fixe qui peut voir quoi, qui peut te contacter et jusqu ou la famille peut intervenir.',
    },
    stats: {
      enabled: 'Actifs',
      disabled: 'Inactifs',
      familyAssist: 'Aide familiale',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Les permissions protegent d abord la main de la personne',
        description: 'Les reglages servent d abord a proteger les limites personnelles, pas a faire entrer plus d acteurs par defaut.',
        point1: 'Decider qui peut contacter la personne et quand',
        point2: 'Decider quels champs du profil peuvent s ouvrir',
        point3: 'Rester sur un minimum d autorisation quand la collaboration n est pas utile',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille doit etre autorisee explicitement',
        description: 'La participation familiale n est pas un passage automatique mais une permission ouverte au bon moment.',
        point1: 'La famille n entre que dans les parties explicitement autorisees',
        point2: 'Utile pour le contexte et le rythme, pas pour decider a la place',
        point3: 'Cette permission peut rester fermee ou etre retiree',
      },
    },
    sections: {
      userEyebrow: 'User control',
      userTitle: 'Controle direct de la personne',
      userSubtitle: 'Ces reglages determinent comment la plateforme, le conseiller et les champs du profil travaillent pour la personne.',
      familyEyebrow: 'Family scope',
      familyTitle: 'Perimetre d aide familiale',
      familySubtitle: 'La collaboration familiale ne doit entrer dans le parcours qu a partir de cette section.',
      statusEnabled: 'Actif',
      statusDisabled: 'Inactif',
    },
    notes: {
      eyebrow: 'Notes',
      title: 'Principes actuels',
      point1: 'Le contact conseiller n equivaut pas a une implication familiale.',
      point2: 'L aide familiale est plus pertinente quand une direction relationnelle se dessine.',
      point3: 'Avant d ouvrir plus de champs, verifier que cela sert vraiment la progression.',
    },
  }
