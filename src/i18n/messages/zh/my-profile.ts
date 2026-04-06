import type { AppMessageSchema } from '@/i18n/types'

export const myProfileMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Profile',
      title: '我的资料与边界',
      subtitle: '这页同时管理资料质量和家庭协同边界。资料是否完整、哪些字段给家长看、何时开放更多背景信息，都应由本人控制。',
    },
    stats: {
      completion: '资料完成度',
      visibility: '家长可见',
      highlights: '亮点数量',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '资料由本人定调',
        description: '个人介绍、关系意向、语言与生活节奏都应体现你本人想被理解的方式。',
        point1: '先保证真实和稳定，再追求包装感',
        point2: '优先呈现长期关系判断需要的信息',
        point3: '由你决定什么时候让家长进入协同阶段',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家庭只看被授权的部分',
        description: '家长可辅助补充背景，但不能把资料页变成替你发声的空间。',
        point1: '仅在你开放后查看有限资料',
        point2: '可帮助判断节奏是否适合进入家庭协同',
        point3: '不代替你表达关系意向和个人边界',
      },
    },
    basics: {
      eyebrow: 'Basics',
      title: '资料基础面',
      city: '城市',
      education: '教育',
      occupation: '职业',
      intent: '关系意向',
      residence: '居住计划',
      languages: '语言',
    },
    narrative: {
      eyebrow: 'Narrative',
      title: '个人介绍',
    },
    highlights: {
      eyebrow: 'Highlights',
      title: '重点亮点',
      tagsTitle: '资料标签',
    },
    boundaries: {
      eyebrow: 'Boundaries',
      title: '当前授权边界',
      visibilityOn: '当前资料允许家长看到有限背景信息。',
      visibilityOff: '当前资料仍以本人单独推进为主。',
      familyContactOn: '已允许家庭在授权范围内补充背景说明。',
      familyContactOff: '家长暂不能直接参与联系或沟通。',
      fieldsOpen: '更多资料字段已开放，可用于更深入匹配判断。',
      fieldsClosed: '详细字段暂未开放，仍保留阶段性边界。',
    },
  }
