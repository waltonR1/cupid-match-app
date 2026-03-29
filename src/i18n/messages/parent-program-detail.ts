import type { AppLocaleMessages } from '@/i18n/types'

export const parentProgramDetailMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Parent Program',
    },
    fields: {
      date: '日期',
      city: '城市',
      mode: '形式',
      seats: '名额',
      status: '状态',
    },
    actions: {
      apply: '申请参与',
    },
    sections: {
      scope: '本场内容',
      boundary: '参与边界',
      visibleProfiles: '相关资料',
      guidance: '父母专区只展示用户已授权的背景信息，不会开放私密聊天、联系方式或替代用户做关系决定。',
      notFound: '没有找到这个家长项目的 mock 数据。',
    },
    scopeCards: {
      understanding: { title: '资料理解', desc: '帮助家长理解资料中的教育、职业、城市和关系意向信息。' },
      boundary: { title: '沟通边界', desc: '明确哪些信息可以由家长补充，哪些必须由用户本人确认。' },
    },
    status: {
      open: '开放中',
      waitlist: '候补',
      closed: '已满',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Parent Program',
    },
    fields: {
      date: 'Date',
      city: 'Ville',
      mode: 'Mode',
      seats: 'Places',
      status: 'Statut',
    },
    actions: {
      apply: 'Demander une place',
    },
    sections: {
      scope: 'Contenu',
      boundary: 'Cadre',
      visibleProfiles: 'Profils lies',
      guidance: 'L espace parents ne donne acces qu aux informations deja autorisees par l utilisateur, sans ouvrir les conversations privees ni remplacer sa decision.',
      notFound: 'Aucun programme parents mock trouve.',
    },
    scopeCards: {
      understanding: { title: 'Lecture du dossier', desc: 'Aider les parents a comprendre formation, metier, ville et intention relationnelle.' },
      boundary: { title: 'Limites de communication', desc: 'Clarifier ce que la famille peut completer et ce que seul l utilisateur confirme.' },
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Parent Program',
    },
    fields: {
      date: 'Date',
      city: 'City',
      mode: 'Mode',
      seats: 'Seats',
      status: 'Status',
    },
    actions: {
      apply: 'Apply to join',
    },
    sections: {
      scope: 'Program scope',
      boundary: 'Participation boundary',
      visibleProfiles: 'Related profiles',
      guidance: 'The parent area only exposes background information explicitly authorized by the user. It does not expose private chats, direct contact access, or replace the user in relationship decisions.',
      notFound: 'No mock parent program was found.',
    },
    scopeCards: {
      understanding: { title: 'Profile interpretation', desc: 'Helps parents understand education, occupation, city, and relationship intent fields.' },
      boundary: { title: 'Communication boundaries', desc: 'Clarifies what family can add as context and what only the user can confirm.' },
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Closed',
    },
  },
}
