import type { AppMessageSchema } from '@/i18n/types'

export const accountMessages: AppMessageSchema = {
    nav: {
      overview: 'Vue compte',
      profile: 'Mon profil',
      events: 'Mes inscriptions',
      favorites: 'Mes favoris',
      messages: 'Messages',
      privacy: 'Confidentialite',
    },
    membership: {
      free: 'Membre gratuit',
      silver: 'Membre silver',
      gold: 'Membre gold',
      diamond: 'Membre diamond',
    },
    hero: {
      eyebrow: 'Account',
      title: 'Vue d ensemble du compte',
      subtitle: 'Cette page sert de panneau principal pour le profil, les favoris, les inscriptions et les conversations. La personne garde la main, la famille n intervient qu a l interieur des permissions accordees.',
    },
    stats: {
      completion: 'Completion',
      events: 'Inscriptions',
      unread: 'Non lus',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Pilotage par la personne',
        description: 'La page met d abord en avant les decisions de profil, de selection, d inscription et de conversation prises par la personne elle-meme.',
        point1: 'La visibilite du profil reste decidee par la personne',
        point2: 'Favoris, inscriptions et conversations suivent son propre rythme',
        point3: 'Le conseiller ou la famille n arrivent qu en soutien',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille reste un appui limite',
        description: 'La famille ne devient jamais un second operateur du compte et n accede qu aux informations explicitement ouvertes.',
        point1: 'Seulement les contenus rendus visibles a la famille',
        point2: 'Aide sur le contexte et sur la lecture du parcours',
        point3: 'Pas de decision, pas d inscription, pas de conversation a la place de la personne',
      },
    },
    quickActions: {
      eyebrow: 'Actions',
      title: 'Acces rapides',
      subtitle: 'Des entrees directes, mais formulees selon le parcours matrimonial plutot qu une logique de tableau de bord generique.',
      profile: {
        title: 'Mettre le profil au propre',
        desc: 'Verifier la completion, la visibilite et le niveau d ouverture familiale.',
      },
      events: {
        title: 'Suivre les inscriptions',
        desc: 'Relire les confirmations, listes d attente et evenements termines.',
      },
      favorites: {
        title: 'Revoir les favoris',
        desc: 'Distinguer les profils prives de ceux partageables avec la famille.',
      },
      messages: {
        title: 'Reprendre les echanges',
        desc: 'Voir les fils non lus et garder une cadence de conversation maitrisee.',
      },
      privacy: {
        title: 'Ajuster les permissions',
        desc: 'Regler le contact conseiller, l aide familiale et l ouverture des champs.',
      },
      upgrade: {
        title: 'Faire evoluer le membre',
        desc: 'Retourner vers les formules et les niveaux de service.',
      },
    },
    snapshot: {
      eyebrow: 'Snapshot',
      title: 'Etat actuel du compte',
      joined: 'Inscription',
      membership: 'Abonnement',
      currentProfile: 'Profil actif',
      latestEvent: 'Derniere inscription',
      familyAssist: 'Aide familiale',
      unread: 'Messages non lus',
      enabled: 'Active',
      disabled: 'Inactive',
      none: 'Aucun',
    },
    nextSteps: {
      eyebrow: 'Next',
      title: 'Etapes recommandees',
      point1: 'Completer le profil avant d elargir les prises de contact.',
      point2: 'Preparer les evenements deja reserves ou en attente.',
      point3: 'N ouvrir la collaboration familiale qu au moment opportun.',
    },
  }
