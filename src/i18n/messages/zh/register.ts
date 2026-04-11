import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Registration',
      title: '创建账号，开启你的婚恋路径',
      subtitle: '先完成基础账号注册，再根据你的身份进入本人或家长路径。注册后可继续完善资料、浏览内容与安排后续顾问沟通。',
      selectedRole: '当前身份',
      formTitle: '账号设置',
      panelTitle: '创建你的账号',
      panelHint: '请先完成邮箱或微信、密码与基础信息填写，注册后即可继续完善资料并进入对应身份路径。',
      submit: '注册账号',
      processTitle: '流程说明',
      agreementPrefix: '我已阅读并同意',
      agreementTerms: '平台服务条款',
      agreementConnector: '与',
      agreementPrivacy: '隐私说明',
      agreementSuffix: '。注册后平台可基于账号信息与我进行必要的服务联系，并按照你的身份与隐私设置控制资料展示范围。',
      formFootnote: '注册完成后，你仍可在账户内继续完善资料、调整展示范围，并补充后续婚恋信息。',
    },
    roles: {
      self: {
        badge: '本人路径',
        title: '本人注册',
        desc: '适合由本人直接建立资料、表达择偶意向，并推进后续匹配、顾问沟通与见面安排。',
        note: '系统会更强调个人资料完整度、偏好表达、顾问建议以及由本人主导的沟通节奏。',
      },
      parent: {
        badge: '家长路径',
        title: '家长注册',
        desc: '适合先从家庭视角了解平台、筛选资料，并参与初步沟通、资料把关与家庭协助。',
        note: '系统会更强调家庭参与、授权边界、资料把关以及对子女档案的辅助管理与沟通支持。',
      },
    },
    form: {
      email: { label: '邮箱或微信', placeholder: '请输入常用邮箱或微信号' },
      password: { label: '密码', placeholder: '请设置登录密码' },
      confirmPassword: { label: '确认密码', placeholder: '请再次输入密码' },
      name: { label: '姓名或昵称', placeholder: '请输入你的姓名或常用称呼' },
      city: { label: '所在城市', placeholder: '例如：巴黎 / 里昂 / 布鲁塞尔' },
    },
    process: {
      step1: {
        title: '创建账号',
        desc: {
          self: '先完成邮箱或微信与密码设置，建立基础账号入口。',
          parent: '先完成邮箱或微信与密码设置，建立家庭参与所需的基础账号入口。',
        },
      },
      step2: {
        title: '补充基础资料',
        desc: {
          self: '补充昵称、所在城市等基础资料，后续再逐步完善个人档案。',
          parent: '补充家长侧基础资料，后续再继续完善家庭信息与子女档案。',
        },
      },
      step3: {
        title: '进入对应身份路径',
        desc: {
          self: '注册完成后进入本人路径，继续浏览资料、完善偏好并进入后续匹配流程。',
          parent: '注册完成后进入家长路径，继续了解资料、参与筛选并安排后续沟通。',
        },
      },
    },
}
