import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: 'Messages',
  title: 'Message center',
  subtitle: 'This space will bring together platform updates, introduction progress, and controlled conversations after mutual confirmation.',
  sections: {
    updates: {
      label: 'Updates',
      title: 'Platform updates',
      description: 'This area will later surface introduction progress, event reminders, and service notices.',
    },
    conversations: {
      label: 'Conversations',
      title: 'Controlled conversations',
      description: 'Once both sides agree, formal platform-managed communication will continue here.',
    },
  },
}
