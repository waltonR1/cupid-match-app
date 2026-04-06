import type { AppMessageSchema } from '@/i18n/types'

export const privacyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Privacy',
      title: '隐私授权与家长范围',
      subtitle: '这页不是一组抽象开关，而是明确谁能看什么、谁能联系你、家长能参与到什么程度。账户中的所有协同都应从这里生效。',
    },
    stats: {
      enabled: '已开启',
      disabled: '已关闭',
      familyAssist: '家长辅助',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '授权先保护本人主导权',
        description: '隐私设置首先服务你自己的边界，而不是默认把更多人带进流程。',
        point1: '决定谁能联系你以及什么时候联系',
        point2: '决定哪些资料字段可以继续开放',
        point3: '不需要协同时就保持最小授权',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长协同必须被显式授权',
        description: '家庭参与不是默认流程，而是你在合适阶段单独放开的协同权限。',
        point1: '家长只能进入你明确授权的部分',
        point2: '更适合背景说明和节奏讨论，不适合代替决策',
        point3: '随时可以收回或继续保持关闭',
      },
    },
    sections: {
      userEyebrow: 'User control',
      userTitle: '由本人直接控制',
      userSubtitle: '这些设置决定平台、顾问和资料字段如何面向你本人工作。',
      familyEyebrow: 'Family scope',
      familyTitle: '家长协同范围',
      familySubtitle: '只有在这里开启后，家长相关的协同才应进入账户流程。',
      statusEnabled: '已开启',
      statusDisabled: '已关闭',
    },
    notes: {
      eyebrow: 'Notes',
      title: '当前原则',
      point1: '顾问联系属于服务协同，不等于家庭介入。',
      point2: '家长辅助更适合在对象方向明确后再开启。',
      point3: '开放更多字段前，先确认对当前推进确实有帮助。',
    },
  }
