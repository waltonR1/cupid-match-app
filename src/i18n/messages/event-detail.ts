import type { AppLocaleMessages } from '@/i18n/types'

export const eventDetailMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Event Detail',
    },
    fields: {
      status: '状态',
      date: '日期',
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '名额',
    },
    actions: {
      register: '提交报名',
    },
    sections: {
      agenda: '活动流程',
      notes: '报名说明',
      notesText: '当前详情页使用 mock 流程展示活动结构。后续可以继续接入实名报名、资格审核、候补转正和活动后跟进。',
      relatedProfiles: '相关会员',
      notFound: '没有找到这场活动的 mock 数据。',
    },
    agenda: {
      step1: { title: '签到入场', desc: '核验报名名单并完成轻度破冰。' },
      step2: { title: '主题交流', desc: '围绕活动主题进行分组与轮换交流。' },
      step3: { title: '自由延展', desc: '进入更自然的互动与后续意向记录。' },
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Event Detail',
    },
    fields: {
      status: 'Statut',
      date: 'Date',
      city: 'Ville',
      venue: 'Lieu',
      format: 'Format',
      audience: 'Public',
      seats: 'Places',
    },
    actions: {
      register: 'Envoyer une demande',
    },
    sections: {
      agenda: 'Deroule',
      notes: 'Notes inscription',
      notesText: 'Cette fiche evenement reste une demonstration mock. Elle pourra ensuite accueillir un vrai tunnel d inscription, de verification et de suivi.',
      relatedProfiles: 'Profils lies',
      notFound: 'Aucun evenement mock trouve.',
    },
    agenda: {
      step1: { title: 'Accueil', desc: 'Verification de la liste et premier brise-glace.' },
      step2: { title: 'Echanges thematiques', desc: 'Discussions en petits groupes selon le format choisi.' },
      step3: { title: 'Extension libre', desc: 'Interactions plus naturelles et recueil des intentions.' },
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Event Detail',
    },
    fields: {
      status: 'Status',
      date: 'Date',
      city: 'City',
      venue: 'Venue',
      format: 'Format',
      audience: 'Audience',
      seats: 'Seats',
    },
    actions: {
      register: 'Submit registration',
    },
    sections: {
      agenda: 'Agenda',
      notes: 'Registration notes',
      notesText: 'This event detail page still runs on mock data. Later it can connect to real registration, eligibility review, waitlist promotion, and follow-up logic.',
      relatedProfiles: 'Related members',
      notFound: 'No mock event was found.',
    },
    agenda: {
      step1: { title: 'Check-in', desc: 'Participant list verification and a light opening ice-breaker.' },
      step2: { title: 'Themed exchange', desc: 'Small-group rotations and conversations tied to the event format.' },
      step3: { title: 'Open interaction', desc: 'A more natural phase for interaction and post-event intention capture.' },
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  },
}
