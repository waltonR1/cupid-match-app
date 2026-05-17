import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: '消息中心',
  title: '消息中心',
  subtitle: '这里将集中承接平台通知、介绍进展与双方确认后的受控沟通。',
  sections: {
    updates: {
      label: '通知',
      title: '平台通知',
      description: '后续用于展示介绍进展、活动提醒和服务通知。',
    },
    conversations: {
      label: '沟通',
      title: '受控沟通',
      description: '双方确认后，这里将承接由平台管理的正式沟通记录。',
    },
  },
}
