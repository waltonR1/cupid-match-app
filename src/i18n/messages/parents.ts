import type { AppLocaleMessages } from '@/i18n/types'

export const parentsMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Parent Hub',
      title: '家长协助',
      subtitle: '这里直接查看家长可参与的资料、沙龙和协助时段，而不只是理念介绍。',
    },
    stats: {
      visibleProfiles: '可见资料',
      openPrograms: '开放活动',
      supportSlots: '协助时段',
    },
    profiles: {
      eyebrow: '家长可见资料',
      title: '当前可见资料',
      subtitle: '以下资料只在用户授权范围内向家长开放，用于理解背景和沟通边界。',
    },
    fields: {
      age: '年龄',
      city: '城市',
      education: '教育',
      job: '职业',
      intent: '关系意向',
    },
    programs: {
      eyebrow: 'Parent Programs',
      title: '家长沙龙与协助时段',
      subtitle: '这里直接列出家长相关活动和时段，本地 mock 数据后续可替换为真实报名与预约系统。',
    },
    steps: {
      eyebrow: 'Parent Flow',
      title: '家长如何参与',
      subtitle: '家长只补充背景和理解平台流程，不能替代用户本人做关系决策。',
      items: {
        first: {
          index: '01',
          title: '先看资料边界',
          desc: '先确认哪些资料是用户本人公开，哪些只允许家长了解背景说明。',
        },
        second: {
          index: '02',
          title: '再进家长沙龙',
          desc: '通过线上或线下家长沙龙理解平台规则、沟通方式和参与边界。',
        },
        third: {
          index: '03',
          title: '最后进入协助时段',
          desc: '当候选人沟通真正开始时，再进入更具体的一对一协助和顾问答疑。',
        },
      },
    },
    profileStatus: {
      open: '可协助',
      review: '资料审核',
      vip: '优先协助',
    },
    programStatus: {
      open: '开放中',
      waitlist: '候补',
      closed: '已满',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Parent Hub',
      title: 'Accompagnement parents',
      subtitle: 'Cette page montre directement les profils, salons et creneaux accessibles aux parents au lieu d une simple page de discours.',
    },
    stats: {
      visibleProfiles: 'Profils visibles',
      openPrograms: 'Programmes ouverts',
      supportSlots: 'Creneaux',
    },
    profiles: {
      eyebrow: 'Profils visibles aux parents',
      title: 'Profils actuellement visibles',
      subtitle: 'Ces profils n ouvrent qu un acces limite au contexte et aux limites de communication.',
    },
    fields: {
      age: 'Age',
      city: 'Ville',
      education: 'Formation',
      job: 'Metier',
      intent: 'Intention',
    },
    programs: {
      eyebrow: 'Parent Programs',
      title: 'Salons et creneaux parents',
      subtitle: 'La liste ci-dessous montre directement les evenements et plages d accompagnement parents via des donnees mock locales.',
    },
    steps: {
      eyebrow: 'Parent Flow',
      title: 'Comment les parents participent',
      subtitle: 'Les parents ajoutent du contexte et comprennent le processus, sans remplacer la decision de l utilisateur.',
      items: {
        first: {
          index: '01',
          title: 'Verifier les limites du dossier',
          desc: 'Distinguer ce qui est public, ce qui reste prive, et ce que la famille peut seulement expliquer.',
        },
        second: {
          index: '02',
          title: 'Participer au salon parents',
          desc: 'Comprendre les regles, le style de communication et les limites de participation parentale.',
        },
        third: {
          index: '03',
          title: 'Passer aux creneaux d accompagnement',
          desc: 'Entrer ensuite dans des echanges plus concrets avec la conseillere seulement lorsque la phase de discussion commence.',
        },
      },
    },
    profileStatus: {
      open: 'Accompagnement',
      review: 'Verification',
      vip: 'Priorite',
    },
    programStatus: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Parent Hub',
      title: 'Parent assistance',
      subtitle: 'This page shows parent-visible profiles, salons, and support slots instead of another explanatory page.',
    },
    stats: {
      visibleProfiles: 'Visible profiles',
      openPrograms: 'Open programs',
      supportSlots: 'Support slots',
    },
    profiles: {
      eyebrow: 'Parent-visible profiles',
      title: 'Currently visible profiles',
      subtitle: 'These profiles only expose limited background and communication boundaries with user consent.',
    },
    fields: {
      age: 'Age',
      city: 'City',
      education: 'Education',
      job: 'Occupation',
      intent: 'Intent',
    },
    programs: {
      eyebrow: 'Parent Programs',
      title: 'Parent salons and support slots',
      subtitle: 'This section lists parent events and support slots directly, backed by local mock data that can later be replaced by real booking flows.',
    },
    steps: {
      eyebrow: 'Parent Flow',
      title: 'How parent participation works',
      subtitle: 'Parents add context and understand the process, but they do not replace the user in relationship decisions.',
      items: {
        first: {
          index: '01',
          title: 'Review profile boundaries first',
          desc: 'Separate what is public, what remains private, and what family members may only explain as background.',
        },
        second: {
          index: '02',
          title: 'Join a parent salon next',
          desc: 'Use parent salons to understand platform rules, communication style, and the limits of parent involvement.',
        },
        third: {
          index: '03',
          title: 'Use support slots only when needed',
          desc: 'Move into one-to-one support once candidate conversations actually begin and more concrete guidance is needed.',
        },
      },
    },
    profileStatus: {
      open: 'Assistable',
      review: 'In review',
      vip: 'Priority',
    },
    programStatus: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Closed',
    },
  },
}
