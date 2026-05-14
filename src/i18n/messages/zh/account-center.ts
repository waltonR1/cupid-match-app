import type { AppMessageSchema } from '@/i18n/types'

export const accountCenterMessages: AppMessageSchema = {
  nav: {
    profile: '我的资料',
    verification: '认证中心',
    connections: '我的缘分',
    messages: '消息',
    safety: '隐私与安全',
    membership: '会员与服务',
  },
  topSummary: {
    title: '账户中心',
    guestName: '未登录账户',
    subtitle: '账户中心正在按新的资料、会员和中介撮合链路重建。当前仅保留登录状态和导航入口。',
    metrics: {
      status: '登录状态',
      workspace: '账户模块',
      membership: '当前会员',
      activity: '活动报名',
    },
    status: {
      signedIn: '已登录',
      guest: '未登录',
      rebuilding: '重建中',
      paused: '暂停',
    },
    actions: {
      profile: '去完善资料',
      verification: '去认证',
      connections: '看我的缘分',
      membership: '看服务权益',
    },
  },
  placeholder: {
    title: '账户中心重建中',
    profile: '我的资料页暂时只保留账户壳。后续会按新的 profile ownership 和资料字段重新接入。',
    membership: '会员体系会在新的 membership plan、entitlement 和 quota 模型完成后重新开放。',
    activity: '活动记录会在 event registrations 成为真实来源后重新接入。',
    connections: '收藏和私人介绍状态会在新的 account connections 链路完成后重新接入。',
    messages: '消息页会改为私人介绍 room 和顾问跟进记录，不再读取旧会话摘要。',
    safety: '隐私与安全会从 user preferences 和 profile visibility settings 重新构建。',
    verification: '认证中心会从 profile verifications 和顾问审核记录重新构建。',
  },
  profile: {
    eyebrow: '资料中心',
    title: '我的资料',
    subtitle: '资料质量优先。先把你的信息做完整、做真实、做成适合匹配与沟通的状态。',
  },
  verification: {
    eyebrow: '信任中心',
    title: '认证中心',
    subtitle: '严肃婚恋里，信任必须独立可见。认证、风控和邀请认证不应该埋在普通设置里。',
  },
  connections: {
    eyebrow: '缘分池',
    title: '我的缘分',
    subtitle: '把收藏、互相喜欢、家庭可见对象和推荐对象统一成一条关系推进链路。',
  },
  messages: {
    eyebrow: '沟通中心',
    title: '消息',
    subtitle: '消息页只负责沟通推进，把信任状态和安全提醒放在近处，不再塞入旧式总览卡片。',
  },
  safety: {
    eyebrow: '安全控制台',
    title: '隐私与安全',
    subtitle: '公开范围、联系边界、家庭协助和风险处理应集中在一个明确的安全页里。',
  },
  membership: {
    eyebrow: '服务中心',
    title: '会员与服务',
    subtitle: '会员页负责解释服务价值和权益，不再主导整个账户区的视觉结构。',
  },
  activity: {
    eyebrow: '活动跟进',
    title: '我的活动',
    subtitle: '活动保留在账户区，但作为二级运营页存在，不再承担一级主入口角色。',
  },
}
