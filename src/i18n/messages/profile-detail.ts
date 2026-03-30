import type { AppLocaleMessages } from '@/i18n/types'

export const profileDetailMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Member Profile',
    },
    fields: {
      age: '年龄',
      intent: '关系意向',
      status: '资料状态',
      city: '城市',
      education: '教育',
      job: '职业',
      languages: '语言',
      visibility: '可见范围',
    },
    sections: {
      profileFacts: '资料信息',
      tags: '标签',
      relatedEvents: '相关活动',
      eventMatches: '适合参与的活动',
      detailSummary: '当前为演示站会员详情页，后续可以继续接入更多照片、生活方式、审核备注、联系权限和顾问跟进记录。',
      notFound: '没有找到这位会员的 mock 资料。',
    },
    visibility: {
      familyVisible: '允许家长辅助了解',
      userVisible: '用户本人主导',
    },
    status: {
      open: '可联系',
      review: '审核中',
      vip: 'VIP 优先',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Member Profile',
    },
    fields: {
      age: 'Age',
      intent: 'Intention',
      status: 'Statut',
      city: 'Ville',
      education: 'Formation',
      job: 'Metier',
      languages: 'Langues',
      visibility: 'Visibilite',
    },
    sections: {
      profileFacts: 'Informations',
      tags: 'Tags',
      relatedEvents: 'Related Events',
      eventMatches: 'Evenements pertinents',
      detailSummary: 'Ceci est une fiche detail mock. Plus tard, on pourra y brancher davantage de photos, de notes de verification et de droits d acces.',
      notFound: 'Aucun profil mock trouve pour ce membre.',
    },
    visibility: {
      familyVisible: 'Appui familial autorise',
      userVisible: 'Utilisateur principal',
    },
    status: {
      open: 'Ouvert',
      review: 'Verification',
      vip: 'Priorite VIP',
    },
  },
  en: {
    hero: {
      eyebrow: 'Member Profile',
    },
    fields: {
      age: 'Age',
      intent: 'Intent',
      status: 'Profile status',
      city: 'City',
      education: 'Education',
      job: 'Occupation',
      languages: 'Languages',
      visibility: 'Visibility',
    },
    sections: {
      profileFacts: 'Profile facts',
      tags: 'Tags',
      relatedEvents: 'Related Events',
      eventMatches: 'Good-fit events',
      detailSummary: 'This is a demo detail page. Later it can be extended with more photos, lifestyle fields, review notes, contact permissions, and advisor follow-up history.',
      notFound: 'No mock profile was found for this member.',
    },
    visibility: {
      familyVisible: 'Family-assisted context allowed',
      userVisible: 'User-led visibility',
    },
    status: {
      open: 'Open',
      review: 'In review',
      vip: 'VIP priority',
    },
  },
}
