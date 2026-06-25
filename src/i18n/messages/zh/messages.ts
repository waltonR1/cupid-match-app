import type { AppMessageSchema } from '@/i18n/types'

export const messagesMessages: AppMessageSchema = {
  eyebrow: '消息中心',
  title: '消息中心',
  subtitle: '平台通知与系统提醒将在这里集中展示。',
  placeholder: '平台通知与系统提醒将在这里集中展示。双方受控沟通功能将在后续开放。',
  notifications: '系统通知',  loadMore: '加载更多',
  loading: '加载中...',
  error: { title: '消息加载失败', description: '请稍后重试。' },
  detailPlaceholder: { title: '选择一条消息', description: '从左侧选择一个线程查看详情。' },
  time: { yesterday: '昨天' },
  empty: {
    title: '暂无通知',
    messages: '暂无消息',
    description: '平台通知和系统提醒将在这里展示。',
    defaultMessage: '系统通知',
  },
}
