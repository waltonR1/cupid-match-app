import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Messages',
  subtitle: 'Platform notifications and system alerts will appear here.',
  placeholder: 'Platform notifications and system alerts will appear here. Mediated communication will be available later.',
  notifications: 'System notifications',  loadMore: 'Load more',
  loading: 'Loading...',
  error: { title: 'Unable to load messages', description: 'Please try again later.' },
  detailPlaceholder: { title: 'Select a message', description: 'Choose a thread from the left to view details.' },
  time: { yesterday: 'Yesterday' },
  empty: {
    title: 'No notifications',
    messages: 'No messages yet',
    description: 'Platform notifications and system alerts will appear here.',
    defaultMessage: 'System notification',
  },
}
