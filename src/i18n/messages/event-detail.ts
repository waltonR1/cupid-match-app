import type { AppLocaleMessages } from '@/i18n/types'

export const eventDetailMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: '活动详情',
    },
    fields: {
      status: '状态',
      date: '日期',
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '席位',
    },
    actions: {
      register: '提交报名意向',
    },
    sections: {
      agenda: '活动流程',
      notes: '报名说明',
      notesText: '提交报名后，顾问会结合席位、资料完成度与活动匹配度进行确认，并在需要时安排候补或后续跟进。',
      relatedProfiles: '相关会员',
      notFound: '暂未找到该活动信息。',
    },
    agenda: {
      step1: { title: '签到与入场', desc: '核对报名信息，完成简短签到与活动说明。' },
      step2: { title: '主题交流', desc: '围绕当晚主题进行小范围分组交流与轮换互动。' },
      step3: { title: '自由延展', desc: '进入更自然的互动阶段，并记录后续沟通意向。' },
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Detail evenement',
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
      notes: 'Modalites inscription',
      notesText: 'Apres la demande, la conseillere valide la participation selon les places, le niveau de dossier et la coherence avec le format, avec bascule possible en attente si necessaire.',
      relatedProfiles: 'Profils lies',
      notFound: 'Aucune information evenement n a ete trouvee.',
    },
    agenda: {
      step1: { title: 'Accueil', desc: 'Verification des inscriptions et courte mise en place avant le debut.' },
      step2: { title: 'Echanges thematiques', desc: 'Conversations en petits groupes autour du sujet central de la soiree.' },
      step3: { title: 'Extension libre', desc: 'Temps d interaction plus naturel avec recueil des intentions de suite.' },
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Event detail',
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
      register: 'Submit interest',
    },
    sections: {
      agenda: 'Agenda',
      notes: 'Registration notes',
      notesText: 'After submission, an advisor reviews seat availability, profile readiness, and event fit before confirming participation or placing the user on waitlist.',
      relatedProfiles: 'Related members',
      notFound: 'No event information is currently available.',
    },
    agenda: {
      step1: { title: 'Check-in', desc: 'Registration review, arrival guidance, and a short opening orientation.' },
      step2: { title: 'Themed exchange', desc: 'Small-group conversations built around the evening theme and format.' },
      step3: { title: 'Open interaction', desc: 'A more natural interaction phase followed by interest capture for next steps.' },
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  },
}
