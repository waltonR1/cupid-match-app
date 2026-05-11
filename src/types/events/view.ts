/**
 * 活动报名状态
 *
 * - open: 可报名
 * - waitlist: 候补中
 * - closed: 已关闭
 */
export type EventStatus =
    | 'open'
    | 'waitlist'
    | 'closed'

/**
 * 活动字段标签
 *
 * 用于：
 * - 列表页
 * - 卡片
 * - 基础信息展示
 */
export interface EventFieldLabels {
  /** 活动日期 */
  date: string

  /** 城市 */
  city: string

  /** 场地 */
  venue: string

  /** 活动形式 */
  format: string

  /** 面向人群 */
  audience: string

  /** 名额 */
  seats: string
}

/**
 * 活动详情字段标签
 *
 * /** 报名状态
 */
export interface EventDetailFieldLabels extends EventFieldLabels {
  status: string
}

/**
 * 活动统计项
 *
 * 示例：
 * - 已报名人数
 * - 男女比例
 * - 海归比例
 */
export interface EventStatItem {
  label: string
  value: string
}

/**
 * 活动概览信息
 *
 * 用于：
 * - 活动列表
 * - 活动卡片
 * - 首页精选活动
 */
export interface EventOverviewItem {
  /** 活动 ID */
  id: string

  /** 活动标题 */
  title: string

  /** 活动简介 */
  summary: string

  /** 活动日期 */
  date: string

  /** 城市 */
  city: string

  /** 场地 */
  venue: string

  /** 活动形式 */
  format: string

  /** 面向人群 */
  audience: string

  /** 名额 */
  seats: string

  /** 活动状态 */
  status: EventStatus

  /** 本地化状态文案 */
  statusLabel: string
}

/**
 * 活动议程项
 *
 * 示例：
 * - 18:00 签到
 * - 19:00 自我介绍
 * - 20:00 自由交流
 */
export interface EventAgendaItem {
  /** 时间 */
  time: string

  /** 环节标题 */
  title: string

  /** 环节说明 */
  desc: string
}

/**
 * 活动说明项
 *
 * 示例：
 * - 着装要求
 * - 审核规则
 * - 注意事项
 */
export interface EventNoteItem {
  /** 说明标题 */
  title: string

  /** 说明内容 */
  desc: string
}

/**
 * 相关会员信息
 *
 * 用于：
 * - 推荐会员
 * - 匹配会员
 * - 同活动参与者
 */
export interface EventRelatedProfileItem {
  /** 会员 ID */
  id: string

  /** 展示名称 */
  displayName: string

  /** 简要信息 */
  meta: string

  /** 推荐原因 */
  reason: string

  /** 个人简介 */
  summary: string
}