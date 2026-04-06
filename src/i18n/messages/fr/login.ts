import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: 'Entrez dans votre parcours',
      subtitle: 'Apres connexion, le systeme reconnait automatiquement votre identite et vous dirige vers le bon parcours.',
      formTitle: 'Acces compte',
      panelTitle: 'Connectez votre compte',
      panelHint: 'Il n y a plus de selection manuelle du role ici. Le systeme determine automatiquement le bon parcours.',
      submit: 'Entrer dans le compte',
      secondary: 'Pas encore de compte ? S inscrire',
      accessTitle: 'Disponible apres connexion',
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
