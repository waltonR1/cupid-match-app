import type { AppMessageSchema } from '@/i18n/types'

export const loginMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Login',
      title: '进入你的婚恋路径',
      subtitle: '登录后系统会根据你的账号自动识别身份，并进入对应的使用路径。',
      formTitle: '账号进入',
      panelTitle: '登录你的账户',
      panelHint: '这里不再手动选择身份。系统会依据账号信息自动进入本人路径或家长路径。',
      submit: '进入账户',
      secondary: '还没有账号？去注册',
      accessTitle: '登录后可体验',
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
