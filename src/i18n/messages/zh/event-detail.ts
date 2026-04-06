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
      format: '形式',
      audience: '适合人群',
      seats: '席位',
    },
    actions: {
      register: '提交报名意向',
      joinWaitlist: '加入候补名单',
      full: '当前已满额',
      registerHint: '提交后，顾问会结合席位与资料匹配度进行确认。',
      waitlistHint: '当前进入候补序列，确认后会优先通知合适的席位释放机会。',
      fullHint: '本场活动已满额，建议返回列表查看下一场更适合的安排。',
      backToEvents: '返回活动列表',
    },
    sections: {
      agenda: '活动流程',
      notes: '报名说明',
      relatedProfiles: '相关会员',
      relatedEmpty: '当前还没有可展示的相关会员资料。',
      notFound: '暂未找到该活动信息。',
    },
    rules: {
      step1: { title: '提交后会人工确认', desc: '顾问会结合席位、资料完成度和活动匹配度进行审核，不会自动通过。' },
      step2: { title: '候补会继续跟进', desc: '如果当场席位已满，资料合适的用户会进入候补，并优先收到下一步通知。' },
      step3: { title: '活动前会收到提醒', desc: '确认参与后，平台会补充活动时间、到场节奏和当晚注意事项。' },
      step4: { title: '不适合也会明确说明', desc: '如果当前资料方向与活动人群不匹配，顾问会建议更合适的下一场。' },
    },
    relatedReason: {
      sameCity: '同城优先',
      priority: '优先资料',
      verified: '资料完整度高',
      curated: '适合该场景',
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  }
