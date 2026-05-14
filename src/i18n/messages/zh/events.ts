import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
  hero: {
    eyebrow: '线下活动',
    title: '活动列表',
    subtitle: '查看当前开放报名、候补与会员专属活动，了解时间、城市、场地与参与门槛。',
    nextEvent: '近期优先活动',
  },
  fields: {
    date: '日期',
    city: '城市',
    venue: '场地',
    address: '详细地址',
    format: '形式',
    audience: '适合人群',
    seats: '席位',
    focus: '关系主题',
    languages: '语言',
    advisorNote: '顾问说明',
    status: '状态',
  },
  seats: {
    remaining: '剩余 {count} 席',
    waitlist: '候补 {count} 人',
  },
  stats: {
    totalEvents: '活动',
    openEvents: '开放',
    waitlistEvents: '候补',
    cities: '城市',
  },
  featured: {
    eyebrow: '优先查看',
    title: '开放与候补活动',
    subtitle: '优先展示仍可报名或正在候补的活动，便于先判断是否值得继续了解。',
  },
  schedule: {
    eyebrow: '完整安排',
    title: '完整活动清单',
    note: '活动地址会根据登录与报名状态逐步开放，平台会继续控制节奏与参与门槛。',
  },
  empty: {
    title: '暂无开放活动',
    description: '平台正在筛选下一批线下活动，请稍后再查看。',
  },
  status: {
    open: '报名中',
    waitlist: '候补',
    closed: '已关闭',
    completed: '已结束',
    member: '会员专属',
  },
}
