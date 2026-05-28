import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Messages',
  subtitle: 'Platform notifications and system alerts will appear here.',
  placeholder: 'Platform notifications and system alerts will appear here. Mediated communication will be available later.',
  notifications: 'System notifications',
  subject: {
    system: 'System',
    event: 'Event',
    profile: 'Profile review',
    membership: 'Membership',
    legal_document: 'Legal',
    private_introduction_request: 'Introduction',
  },
  loadMore: 'Load more',
  detailPlaceholder: { title: 'Select a message', description: 'Choose a thread from the left to view details.' },
  time: { yesterday: 'Yesterday' },
  empty: {
    title: 'No notifications',
    description: 'Platform notifications and system alerts will appear here.',
    defaultMessage: 'System notification',
  },
}
