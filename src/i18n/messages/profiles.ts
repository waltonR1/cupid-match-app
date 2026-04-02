import type { AppLocaleMessages } from '@/i18n/types'

export const profilesMessages: AppLocaleMessages = {
  zh: {
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
      searchPlaceholder: '搜索姓名、城市、职业或关键词',
      sortLabel: '排序',
      sortNewest: '最近活跃',
      sortPriority: '优先资料',
      sortAgeAsc: '年龄从低到高',
      sortAgeDesc: '年龄从高到低',
      filtersLabel: '更多筛选',
      filterToggleOpen: '展开更多筛选',
      filterToggleClose: '收起更多筛选',
    },

    directory: {
      eyebrow: 'Profile Directory',
      title: '资料目录',
      subtitle: '保持成熟平台常见的浏览逻辑：先看结果，再筛选，再翻页。',
      resultPrefix: '当前共找到',
      resultSuffix: '份资料',
      resultHint: '默认展示全部公开资料，可通过筛选条件逐步收窄范围。',
      empty: '当前没有符合条件的资料。',
      pagePrefix: '当前显示',
      pageMiddle: '',
      pageSuffix: '',
    },

    filters: {
      all: '全部',
      clear: '清除全部',

      age: '年龄',
      city: '城市',
      height: '身高',
      education: '学历',
      intent: '关系意向',

      industry: '行业',
      languages: '语言',
      verified: '认证状态',
      verifiedLabel: '已认证',
      unverifiedLabel: '未认证',
      maritalStatus: '婚姻状态',
      children: '子女情况',
      longDistance: '异地接受度',

      hasChildren: '有孩子',
      noChildren: '无孩子',
      acceptLongDistanceLabel: '接受异地',
      noLongDistance: '不接受异地',

      single: '未婚',
      divorced: '离异',
      widowed: '丧偶',

      bachelor: '本科',
      master: '硕士',
      phd: '博士',

      intentSerious: '认真长期关系',
      intentMarriage: '婚姻导向',
      intentExclusive: '明确排他关系',
      intentCrossBorder: '跨国长期关系',
    },

    fields: {
      age: '年龄',
      height: '身高',
      city: '城市',
      education: '学历',
      job: '职业',
      intent: '关系意向',
      languages: '语言',
    },

    statusTabs: {
      all: '全部资料',
    },

    status: {
      open: '可联系',
      review: '审核中',
      vip: '优先资料',
    },

    actions: {
      open: '查看资料',
      favorite: '加入关注',
      compare: '进一步了解',
    },

    pagination: {
      prev: '上一页',
      next: '下一页',
    },
  },

  fr: {
    hero: {
      eyebrow: 'Member Directory',
      title: 'Profils membres',
      subtitle: 'Parcourir les profils ouverts, filtrer d abord selon les criteres classiques, puis decider si un profil merite d etre approfondi.',
      tags: {
        first: 'Repertoire reel',
        second: 'Voir puis filtrer',
        third: 'Navigation paginee',
      },
    },

    toolbar: {
      searchPlaceholder: 'Rechercher par nom, ville, metier ou mot-cle',
      sortLabel: 'Tri',
      sortNewest: 'Activite recente',
      sortPriority: 'Profils prioritaires',
      sortAgeAsc: 'Age croissant',
      sortAgeDesc: 'Age decroissant',
      filtersLabel: 'Plus de filtres',
      filterToggleOpen: 'Ouvrir plus de filtres',
      filterToggleClose: 'Fermer les filtres',
    },

    directory: {
      eyebrow: 'Profile Directory',
      title: 'Repertoire',
      subtitle: 'Une logique proche des plateformes matures : voir, filtrer, puis parcourir page par page.',
      resultPrefix: 'Resultat actuel :',
      resultSuffix: 'profils',
      resultHint: 'Tous les profils publics sont affiches par defaut avant filtrage.',
      empty: 'Aucun profil ne correspond aux filtres actuels.',
      pagePrefix: 'Affichage',
      pageMiddle: '',
      pageSuffix: '',
    },

    filters: {
      all: 'Tous',
      clear: 'Tout effacer',

      age: 'Age',
      city: 'Ville',
      height: 'Taille',
      education: 'Formation',
      intent: 'Intention',

      industry: 'Secteur',
      languages: 'Langues',
      verified: 'Verification',
      verifiedLabel: 'Verifie',
      unverifiedLabel: 'Non verifie',
      maritalStatus: 'Statut marital',
      children: 'Enfants',
      longDistance: 'Distance',

      hasChildren: 'Avec enfants',
      noChildren: 'Sans enfant',
      acceptLongDistanceLabel: 'Ouvert a distance',
      noLongDistance: 'Pas de distance',

      single: 'Celibataire',
      divorced: 'Divorce',
      widowed: 'Veuf / veuve',

      bachelor: 'Licence',
      master: 'Master',
      phd: 'Doctorat',

      intentSerious: 'Relation serieuse',
      intentMarriage: 'Orientation mariage',
      intentExclusive: 'Relation exclusive',
      intentCrossBorder: 'Relation internationale',
    },

    fields: {
      age: 'Age',
      height: 'Taille',
      city: 'Ville',
      education: 'Formation',
      job: 'Metier',
      intent: 'Intention',
      languages: 'Langues',
    },

    statusTabs: {
      all: 'Tous les profils',
    },

    status: {
      open: 'Ouvert',
      review: 'Verification',
      vip: 'Prioritaire',
    },

    actions: {
      open: 'Voir le profil',
      favorite: 'Ajouter au suivi',
      compare: 'Approfondir',
    },

    pagination: {
      prev: 'Precedent',
      next: 'Suivant',
    },
  },

  en: {
    hero: {
      eyebrow: 'Member Directory',
      title: 'Member profiles',
      subtitle: 'Browse the open profile pool, filter first by core dating criteria, then decide which profiles deserve deeper attention.',
      tags: {
        first: 'Real profile directory',
        second: 'Browse then filter',
        third: 'Paged navigation',
      },
    },

    toolbar: {
      searchPlaceholder: 'Search by name, city, occupation, or keyword',
      sortLabel: 'Sort',
      sortNewest: 'Recently active',
      sortPriority: 'Priority profiles',
      sortAgeAsc: 'Age: low to high',
      sortAgeDesc: 'Age: high to low',
      filtersLabel: 'More filters',
      filterToggleOpen: 'Show more filters',
      filterToggleClose: 'Hide extra filters',
    },

    directory: {
      eyebrow: 'Profile Directory',
      title: 'Directory',
      subtitle: 'A mature browsing logic: view results, filter, then move through pages.',
      resultPrefix: 'Current result:',
      resultSuffix: 'profiles',
      resultHint: 'All public profiles are shown by default before filtering.',
      empty: 'No profiles match the current filters.',
      pagePrefix: 'Showing',
      pageMiddle: '',
      pageSuffix: '',
    },

    filters: {
      all: 'All',
      clear: 'Clear all',

      age: 'Age',
      city: 'City',
      height: 'Height',
      education: 'Education',
      intent: 'Intent',

      industry: 'Industry',
      languages: 'Languages',
      verified: 'Verification',
      verifiedLabel: 'Verified',
      unverifiedLabel: 'Unverified',
      maritalStatus: 'Marital status',
      children: 'Children',
      longDistance: 'Long-distance',

      hasChildren: 'Has children',
      noChildren: 'No children',
      acceptLongDistanceLabel: 'Open to long-distance',
      noLongDistance: 'No long-distance',

      single: 'Single',
      divorced: 'Divorced',
      widowed: 'Widowed',

      bachelor: 'Bachelor',
      master: 'Master',
      phd: 'PhD',

      intentSerious: 'Serious relationship',
      intentMarriage: 'Marriage-oriented',
      intentExclusive: 'Exclusive relationship',
      intentCrossBorder: 'Cross-border relationship',
    },

    fields: {
      age: 'Age',
      height: 'Height',
      city: 'City',
      education: 'Education',
      job: 'Occupation',
      intent: 'Intent',
      languages: 'Languages',
    },

    statusTabs: {
      all: 'All profiles',
    },

    status: {
      open: 'Open',
      review: 'In review',
      vip: 'Priority',
    },

    actions: {
      open: 'Open profile',
      favorite: 'Save',
      compare: 'Explore more',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  },
}