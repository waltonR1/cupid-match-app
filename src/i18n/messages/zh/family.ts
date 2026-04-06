import type { AppMessageSchema } from '@/i18n/types'

export const familyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Family Participation',
      title: '家庭参与',
      subtitle: '这里承接家庭参与中的前置判断环节，只展示经本人授权、可供家庭先行了解的资料。',
      tags: {
        first: '先看资料',
        second: '先做筛选',
        third: '先判断门当户对',
      },
    },

    stats: {
      visibleProfiles: '授权资料',
      priorityProfiles: '优先评估',
      contactReady: '可辅助沟通',
    },

    toolbar: {
      sortLabel: '排序',
    },

    directory: {
      title: '家庭参与筛选',
      resultPrefix: '当前筛出',
      resultSuffix: '份候选资料',
      empty: '当前没有符合条件的家庭候选资料。',
      pagePrefix: '当前显示',
    },

    filters: {
      expand: '\u5c55\u5f00\u7b5b\u9009',
      collapse: '\u6536\u8d77\u7b5b\u9009',
      clear: '清除全部',
      gender: '性别',
      genderMale: '男',
      genderFemale: '女',
      age: '年龄',
      city: '城市',
      education: '学历',
      intent: '关系目标',
      familyMode: '家庭协作',
      occupation: '职业',
      industry: '行业',
      maritalStatus: '婚姻状态',
      children: '子女情况',
      longDistance: '异地接受度',
    },

    fields: {
      city: '城市',
      education: '学历',
      residencePlan: '定居计划',
      job: '职业',
    },

    modes: {
      contextOnly: '仅背景可见',
      contactReady: '可家长辅助沟通',
      priority: '优先家长评估',
    },

    tags: {
      maritalSingle: '未婚',
      maritalDivorced: '离异',
      maritalWidowed: '丧偶',
      childrenYes: '有孩子',
      childrenNo: '无孩子',
      longDistanceYes: '接受异地',
      longDistanceNo: '更偏同城',
    },

    card: {
      labelObserve: '建议先家庭了解',
      labelContactReady: '可安排家长沟通',
      labelReview: '资料仍在补充',
      labelPriority: '可优先推进',
    },

    pagination: {
      prev: '上一页',
      next: '下一页',
    },
  }
