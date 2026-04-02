import type { AppLocaleMessages } from '@/i18n/types'

export const familyMessages: AppLocaleMessages = {
  zh: {
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
      filtersLabel: '更多筛选',
      filterToggleOpen: '展开更多筛选',
      filterToggleClose: '收起更多筛选',
    },

    directory: {
      title: '家庭参与筛选',
      subtitle: '先看资料、先筛选背景与路径，再判断是否值得推动子女接触。',
      resultPrefix: '当前筛出',
      resultSuffix: '份候选资料',
      empty: '当前没有符合条件的家庭候选资料。',
      pagePrefix: '当前显示',
    },

    filters: {
      clear: '清除全部',
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
  },

  fr: {
    hero: {
      eyebrow: 'Family Participation',
      title: 'Participation famille',
      subtitle: 'Cette page correspond a l etape de participation familiale ou la famille consulte d abord les dossiers autorises.',
      tags: {
        first: 'Voir les dossiers',
        second: 'Filtrer d abord',
        third: 'Evaluer la compatibilite',
      },
    },

    stats: {
      visibleProfiles: 'Dossiers visibles',
      priorityProfiles: 'Priorite famille',
      contactReady: 'Pret pour echange',
    },

    toolbar: {
      sortLabel: 'Tri',
      filtersLabel: 'Plus de filtres',
      filterToggleOpen: 'Ouvrir plus de filtres',
      filterToggleClose: 'Fermer les filtres',
    },

    directory: {
      title: 'Filtrage famille',
      subtitle: 'Voir les dossiers, filtrer le contexte et le parcours, puis decider si un premier contact merite d etre pousse.',
      resultPrefix: 'Selection actuelle :',
      resultSuffix: 'dossiers',
      empty: 'Aucun dossier familial ne correspond aux criteres actuels.',
      pagePrefix: 'Affichage',
    },

    filters: {
      clear: 'Tout effacer',
      age: 'Age',
      city: 'Ville',
      education: 'Formation',
      intent: 'Projet relationnel',
      familyMode: 'Mode famille',
      occupation: 'Metier',
      industry: 'Secteur',
      maritalStatus: 'Statut marital',
      children: 'Enfants',
      longDistance: 'Distance',
    },

    fields: {
      city: 'Ville',
      education: 'Formation',
      residencePlan: 'Projet de vie',
      job: 'Metier',
    },

    modes: {
      contextOnly: 'Contexte seulement',
      contactReady: 'Pret pour echange famille',
      priority: 'Priorite famille',
    },

    tags: {
      maritalSingle: 'Celibataire',
      maritalDivorced: 'Divorce',
      maritalWidowed: 'Veuf / veuve',
      childrenYes: 'Avec enfants',
      childrenNo: 'Sans enfant',
      longDistanceYes: 'Ouvert a distance',
      longDistanceNo: 'Plutot meme ville',
    },

    card: {
      labelObserve: 'A evaluer en famille',
      labelContactReady: 'Echange famille possible',
      labelReview: 'Dossier encore en verification',
      labelPriority: 'A pousser en priorite',
    },

    pagination: {
      prev: 'Precedent',
      next: 'Suivant',
    },
  },

  en: {
    hero: {
      eyebrow: 'Family Participation',
      title: 'Family participation',
      subtitle: 'This page handles the family participation review stage and only shows dossiers explicitly authorized for early family-side review.',
      tags: {
        first: 'Review dossiers first',
        second: 'Filter before acting',
        third: 'Judge fit first',
      },
    },

    stats: {
      visibleProfiles: 'Visible dossiers',
      priorityProfiles: 'Priority review',
      contactReady: 'Contact-ready',
    },

    toolbar: {
      sortLabel: 'Sort',
      filtersLabel: 'More filters',
      filterToggleOpen: 'Show more filters',
      filterToggleClose: 'Hide extra filters',
    },

    directory: {
      title: 'Family screening',
      subtitle: 'Review the dossier first, filter the background and relationship path, then decide whether contact should be encouraged.',
      resultPrefix: 'Current shortlist:',
      resultSuffix: 'dossiers',
      empty: 'No family-facing dossiers match the current filters.',
      pagePrefix: 'Showing',
    },

    filters: {
      clear: 'Clear all',
      age: 'Age',
      city: 'City',
      education: 'Education',
      intent: 'Relationship path',
      familyMode: 'Family mode',
      occupation: 'Occupation',
      industry: 'Industry',
      maritalStatus: 'Marital status',
      children: 'Children',
      longDistance: 'Long-distance',
    },

    fields: {
      city: 'City',
      education: 'Education',
      residencePlan: 'Residence plan',
      job: 'Occupation',
    },

    modes: {
      contextOnly: 'Context only',
      contactReady: 'Family contact ready',
      priority: 'Priority family review',
    },

    tags: {
      maritalSingle: 'Single',
      maritalDivorced: 'Divorced',
      maritalWidowed: 'Widowed',
      childrenYes: 'Has children',
      childrenNo: 'No children',
      longDistanceYes: 'Open to long-distance',
      longDistanceNo: 'Prefers same city',
    },

    card: {
      labelObserve: 'Worth family review first',
      labelContactReady: 'Ready for family discussion',
      labelReview: 'Profile still under review',
      labelPriority: 'Ready to move forward',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  },
}
