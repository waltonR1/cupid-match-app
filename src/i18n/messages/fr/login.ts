import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: 'Connectez-vous pour reprendre votre parcours',
      subtitle: 'Entrez votre compte pour retrouver vos profils suivis, vos evenements et le suivi conseiller.',
      formTitle: 'Connexion compte',
      panelTitle: 'Bon retour',
      panelHint: 'Entrez les informations du compte pour retrouver votre progression, vos favoris et vos evenements.',
      submit: 'Connexion',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Disponible apres connexion',
      agreementPrefix: 'En continuant, vous acceptez les',
      agreementTerms: 'Conditions de la plateforme',
      agreementConnector: ' et la ',
      agreementPrivacy: 'Politique de confidentialite',
      agreementSuffix: '. En continuant, vous reconnaissez les regles de la plateforme, la logique de visibilite du compte et les limites de prise de contact.',
      consentConfirm: {
        kicker: 'Confirmation',
        title: 'Veuillez accepter les conditions avant de continuer',
        desc: 'Avant de poursuivre, vous devez confirmer que vous avez lu les conditions de la plateforme et la politique de confidentialite. En acceptant, la case sera cochee automatiquement et la connexion continuera.',
        accept: 'Accepter et continuer',
        reject: 'Refuser',
      },
      autoRouteTitle: 'Orientation auto',
      autoRouteHeading: 'La connexion ouvre le bon parcours automatiquement',
      autoRouteDesc: 'Le systeme lit le contexte du compte et envoie directement vers le parcours membre ou parent.',
    },
    form: {
      identity: { label: 'Email ou WeChat', placeholder: 'Entrez votre contact habituel' },
      password: { label: 'Mot de passe', placeholder: 'Entrez le mot de passe du compte' },
    },
    access: {
      account: { title: 'Vue compte', desc: 'Suivre l avancement du profil, le rythme conseiller et le statut courant.' },
      favorites: { title: 'Favoris et echanges', desc: 'Retrouver les profils suivis, les favoris et les pistes de communication.' },
      events: { title: 'Evenements et agenda', desc: 'Voir les inscriptions, les confirmations et les prochaines rencontres.' },
    },
  }
