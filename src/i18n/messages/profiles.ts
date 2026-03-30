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
      cityHint: '展示筛选位和选中反馈，当前不改变结果。',
      intentHint: '强调关系导向，让浏览更像精致筛选而不是纯列表。',
      languagesHint: '保留多语言维度，先做展示型交互。',
      clear: '清除',
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
      cityHint: 'Le filtre reste visuel pour le moment, sans modifier les resultats.',
      intentHint: 'Il structure deja la lecture avec une sensation plus selective.',
      languagesHint: 'Le multilingue reste visible comme un marqueur de profil.',
      clear: 'Effacer',
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
      title: 'Profils visibles a la famille',
      subtitle: 'Ces profils autorisent un appui familial limite lorsque l utilisateur en donne l accord.',
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
      cityHint: 'This keeps the filter area visible without changing results yet.',
      intentHint: 'It adds a more selective, premium browsing rhythm to the page.',
      languagesHint: 'Language range stays as a display cue for now.',
      clear: 'Clear',
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
      title: 'Family-visible profiles',
      subtitle: 'These profiles allow limited family-assisted context when the user explicitly authorizes it.',
    },
    status: {
      open: 'Open',
      review: 'In review',
      vip: 'VIP priority',
    },
  },
}
