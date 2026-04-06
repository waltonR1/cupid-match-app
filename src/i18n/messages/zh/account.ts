import type { AppMessageSchema } from '@/i18n/types'

export const accountMessages: AppMessageSchema = {
    nav: {
      overview: '账户总览',
      profile: '我的资料',
      events: '我的报名',
      favorites: '我的收藏',
      messages: '消息沟通',
      privacy: '隐私授权',
    },
    membership: {
      free: '免费会员',
      silver: '银卡会员',
      gold: '金卡会员',
      diamond: '钻石会员',
    },
    hero: {
      eyebrow: 'Account',
      title: '相亲账户总览',
      subtitle: '这里不是通用设置页，而是你在平台内推进资料、收藏、报名与沟通的主控面板。本人负责关键决策，家长只在你授权的范围内辅助了解与配合。',
    },
    stats: {
      completion: '资料完成度',
      events: '活动报名',
      unread: '未读会话',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '本人主导推进',
        description: '账户首页优先服务你本人推进资料、筛选对象、报名活动与后续沟通。',
        point1: '资料可见范围和开放节奏由你决定',
        point2: '收藏、报名、聊天都以本人判断为准',
        point3: '需要时再引入顾问或家长补充支持',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只做有限协同',
        description: '家长不是第二个操作者，只在你授权的边界内查看有限背景并帮助理解流程。',
        point1: '仅查看允许 family-visible 的资料与说明',
        point2: '可辅助了解活动安排和背景信息',
        point3: '不能替你决定报名、收藏或代聊',
      },
    },
    quickActions: {
      eyebrow: 'Actions',
      title: '快速入口',
      subtitle: '保留和站点其他页面一致的明确行动入口，但语义直接围绕相亲流程本身。',
      profile: {
        title: '整理资料',
        desc: '检查资料完整度、可见边界和家庭协同状态。',
      },
      events: {
        title: '查看报名',
        desc: '跟进已确认、候补和已完成的线下活动记录。',
      },
      favorites: {
        title: '回看收藏',
        desc: '区分仅本人保存和可与家长共看的意向资料。',
      },
      messages: {
        title: '继续沟通',
        desc: '查看未读会话和最近一次消息，保持本人主导节奏。',
      },
      privacy: {
        title: '调整授权',
        desc: '管理顾问联系、家长辅助和资料字段开放范围。',
      },
      upgrade: {
        title: '会员升级',
        desc: '回到会员体系，继续提升活动和筛选支持。',
      },
    },
    snapshot: {
      eyebrow: 'Snapshot',
      title: '当前账户状态',
      joined: '加入时间',
      membership: '当前会员',
      currentProfile: '当前资料',
      latestEvent: '最近报名',
      familyAssist: '家长辅助',
      unread: '未读消息',
      enabled: '已开启',
      disabled: '未开启',
      none: '暂未设置',
    },
    nextSteps: {
      eyebrow: 'Next',
      title: '接下来可推进',
      point1: '优先补齐资料与亮点字段，提高后续筛选效率。',
      point2: '对候补或已报名活动提前做准备，避免临近确认时信息不足。',
      point3: '如果准备进入家庭协同阶段，再单独开放可见范围，而不是默认全开。',
    },
  }
