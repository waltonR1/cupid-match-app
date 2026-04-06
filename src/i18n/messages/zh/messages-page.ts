import type { AppMessageSchema } from '@/i18n/types'

export const messagesPageMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Messages',
      title: '消息与沟通边界',
      subtitle: '消息页始终以本人直接沟通为核心。即使某份资料对家长可见，聊天本身仍由你来发起、判断和推进。',
    },
    stats: {
      threads: '会话数量',
      unread: '未读消息',
      familyVisible: '家长可见资料',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '沟通必须由本人推进',
        description: '聊天是最容易暴露节奏感和判断力的环节，不能被家长或顾问替代。',
        point1: '本人决定什么时候回复和如何推进',
        point2: '未读消息反映当前沟通节奏，不等于必须立刻回应',
        point3: '关系边界与沟通语气都应由你亲自把握',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只能理解背景，不进入对话',
        description: '即使对方资料允许家庭视角，消息内容本身也不应进入代聊或代决策模式。',
        point1: '家长只适合了解背景节奏，不看对话细节',
        point2: '如需家庭参与，应在聊天之外单独说明',
        point3: '消息页默认保持本人对人的直接感知',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: '当前会话',
      familyBadge: '资料可给家长看',
      unreadLabel: '未读',
      open: '查看资料',
    },
    support: {
      eyebrow: 'Support',
      title: '沟通提示',
      point1: '未读不一定是风险，更重要的是回复质量和推进清晰度。',
      point2: '如果准备进入线下或家庭协同，再把说明放到聊天之外处理。',
      point3: '优先保留你自己的语气，而不是写成流程化沟通。',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: '家长在消息页的边界',
      point1: '不代发消息，不代替判断关系温度。',
      point2: '如需家长参与，只补充背景或后续建议。',
      point3: '真正的匹配感只能通过本人互动来判断。',
    },
  }
