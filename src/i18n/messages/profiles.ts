import type { AppLocaleMessages } from '@/i18n/types'

export const profilesMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Local Mock Profiles',
      title: '会员资料',
      subtitle: '这里直接展示当前可浏览的本地 mock 会员资料，用于演示资料列表、筛选标签和资料详情跳转。',
    },
    stats: {
      totalProfiles: '公开资料',
      openCities: '开放城市',
      familyAssisted: '家长协助',
    },
    filters: {
      city: '城市',
      intent: '关系意向',
      languages: '语言',
    },
    directory: {
      eyebrow: 'Profile Directory',
      title: '当前资料库',
      note: '当前使用本地 mock 数据，后续可以直接替换为真实会员资料接口。',
    },
    fields: {
      age: '年龄',
      city: '城市',
      education: '教育',
      job: '职业',
      intent: '关系意向',
      languages: '语言',
      status: '状态',
    },
    badges: {
      familyAssisted: '家长协助',
      directProfile: '本人主导',
    },
    featured: {
      eyebrow: '家长协助资料',
      title: '家长可见资料',
      subtitle: '以下资料允许在用户授权下，由家长辅助理解背景或参与基础沟通。',
    },
    status: {
      open: '可联系',
      review: '审核中',
      vip: 'VIP 优先',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Local Mock Profiles',
      title: 'Profils membres',
      subtitle: 'Cette page montre directement les profils mock consultables afin de demo le repertoire, les filtres et l acces au detail.',
    },
    stats: {
      totalProfiles: 'Profils',
      openCities: 'Villes',
      familyAssisted: 'Avec famille',
    },
    filters: {
      city: 'Ville',
      intent: 'Intention',
      languages: 'Langues',
    },
    directory: {
      eyebrow: 'Profile Directory',
      title: 'Profils actuels',
      note: 'La page fonctionne avec des donnees mock locales et pourra ensuite etre branchee sur une vraie API de profils.',
    },
    fields: {
      age: 'Age',
      city: 'Ville',
      education: 'Formation',
      job: 'Metier',
      intent: 'Intention',
      languages: 'Langues',
      status: 'Statut',
    },
    badges: {
      familyAssisted: 'Avec famille',
      directProfile: 'En direct',
    },
    featured: {
      eyebrow: 'Profils avec appui familial',
      title: 'Profils visibles aux parents',
      subtitle: 'Ces profils autorisent une aide parentale limitee lorsque l utilisateur en donne l accord.',
    },
    status: {
      open: 'Ouvert',
      review: 'Verification',
      vip: 'Priorite VIP',
    },
  },
  en: {
    hero: {
      eyebrow: 'Local Mock Profiles',
      title: 'Member profiles',
      subtitle: 'This page shows browsable local mock member profiles, including filter tags and profile detail entry points.',
    },
    stats: {
      totalProfiles: 'Profiles',
      openCities: 'Cities',
      familyAssisted: 'Family-assisted',
    },
    filters: {
      city: 'City',
      intent: 'Intent',
      languages: 'Languages',
    },
    directory: {
      eyebrow: 'Profile Directory',
      title: 'Current profiles',
      note: 'This view runs on local mock data now and can later be swapped to a real profile API.',
    },
    fields: {
      age: 'Age',
      city: 'City',
      education: 'Education',
      job: 'Occupation',
      intent: 'Intent',
      languages: 'Languages',
      status: 'Status',
    },
    badges: {
      familyAssisted: 'Family-assisted',
      directProfile: 'Direct',
    },
    featured: {
      eyebrow: 'Family-assisted profiles',
      title: 'Parent-visible profiles',
      subtitle: 'These profiles allow limited parent-assisted context when the user explicitly authorizes it.',
    },
    status: {
      open: 'Open',
      review: 'In review',
      vip: 'VIP priority',
    },
  },
}
