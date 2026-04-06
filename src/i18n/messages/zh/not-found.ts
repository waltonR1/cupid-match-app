import type { AppMessageSchema } from '@/i18n/types'

export const notFoundMessages: AppMessageSchema = {
    hero: {
      title: '页面不存在',
      subtitle: '你访问的链接可能已失效、输入错误，或该页面暂未开放。',
    },
    actions: {
      home: '返回首页',
      account: '进入用户中心',
    },
  }
