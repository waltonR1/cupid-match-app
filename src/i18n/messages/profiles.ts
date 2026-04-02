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
      title: '资料目录',
      subtitle: '保持成熟平台常见的浏览逻辑：先看结果，再筛选，再翻页。',
      resultPrefix: '当前共找到',
      resultSuffix: '份资料',
      empty: '当前没有符合条件的资料。',
      pagePrefix: '当前显示',
    },

    filters: {
      clear: '清除全部',
      age: '年龄',
      city: '城市',
      height: '身高',
      education: '学历',
      intent: '关系意向',
      industry: '行业',
      languages: '语言',
      verified: '认证状态',
      maritalStatus: '婚姻状态',
      children: '子女情况',
      longDistance: '异地接受度',
    },

    fields: {
      city: '城市',
      education: '学历',
      job: '职业',
      languages: '语言',
    },

    card: {
      goalSerious: '认真关系',
      goalMarriage: '婚姻导向',
      goalExclusive: '长期发展',
      goalCrossBorder: '跨城可能',
      labelSelected: '精选资料',
      labelReview: '资料审核中',
      labelPriority: '优先资料',
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
      title: 'Repertoire',
      subtitle: 'Une logique proche des plateformes matures : voir, filtrer, puis parcourir page par page.',
      resultPrefix: 'Resultat actuel :',
      resultSuffix: 'profils',
      empty: 'Aucun profil ne correspond aux filtres actuels.',
      pagePrefix: 'Affichage',
    },

    filters: {
      clear: 'Tout effacer',
      age: 'Age',
      city: 'Ville',
      height: 'Taille',
      education: 'Formation',
      intent: 'Intention',
      industry: 'Secteur',
      languages: 'Langues',
      verified: 'Verification',
      maritalStatus: 'Statut marital',
      children: 'Enfants',
      longDistance: 'Distance',
    },

    fields: {
      city: 'Ville',
      education: 'Formation',
      job: 'Metier',
      languages: 'Langues',
    },

    card: {
      goalSerious: 'Relation serieuse',
      goalMarriage: 'Orientation mariage',
      goalExclusive: 'Projet durable',
      goalCrossBorder: 'Ouverture entre villes',
      labelSelected: 'Profil Selectionne',
      labelReview: 'Profil En Verification',
      labelPriority: 'Profil Prioritaire',
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
      title: 'Directory',
      subtitle: 'A mature browsing logic: view results, filter, then move through pages.',
      resultPrefix: 'Current result:',
      resultSuffix: 'profiles',
      empty: 'No profiles match the current filters.',
      pagePrefix: 'Showing',
    },

    filters: {
      clear: 'Clear all',
      age: 'Age',
      city: 'City',
      height: 'Height',
      education: 'Education',
      intent: 'Intent',
      industry: 'Industry',
      languages: 'Languages',
      verified: 'Verification',
      maritalStatus: 'Marital status',
      children: 'Children',
      longDistance: 'Long-distance',
    },

    fields: {
      city: 'City',
      education: 'Education',
      job: 'Occupation',
      languages: 'Languages',
    },

    card: {
      goalSerious: 'Serious relationship',
      goalMarriage: 'Marriage-oriented',
      goalExclusive: 'Long-term path',
      goalCrossBorder: 'Cross-city potential',
      labelSelected: 'Selected Profile',
      labelReview: 'Profile In Review',
      labelPriority: 'Priority Profile',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  },
}
