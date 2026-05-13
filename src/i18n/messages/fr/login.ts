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
      loading: 'Connexion...',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Disponible apres connexion',
      agreementPrefix: 'En continuant, vous acceptez les',
      agreementTerms: 'Conditions de la plateforme',
      agreementConnector: ' et la ',
      agreementPrivacy: 'Politique de confidentialite',
      agreementSuffix: '. En continuant, vous reconnaissez les regles de la plateforme, la logique de visibilite du compte et les limites de prise de contact.',
      autoRouteTitle: 'Orientation auto',
      autoRouteHeading: 'La connexion ouvre le bon parcours automatiquement',
      autoRouteDesc: 'Le systeme lit le contexte du compte et envoie directement vers le parcours membre ou parent.',
    },
    form: {
      identifier: { label: 'Email ou telephone', placeholder: 'Email ou telephone' },
      password: { label: 'Mot de passe', placeholder: 'Mot de passe' },
      error: { invalid: 'Compte ou mot de passe incorrect. Veuillez reessayer.', agreement: 'Veuillez accepter les conditions de la plateforme et la politique de confidentialite avant de vous connecter.' },
    },
    access: {
      account: { title: 'Vue compte', desc: 'Suivre l avancement du profil, le rythme conseiller et le statut courant.' },
      favorites: { title: 'Favoris et echanges', desc: 'Retrouver les profils suivis, les favoris et les pistes de communication.' },
    },
  }
