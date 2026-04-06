import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Registration',
      title: '先选身份，再进入注册',
      subtitle: '注册页先确认你是本人使用，还是作为家长参与。之后再进入对应的注册与顾问跟进流程。',
      selectedRole: '当前身份',
      formTitle: '注册信息',
      submit: '提交当前申请',
      processTitle: '流程说明',
      roleBenefitTitle: '该身份下的注册重点',
    },
    roles: {
      self: {
        badge: '本人路径',
        title: '本人注册',
        desc: '适合由本人直接建立资料、表达择偶意向，并推进后续匹配与沟通。',
        note: '系统会更强调个人资料、偏好表达、顾问建议与本人节奏。',
      },
      parent: {
        badge: '家长路径',
        title: '家长注册',
        desc: '适合先从家庭视角了解平台、筛选资料，并参与初步沟通节奏。',
        note: '系统会更强调家庭参与、授权边界、资料把关与对子女档案的辅助管理。',
      },
    },
    form: {
      name: { label: '姓名', placeholder: '请输入你的姓名' },
      city: { label: '所在城市', placeholder: '例如：巴黎 / 里昂 / 布鲁塞尔' },
      contact: { label: '邮箱或微信', placeholder: '用于后续顾问联系' },
      intent: {
        label: '注册意向',
        placeholder: {
          self: '例如：认真交往 / 婚姻导向 / 希望先了解资料库',
          parent: '例如：为子女了解平台 / 希望先由家长沟通 / 先筛选合适家庭',
        },
      },
    },
    process: {
      step1: {
        title: '确认身份',
        desc: {
          self: '先确认你以本人身份进入，再开始后续注册与资料建立。',
          parent: '先确认你以家长身份进入，再开始家庭参与与后续代际协助流程。',
        },
      },
      step2: {
        title: '提交基础信息',
        desc: {
          self: '填写个人联系信息、所在城市与关系意向，进入资料完善与顾问回访。',
          parent: '填写家长侧联系信息与代办意向，后续可补充子女资料与家庭关注重点。',
        },
      },
      step3: {
        title: '进入对应路径',
        desc: {
          self: '后续进入个人资料、匹配浏览、顾问建议与活动安排路径。',
          parent: '后续进入家庭参与、资料把关、沟通授权与家长协助路径。',
        },
      },
    },
    roleBenefits: {
      self: {
        title: '以本人身份注册',
        desc: '更适合展示个人信息、表达择偶偏好，并由你本人决定后续沟通与见面节奏。',
      },
      parent: {
        title: '以家长身份注册',
        desc: '更适合先做家庭层面的把关与初筛，再逐步推动子女进入正式接触流程。',
      },
    },
  }
