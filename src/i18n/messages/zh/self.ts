import type { AppMessageSchema } from '@/i18n/types'

export const selfMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Member Directory',
      title: '会员资料',
      subtitle: '浏览当前开放的会员资料，先按常规条件筛选，再决定是否进一步了解。',
      tags: {
        first: '真实资料目录',
        second: '先浏览再筛选',
        third: '支持分页查看',
      },
    },

    toolbar: {
      sortLabel: '排序',
    },

    directory: {
      title: '会员筛选',
      resultPrefix: '当前共找到',
      resultSuffix: '份资料',
      empty: '当前没有符合条件的资料。',
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
      height: '身高',
      education: '学历',
      intent: '关系意向',
      industry: '行业',
      languages: '语言',
      verified: '认证状态',
      maritalStatus: '婚姻状态',
      children: '子女情况',
      longDistance: '异地接受度',
    },

    fields: {
      city: '城市',
      education: '学历',
      job: '职业',
      languages: '语言',
    },

    card: {
      goalSerious: '认真关系',
      goalMarriage: '婚姻导向',
      goalExclusive: '长期发展',
      goalCrossBorder: '跨城可能',
      labelSelected: '精选资料',
      labelReview: '资料审核中',
      labelPriority: '优先资料',
    },

    pagination: {
      prev: '上一页',
      next: '下一页',
    },
  }
