import type { AppMessageSchema } from '@/i18n/types'

export const eventDetailMessages: AppMessageSchema = {
  hero: {
    eyebrow: '活动详情',
  },
  fields: {
    status: '状态',
    date: '日期',
    city: '城市',
    venue: '场地',
    address: '详细地址',
    format: '形式',
    audience: '适合人群',
    seats: '席位',
    focus: '关系主题',
    languages: '语言',
    curatorNote: '策展说明',
  },
  actions: {
    register: '申请参加',
    cancel: '取消申请',
    loading: '处理中',
    login: '登录后申请',
    membership: '查看会员权益',
    backToEvents: '返回活动列表',
  },
  address: {
    locked: '详细地址将在合适阶段开放。',
    login_required: '登录后可查看详细地址。',
    registration_required: '报名后可查看详细地址。',
    confirmation_required: '确认参与后可查看详细地址。',
  },
  seats: {
    remaining: '剩余 {count} 席',
    waitlist: '候补 {count} 人',
  },
  quota: {
    remaining: '本会员有效期内还可参加 {count} 次活动。',
  },
  registration: {
    guest: {
      title: '登录后申请席位',
      description: '活动参与需要先登录，平台会根据资料与活动人群进行节奏控制。',
    },
    available: {
      title: '当前可申请',
      description: '提交后，顾问会结合席位、资料完整度与活动匹配度进行确认。',
    },
    requested: {
      title: '申请待确认',
      description: '你的申请已提交，平台顾问会确认席位与匹配度后再开放后续安排。',
    },
    confirmed: {
      title: '席位已确认',
      description: '你已确认参与本场活动，可在活动前继续查看平台补充说明。',
    },
    declined: {
      title: '本次暂未确认',
      description: '本场活动暂未为你确认席位，平台会在更合适的活动中继续匹配。',
    },
    waitlist: {
      title: '已进入候补',
      description: '如有席位释放或新场次开放，平台会优先联系合适的候补用户。',
    },
    cancelled: {
      title: '席位已取消',
      description: '你的席位已确认后取消。如需重新安排，请联系平台工作人员处理。',
    },
    closed: {
      title: '当前不可申请',
      description: '本场活动暂不开放新的申请，请返回列表查看其他安排。',
    },
    member_required: {
      title: '会员专属活动',
      description: '本场活动面向会员开放，可先查看会员权益后再决定是否申请。',
    },
    event_quota_exhausted: {
      title: '活动名额已用完',
      description: '本次会员的活动名额已全部使用，可查看其他会员方案或联系顾问。',
    },
  },
  sections: {
    agenda: '活动流程',
    notes: '活动说明',
    notFound: '暂未找到该活动信息。',
  },
  status: {
    open: '报名中',
    waitlist: '候补',
    closed: '已关闭',
    member: '会员专属',
  },
}
