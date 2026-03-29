import type { AppLocaleMessages } from '@/i18n/types'

export const eventsMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Local Mock Events',
      title: '活动列表',
      subtitle: '这里直接显示当前本地 mock 线下活动，包含城市、时间、场地、名额和报名状态。',
      nextEvent: '近期活动',
    },
    fields: {
      date: '日期',
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '名额',
    },
    stats: {
      totalEvents: '活动总数',
      openEvents: '开放报名',
      waitlistEvents: '候补中',
      cities: '覆盖城市',
    },
    featured: {
      eyebrow: '近期活动',
      title: '开放与候补活动',
      subtitle: '优先展示当前开放报名或处于候补中的活动。',
    },
    schedule: {
      eyebrow: '完整日历',
      title: '完整活动清单',
      note: '当前全部为本地 mock 数据，后续可以直接替换成活动接口和报名状态接口。',
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Local Mock Events',
      title: 'Liste des evenements',
      subtitle: 'Cette page montre directement les evenements mock avec ville, date, lieu, capacite et statut d inscription.',
      nextEvent: 'Next Event',
    },
    fields: {
      date: 'Date',
      city: 'Ville',
      venue: 'Lieu',
      format: 'Format',
      audience: 'Public',
      seats: 'Places',
    },
    stats: {
      totalEvents: 'Evenements',
      openEvents: 'Ouverts',
      waitlistEvents: 'Attente',
      cities: 'Villes',
    },
    featured: {
      eyebrow: 'Prochains evenements',
      title: 'Evenements ouverts et attente',
      subtitle: 'Priorite aux evenements ouverts ou en liste d attente.',
    },
    schedule: {
      eyebrow: 'Full Schedule',
      title: 'Calendrier complet',
      note: 'Tout est alimente par des donnees mock locales et pourra etre remplace plus tard par une vraie API d evenements.',
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Local Mock Events',
      title: 'Event list',
      subtitle: 'This page shows current local mock offline events with city, date, venue, capacity, and registration status.',
      nextEvent: 'Next Event',
    },
    fields: {
      date: 'Date',
      city: 'City',
      venue: 'Venue',
      format: 'Format',
      audience: 'Audience',
      seats: 'Seats',
    },
    stats: {
      totalEvents: 'Events',
      openEvents: 'Open',
      waitlistEvents: 'Waitlist',
      cities: 'Cities',
    },
    featured: {
      eyebrow: 'Upcoming events',
      title: 'Open and waitlist events',
      subtitle: 'Open and waitlist events are prioritized first.',
    },
    schedule: {
      eyebrow: 'Full Schedule',
      title: 'Full event schedule',
      note: 'Everything here is driven by local mock data and can later be swapped to real event and registration APIs.',
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  },
}
