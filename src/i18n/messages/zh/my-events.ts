import type { AppMessageSchema } from '@/i18n/types'

export const myEventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Events',
      title: '我的报名与到场节奏',
      subtitle: '活动是相亲流程里的关键推进点。这里区分你本人要做的确认与准备，以及家长在家长沙龙或背景说明中的辅助角色。',
    },
    stats: {
      confirmed: '已确认',
      waitlist: '候补中',
      completed: '已完成',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '本人决定参加什么',
        description: '报名和到场节奏应由你本人判断，活动只是推进关系的工具，不是替代决策的流程。',
        point1: '确认前先判断活动是否适合当前阶段',
        point2: '候补和已确认都要提前准备节奏',
        point3: '活动后的跟进仍由本人主导',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只在特定场景补位',
        description: '家长可参与家长沙龙、背景说明或活动前协助了解，但不替代报名和线下出席。',
        point1: '更适合家长说明会或背景沟通型场景',
        point2: '可帮助整理活动信息与后续建议',
        point3: '不能替代本人参加和后续判断',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: '当前报名记录',
      seats: '报名人数',
      action: '查看活动',
    },
    support: {
      eyebrow: 'Support',
      title: '活动推进提醒',
      point1: '对已确认活动提前看清地点、时间和注意事项。',
      point2: '候补中的活动保持轻跟进，不要把节奏压得过满。',
      point3: '已完成活动更适合回看反馈，而不是简单重复报名。',
    },
    family: {
      eyebrow: 'Family',
      title: '适合家长协同的部分',
      point1: '活动背景说明与家长沙龙信息可共享。',
      point2: '本人仍保留是否继续推进的最终判断。',
      point3: '如果不希望家长介入，直接保持当前边界即可。',
    },
    status: {
      confirmed: '已确认',
      waitlist: '候补中',
      completed: '已完成',
    },
  }
