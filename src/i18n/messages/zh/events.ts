import type { AppMessageSchema } from '@/i18n/types'

export const eventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: '精选线下活动',
      title: '活动列表',
      subtitle: '查看当前开放报名、候补与已满额的活动安排，快速了解时间、城市、场地与参与门槛。',
      nextEvent: '近期优先活动',
    },
    fields: {
      date: '日期',
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '席位',
    },
    stats: {
      totalEvents: '活动总数',
      openEvents: '开放报名',
      waitlistEvents: '候补中',
      cities: '覆盖城市',
    },
    featured: {
      eyebrow: '优先查看',
      title: '开放与候补活动',
      subtitle: '优先展示当前仍可报名或正在候补的活动，方便先判断是否值得继续了解。',
    },
    schedule: {
      eyebrow: '完整安排',
      title: '完整活动清单',
      note: '完整列表用于查看近期节奏与分布。后续接入真实接口后，这里会直接映射实际活动状态。',
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  }
