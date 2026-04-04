import type { AppLocaleMessages } from '@/i18n/types'

export const eventsMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: '精选线下活动',
      title: '活动列表',
      subtitle: '查看当前开放报名、候补与已满额的活动安排，快速了解时间、城市、场地与参与门槛。',
      nextEvent: '近期优先活动',
    },
    fields: {
      date: '日期',
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '席位',
    },
    stats: {
      totalEvents: '活动总数',
      openEvents: '开放报名',
      waitlistEvents: '候补中',
      cities: '覆盖城市',
    },
    featured: {
      eyebrow: '优先查看',
      title: '开放与候补活动',
      subtitle: '优先展示当前仍可报名或正在候补的活动，方便先判断是否值得继续了解。',
    },
    schedule: {
      eyebrow: '完整安排',
      title: '完整活动清单',
      note: '完整列表用于查看近期节奏与分布。后续接入真实接口后，这里会直接映射实际活动状态。',
    },
    status: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Selection d evenements',
      title: 'Liste des evenements',
      subtitle: 'Consulte les evenements ouverts, en attente ou complets pour comprendre rapidement le format, la ville, le lieu et le niveau d acces.',
      nextEvent: 'Evenement prioritaire',
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
      eyebrow: 'A voir en premier',
      title: 'Evenements ouverts et en attente',
      subtitle: 'Les formats encore accessibles ou actuellement en attente sont mis en avant pour faciliter la lecture.',
    },
    schedule: {
      eyebrow: 'Vue complete',
      title: 'Calendrier complet',
      note: 'Cette liste donne une vision d ensemble du rythme des evenements. Elle pourra ensuite se brancher directement sur de vraies donnees d activite.',
    },
    status: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Curated offline events',
      title: 'Event list',
      subtitle: 'Browse open, waitlist, and full events to quickly understand timing, city, venue, and participation fit.',
      nextEvent: 'Priority event',
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
      eyebrow: 'Start here',
      title: 'Open and waitlist events',
      subtitle: 'Events that are still available or currently running on waitlist are surfaced first for faster review.',
    },
    schedule: {
      eyebrow: 'Full view',
      title: 'Complete event calendar',
      note: 'This full list helps users read the current event rhythm and distribution. It can later connect directly to live event data.',
    },
    status: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  },
}
