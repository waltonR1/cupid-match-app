import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Messages',
  subtitle: 'Les notifications et alertes systeme apparaitront ici.',
  placeholder: 'Les notifications et alertes systeme apparaitront ici. La communication encadree sera disponible ulterieurement.',
  notifications: 'Notifications systeme',  loadMore: 'Voir plus',
  loading: 'Chargement...',
  actions: { viewDetails: 'Voir les details' },
  error: { title: 'Impossible de charger les messages', description: 'Veuillez reessayer plus tard.' },
  detailPlaceholder: { title: 'Selectionner un message', description: 'Choisissez une conversation a gauche pour voir les details.' },
  time: { yesterday: 'Hier' },
  empty: {
    title: 'Aucune notification',
    messages: 'Aucun message pour le moment',
    description: 'Les notifications et alertes systeme apparaitront ici.',
    defaultMessage: 'Notification systeme',
  },
}
