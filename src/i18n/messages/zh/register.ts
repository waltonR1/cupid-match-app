import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
  hero: {
    eyebrow: '注册',
    title: '创建账号，开启你的婚恋路径',
    subtitle: '先完成基础账号注册，再根据你的身份进入本人路径或家庭路径。更完整的资料和后续步骤可以在注册后继续补充。',
    selectedPath: '当前身份',
    formTitle: '账号设置',
    panelTitle: '创建你的账号',
    panelHint: '请使用常用邮箱或手机号，设置登录密码，并填写开通账号所需的基础信息，以便继续进入对应身份路径。',
    submit: '创建账号',
    processTitle: '注册流程',
    agreementPrefix: '我已阅读并同意',
    agreementTerms: '平台服务条款',
    agreementConnector: '和',
    agreementPrivacy: '隐私说明',
    agreementSuffix: '。注册后，平台可能基于账号信息进行必要的服务联系，并会根据你的身份路径与隐私设置控制资料展示范围。',
    formFootnote: '注册完成后，你仍可在账户内继续完善资料、调整展示范围，并补充更完整的婚恋信息。',
  },
  paths: {
    self: {
      badge: '本人路径',
      title: '本人注册',
      desc: '适合由本人直接创建资料、表达择偶偏好，并亲自推进后续匹配与顾问沟通。',
      note: '这一路径更强调个人资料完整度、偏好表达清晰度、顾问支持以及由本人主导的沟通节奏。',
    },
    family: {
      badge: '家庭路径',
      title: '家长注册',
      desc: '适合家长先从家庭视角了解平台、筛选资料，并参与前期沟通与判断。',
      note: '这一路径更强调家庭参与、协作边界、资料筛选，以及后续围绕子女资料的协调支持。',
    },
  },
  form: {
    accountName: { label: '你的名字', placeholder: '你的名字' },
    identifier: { label: '邮箱或手机号', placeholder: '邮箱或手机号' },
    password: { label: '密码', placeholder: '设置密码' },
    confirmPassword: { label: '确认密码', placeholder: '再次输入密码' },
    error: { duplicate: '该账号已存在，请直接登录', mismatch: '两次输入的密码不一致', agreement: '请先同意平台服务条款和隐私说明。' },
  },
  process: {
    step1: {
      title: '创建账号',
      desc: {
        self: '设置登录方式与密码，建立本人账号入口。',
        parent: '设置登录方式与密码，建立家庭侧账号入口。',
      },
    },
    step2: {
      title: '填写基础信息',
      desc: {
        self: '填写账户名称和所在城市，完成后进入本人路径。',
        parent: '填写家长侧账户名称和所在城市，完成后进入家庭路径。',
      },
    },
    step3: {
      title: '进入对应路径',
      desc: {
        self: '注册完成后进入本人路径，继续浏览资料、完善档案并进入后续匹配流程。',
        parent: '注册完成后进入家长路径，继续进行筛选、协作和后续沟通。',
      },
    },
  },
}
