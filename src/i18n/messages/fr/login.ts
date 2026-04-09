import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: 'Connectez-vous pour reprendre votre parcours',
      subtitle: 'Entrez votre compte pour retrouver vos profils suivis, vos evenements et le suivi conseiller.',
      formTitle: 'Connexion compte',
      panelTitle: 'Bon retour',
      panelHint: 'Le login reste en mode demo. Le bouton entre directement dans le compte sans verifier les champs saisis.',
      submit: 'Connexion',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Disponible apres connexion',
      autoRouteTitle: 'Orientation auto',
      autoRouteHeading: 'La connexion ouvre le bon parcours automatiquement',
      autoRouteDesc: 'Le systeme lit le contexte du compte et envoie directement vers le parcours membre ou parent.',
    },
    form: {
      identity: { label: 'Email ou WeChat', placeholder: 'Entrez votre contact habituel' },
      password: { label: 'Mot de passe', placeholder: 'Mode demo, aucun vrai mot de passe requis' },
    },
    access: {
      account: { title: 'Vue compte', desc: 'Suivre l avancement du profil, le rythme conseiller et le statut courant.' },
      favorites: { title: 'Favoris et echanges', desc: 'Retrouver les profils suivis, les favoris et les pistes de communication.' },
      events: { title: 'Evenements et agenda', desc: 'Voir les inscriptions, les confirmations et les prochaines rencontres.' },
    },
  }
