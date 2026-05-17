import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Centre de messages',
  subtitle: 'Cet espace regroupera les notifications de la plateforme, l avancement des introductions et les echanges controles apres confirmation mutuelle.',
  sections: {
    updates: {
      label: 'Notifications',
      title: 'Notifications de la plateforme',
      description: 'Cette zone accueillera ensuite les suivis d introduction, les rappels d evenement et les annonces de service.',
    },
    conversations: {
      label: 'Echanges',
      title: 'Conversations controlees',
      description: 'Une fois l accord mutuel obtenu, les echanges formels geres par la plateforme continueront ici.',
    },
  },
}
