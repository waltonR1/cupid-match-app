import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Messages',
  subtitle: 'Les notifications et alertes systeme apparaitront ici.',
  placeholder: 'Les notifications et alertes systeme apparaitront ici. La communication encadree sera disponible ulterieurement.',
  notifications: 'Notifications systeme',
  subject: {
    system: 'Systeme',
    event: 'Evenement',
    profile: 'Verification',
    membership: 'Abonnement',
    legal_document: 'Legal',
    private_introduction_request: 'Introduction',
  },
  loadMore: 'Voir plus',
  detailPlaceholder: { title: 'Selectionner un message', description: 'Choisissez une conversation a gauche pour voir les details.' },
  time: { yesterday: 'Hier' },
  empty: {
    title: 'Aucune notification',
    description: 'Les notifications et alertes systeme apparaitront ici.',
    defaultMessage: 'Notification systeme',
  },
}
