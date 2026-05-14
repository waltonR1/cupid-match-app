import type { AppMessageSchema } from '@/i18n/types'

export const accountCenterMessages: AppMessageSchema = {
  nav: {
    profile: 'Profil',
    verification: 'Verification',
    connections: 'Connexions',
    messages: 'Messages',
    safety: 'Securite',
    membership: 'Services',
  },
  topSummary: {
    title: 'Centre du compte',
    guestName: 'Compte non connecte',
    subtitle: 'Le centre du compte est reconstruit autour du nouveau modele profil, abonnement et introduction mediee. Pour l instant il garde seulement l etat du compte et la navigation.',
    metrics: {
      status: 'Statut',
      workspace: 'Module compte',
      membership: 'Abonnement',
      activity: 'Activites',
    },
    status: {
      signedIn: 'Connecte',
      guest: 'Non connecte',
      rebuilding: 'Reconstruction',
      paused: 'En pause',
    },
    actions: {
      profile: 'Modifier le profil',
      verification: 'Verifier',
      connections: 'Voir les connexions',
      membership: 'Voir les services',
    },
  },
  placeholder: {
    title: 'Centre du compte en reconstruction',
    profile: 'La page profil garde seulement la coque du compte. Elle sera reconnectee via ownership profil et le nouveau modele de champs.',
    membership: 'L abonnement reviendra apres la reconstruction des plans, droits et quotas.',
    activity: 'Les activites seront reconnectees quand les inscriptions evenement deviendront la source de verite.',
    connections: 'Favoris et introductions privees seront reconnectes via le nouveau flux account connections.',
    messages: 'Les messages passeront aux rooms d introduction privee et suivis conseiller, plus aux anciens resumes de conversation.',
    safety: 'Confidentialite et securite seront reconstruites depuis user preferences et profile visibility settings.',
    verification: 'La verification sera reconstruite depuis profile verifications et les revues conseiller.',
  },
  profile: {
    eyebrow: 'Profil',
    title: 'Mon profil',
    subtitle: 'La qualite du profil passe avant tout. Rendez les informations completes, fiables et pretes pour la mise en relation.',
  },
  verification: {
    eyebrow: 'Confiance',
    title: 'Centre de verification',
    subtitle: 'Une plateforme matrimoniale serieuse doit montrer la confiance clairement, separee des reglages generaux.',
  },
  connections: {
    eyebrow: 'Rencontres',
    title: 'Mes connexions',
    subtitle: 'Favoris, attirances reciproques, profils partageables et recommandations doivent vivre dans un meme flux.',
  },
  messages: {
    eyebrow: 'Messages',
    title: 'Conversations',
    subtitle: 'La messagerie doit rester simple et orientee action, avec confiance et securite visibles sans reprendre l ancien tableau de bord.',
  },
  safety: {
    eyebrow: 'Securite',
    title: 'Confidentialite et securite',
    subtitle: 'Visibilite, regles de contact, acces familial et gestion du risque doivent etre centralises.',
  },
  membership: {
    eyebrow: 'Service',
    title: 'Abonnement et services',
    subtitle: 'L abonnement doit clarifier la valeur de service sans prendre toute la structure du compte.',
  },
  activity: {
    eyebrow: 'Activite',
    title: 'Mes activites',
    subtitle: 'Les evenements restent une page secondaire du compte, pas une destination principale.',
  },
}
