import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: '登录后继续你的路径',
      subtitle: '输入账号后即可继续浏览资料、收藏记录、活动安排与顾问跟进。',
      formTitle: 'Account Login',
      panelTitle: '欢迎回来',
      panelHint: '当前仍为演示登录，点击按钮后会直接进入账户，不校验输入内容。',
      submit: '登录',
      secondary: '还没有账号？去注册',
      accessTitle: '登录后可体验',
      autoRouteTitle: '自动识别',
      autoRouteHeading: '登录后自动进入对应身份路径',
      autoRouteDesc: '系统会根据账号资料直接进入本人或家长视图，不需要在登录阶段重复选择。',
    },
    form: {
      identity: { label: '邮箱或微信', placeholder: '请输入你的常用联系方式' },
      password: { label: '密码', placeholder: '当前为演示模式，无需真实密码' },
    },
    access: {
      account: { title: '账户总览', desc: '查看资料完善进度、顾问跟进节奏与当前状态。' },
      favorites: { title: '收藏与沟通', desc: '继续浏览意向对象、收藏记录与沟通线索。' },
      events: { title: '活动与安排', desc: '查看报名活动、待确认行程与后续见面安排。' },
    },
  }
