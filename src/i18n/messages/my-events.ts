import type { AppLocaleMessages } from '@/i18n/types'

export const myEventsMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Events',
      title: '我的报名与到场节奏',
      subtitle: '活动是相亲流程里的关键推进点。这里区分你本人要做的确认与准备，以及家长在家长沙龙或背景说明中的辅助角色。',
    },
    stats: {
      confirmed: '已确认',
      waitlist: '候补中',
      completed: '已完成',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '本人决定参加什么',
        description: '报名和到场节奏应由你本人判断，活动只是推进关系的工具，不是替代决策的流程。',
        point1: '确认前先判断活动是否适合当前阶段',
        point2: '候补和已确认都要提前准备节奏',
        point3: '活动后的跟进仍由本人主导',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只在特定场景补位',
        description: '家长可参与家长沙龙、背景说明或活动前协助了解，但不替代报名和线下出席。',
        point1: '更适合家长说明会或背景沟通型场景',
        point2: '可帮助整理活动信息与后续建议',
        point3: '不能替代本人参加和后续判断',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: '当前报名记录',
      seats: '报名人数',
      action: '查看活动',
    },
    support: {
      eyebrow: 'Support',
      title: '活动推进提醒',
      point1: '对已确认活动提前看清地点、时间和注意事项。',
      point2: '候补中的活动保持轻跟进，不要把节奏压得过满。',
      point3: '已完成活动更适合回看反馈，而不是简单重复报名。',
    },
    family: {
      eyebrow: 'Family',
      title: '适合家长协同的部分',
      point1: '活动背景说明与家长沙龙信息可共享。',
      point2: '本人仍保留是否继续推进的最终判断。',
      point3: '如果不希望家长介入，直接保持当前边界即可。',
    },
    status: {
      confirmed: '已确认',
      waitlist: '候补中',
      completed: '已完成',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Events',
      title: 'Mes inscriptions et mon rythme de participation',
      subtitle: 'Les evenements sont un point cle du parcours matrimonial. Cette page separe ce que la personne doit confirmer elle-meme et ce que la famille peut seulement accompagner.',
    },
    stats: {
      confirmed: 'Confirmees',
      waitlist: 'En attente',
      completed: 'Terminees',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'La personne choisit ses evenements',
        description: 'Le rythme d inscription et de participation doit rester une decision personnelle.',
        point1: 'Verifier si l evenement correspond vraiment a la phase actuelle',
        point2: 'Preparer aussi bien les confirmations que les listes d attente',
        point3: 'Le suivi apres evenement reste mene par la personne',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille n intervient qu en appui',
        description: 'La famille peut aider sur un salon parents ou sur du contexte, sans remplacer l inscription ni la participation.',
        point1: 'Surtout utile pour les scenes explicatives ou familiales',
        point2: 'Peut aider a clarifier les informations pratiques',
        point3: 'Ne remplace pas la presence ni le jugement de la personne',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: 'Inscriptions actuelles',
      seats: 'Places prises',
      action: 'Voir l evenement',
    },
    support: {
      eyebrow: 'Support',
      title: 'Rappels de progression',
      point1: 'Verifier en avance le lieu, l horaire et les consignes des evenements confirmes.',
      point2: 'Garder une cadence souple pour les listes d attente.',
      point3: 'Les evenements termines servent surtout a relire le retour et le suivi.',
    },
    family: {
      eyebrow: 'Family',
      title: 'Ce qui peut etre partage avec la famille',
      point1: 'Le contexte des evenements et des salons parents peut etre partage.',
      point2: 'La personne garde la decision de poursuivre ou non.',
      point3: 'Si la famille ne doit pas intervenir, le cadre actuel suffit.',
    },
    status: {
      confirmed: 'Confirmee',
      waitlist: 'Attente',
      completed: 'Terminee',
    },
  },
  en: {
    hero: {
      eyebrow: 'Events',
      title: 'My registrations and event pace',
      subtitle: 'Events are a key progression point in the matchmaking flow. This page separates what the user must confirm and prepare personally from the limited support that family may provide.',
    },
    stats: {
      confirmed: 'Confirmed',
      waitlist: 'Waitlist',
      completed: 'Completed',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'The user decides what to attend',
        description: 'Registration and attendance pace should remain a personal judgment, with events serving the relationship process rather than replacing it.',
        point1: 'Check whether each event actually fits the current stage',
        point2: 'Prepare for both confirmed and waitlisted entries',
        point3: 'Post-event follow-up still belongs to the user',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family only fills specific gaps',
        description: 'Family may help around parent salons, background context, or pre-event preparation, but not replace registration or attendance.',
        point1: 'Best suited for family briefings or context-heavy formats',
        point2: 'Can help organize practical details and follow-up ideas',
        point3: 'Cannot replace the user s participation or judgment',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: 'Current registrations',
      seats: 'Registrations',
      action: 'Open event',
    },
    support: {
      eyebrow: 'Support',
      title: 'Event progression reminders',
      point1: 'Review location, timing, and notes early for confirmed events.',
      point2: 'Keep a lighter pace for waitlisted events instead of overcommitting.',
      point3: 'Completed events are better used for feedback and next-step judgment.',
    },
    family: {
      eyebrow: 'Family',
      title: 'What can involve family',
      point1: 'Event context and parent salon information can be shared.',
      point2: 'The user still decides whether to continue afterward.',
      point3: 'If family should stay out, the current boundary can remain unchanged.',
    },
    status: {
      confirmed: 'Confirmed',
      waitlist: 'Waitlist',
      completed: 'Completed',
    },
  },
}
