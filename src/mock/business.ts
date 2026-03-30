import type { AppLocale } from '@/i18n/types'

export type LocalizedText = Record<AppLocale, string>

export interface MockProfile {
  id: string
  name: string
  avatar: string
  age: number
  city: LocalizedText
  status: 'open' | 'review' | 'vip'
  familyVisible: boolean
  education: LocalizedText
  occupation: LocalizedText
  intent: LocalizedText
  summary: LocalizedText
  tags: LocalizedText[]
  languages: string[]
}

export interface MockEvent {
  id: string
  date: string
  city: LocalizedText
  venue: LocalizedText
  status: 'open' | 'waitlist' | 'closed'
  title: LocalizedText
  format: LocalizedText
  audience: LocalizedText
  summary: LocalizedText
  seats: number
  registered: number
}

export interface MockFamilyProgram {
  id: string
  date: string
  city: LocalizedText
  mode: LocalizedText
  status: 'open' | 'waitlist' | 'closed'
  title: LocalizedText
  summary: LocalizedText
  seats: number
}

export interface MockUserAccount {
  id: string
  name: string
  avatar: string
  city: LocalizedText
  joinedAt: string
  profileId: string
  completion: number
  membership: 'free' | 'silver' | 'gold' | 'diamond'
  bio: LocalizedText
}

export interface MockUserRegistration {
  id: string
  eventId: string
  status: 'confirmed' | 'waitlist' | 'completed'
  note: LocalizedText
}

export interface MockUserEventRecord {
  registration: MockUserRegistration
  event: MockEvent
}

export interface MockFavoriteProfile {
  profileId: string
  savedAt: string
  note: LocalizedText
}

export interface MockMessageThread {
  id: string
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: LocalizedText
}

export interface MockPrivacySetting {
  id: string
  enabled: boolean
  title: LocalizedText
  desc: LocalizedText
}

export interface MockFavoriteRecord {
  favorite: MockFavoriteProfile
  profile: MockProfile
}

export interface MockThreadRecord {
  thread: MockMessageThread
  profile: MockProfile
}

export function pickLocalized(locale: AppLocale, text: LocalizedText) {
  return text[locale]
}

export const mockProfiles: MockProfile[] = [
  {
    id: 'p-001',
    name: 'Chloe L.',
    avatar: 'CL',
    age: 29,
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    status: 'open',
    familyVisible: false,
    education: {
      zh: 'ESCP 管理学硕士',
      fr: 'Master en management, ESCP',
      en: 'ESCP Master in Management',
    },
    occupation: {
      zh: '奢侈品牌策略师',
      fr: 'Strategiste de marque luxe',
      en: 'Luxury brand strategist',
    },
    intent: {
      zh: '认真长期关系',
      fr: 'Relation serieuse a long terme',
      en: 'Serious long-term relationship',
    },
    summary: {
      zh: '常驻巴黎，节奏稳定，偏好高质量的小范围社交，希望认识成熟、自洽、具有国际视野的对象。',
      fr: 'Basee a Paris, rythme stable, prefere les petits cercles de qualite et recherche une personne mature et ouverte.',
      en: 'Based in Paris, steady lifestyle, prefers smaller high-quality circles and is looking for someone mature and internationally minded.',
    },
    tags: [
      { zh: '艺术展', fr: 'Expositions', en: 'Art exhibitions' },
      { zh: '法英双语', fr: 'Bilingue FR/EN', en: 'FR/EN bilingual' },
      { zh: '周末晚餐', fr: 'Diners du week-end', en: 'Weekend dinners' },
    ],
    languages: ['FR', 'EN'],
  },
  {
    id: 'p-002',
    name: 'Ning Z.',
    avatar: 'NZ',
    age: 31,
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    status: 'vip',
    familyVisible: true,
    education: {
      zh: '巴黎建筑学院硕士',
      fr: 'Master en architecture a Paris',
      en: 'Paris architecture graduate',
    },
    occupation: {
      zh: '城市空间设计师',
      fr: 'Designer d espaces urbains',
      en: 'Urban spatial designer',
    },
    intent: {
      zh: '婚姻导向',
      fr: 'Orientation mariage',
      en: 'Marriage-oriented',
    },
    summary: {
      zh: '生活和工作都在巴黎，愿意在本人授权下接受适度的家长辅助了解和沟通支持。',
      fr: 'Vie et travail a Paris, ouverte a une participation familiale limitee avec accord explicite.',
      en: 'Lives and works in Paris, and accepts limited family-assisted review when explicitly authorized.',
    },
    tags: [
      { zh: '建筑', fr: 'Architecture', en: 'Architecture' },
      { zh: '家长协助', fr: 'Avec famille', en: 'Family-assisted' },
      { zh: '稳定定居', fr: 'Installation stable', en: 'Settled life' },
    ],
    languages: ['ZH', 'FR', 'EN'],
  },
  {
    id: 'p-003',
    name: 'Vincent H.',
    avatar: 'VH',
    age: 33,
    city: { zh: '里昂', fr: 'Lyon', en: 'Lyon' },
    status: 'open',
    familyVisible: false,
    education: {
      zh: 'HEC 金融硕士',
      fr: 'Master finance, HEC',
      en: 'HEC finance graduate',
    },
    occupation: {
      zh: '并购分析师',
      fr: 'Analyste M&A',
      en: 'M&A analyst',
    },
    intent: {
      zh: '稳定交往到结婚',
      fr: 'Relation stable vers mariage',
      en: 'Stable relationship leading to marriage',
    },
    summary: {
      zh: '工作在里昂，常往返巴黎，重视价值观和执行力，不偏好高频社交。',
      fr: 'Travaille a Lyon, se deplace souvent a Paris, cherche un rythme serieux et privilegie les valeurs partagees.',
      en: 'Works in Lyon, often travels to Paris, prefers a serious pace and values alignment over high-frequency socializing.',
    },
    tags: [
      { zh: '金融', fr: 'Finance', en: 'Finance' },
      { zh: '里昂 / 巴黎', fr: 'Lyon / Paris', en: 'Lyon / Paris' },
      { zh: '认真交往', fr: 'Relation serieuse', en: 'Serious dating' },
    ],
    languages: ['FR', 'EN'],
  },
  {
    id: 'p-004',
    name: 'Sofia R.',
    avatar: 'SR',
    age: 28,
    city: { zh: '日内瓦', fr: 'Geneve', en: 'Geneva' },
    status: 'review',
    familyVisible: true,
    education: {
      zh: '生物医学博士',
      fr: 'Doctorat en biomedecine',
      en: 'PhD in biomedicine',
    },
    occupation: {
      zh: '临床研究经理',
      fr: 'Responsable recherche clinique',
      en: 'Clinical research manager',
    },
    intent: {
      zh: '跨国长期关系',
      fr: 'Relation internationale durable',
      en: 'Cross-border long-term partnership',
    },
    summary: {
      zh: '常驻日内瓦，接受跨城发展，资料审核中，家长仅用于提供背景说明。',
      fr: 'Basee a Geneve, ouverte a une relation entre villes, dossier en cours de verification avec un role familial limite.',
      en: 'Based in Geneva, open to cross-city development, profile is under review, and family only helps provide background context.',
    },
    tags: [
      { zh: '科研', fr: 'Recherche', en: 'Research' },
      { zh: '跨城发展', fr: 'Entre villes', en: 'Cross-city' },
      { zh: '审核中', fr: 'Verification', en: 'Under review' },
    ],
    languages: ['EN', 'FR', 'IT'],
  },
  {
    id: 'p-005',
    name: 'Julien C.',
    avatar: 'JC',
    age: 32,
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    status: 'vip',
    familyVisible: false,
    education: {
      zh: '索邦艺术史硕士',
      fr: 'Histoire de l art, Sorbonne',
      en: 'Sorbonne art history graduate',
    },
    occupation: {
      zh: '博物馆策展人',
      fr: 'Curateur de musee',
      en: 'Museum curator',
    },
    intent: {
      zh: '高匹配度长期伴侣',
      fr: 'Partenaire long terme de haute compatibilite',
      en: 'Highly compatible long-term partner',
    },
    summary: {
      zh: '长期参与巴黎文化展览和小型活动，偏好自然但明确的关系推进方式。',
      fr: 'Travaille dans les expositions parisiennes, prefere un rythme naturel mais clair et participe volontiers aux evenements selectionnes.',
      en: 'Works on exhibitions in Paris, prefers a natural but clear relationship pace, and actively joins selective offline events.',
    },
    tags: [
      { zh: '文化活动', fr: 'Culture', en: 'Culture' },
      { zh: '线下活跃', fr: 'Actif hors ligne', en: 'Offline active' },
      { zh: 'VIP 优先', fr: 'Priorite VIP', en: 'VIP priority' },
    ],
    languages: ['FR', 'EN'],
  },
  {
    id: 'p-006',
    name: 'Aurelie W.',
    avatar: 'AW',
    age: 30,
    city: { zh: '布鲁塞尔', fr: 'Bruxelles', en: 'Brussels' },
    status: 'open',
    familyVisible: true,
    education: {
      zh: '欧洲政策硕士',
      fr: 'Master en politiques europeennes',
      en: 'Master in European policy',
    },
    occupation: {
      zh: '公共事务顾问',
      fr: 'Consultante affaires publiques',
      en: 'Public affairs consultant',
    },
    intent: {
      zh: '明确排他关系',
      fr: 'Relation exclusive claire',
      en: 'Clear exclusive relationship',
    },
    summary: {
      zh: '长期往返布鲁塞尔和巴黎，接受本人主导、家庭补充背景的沟通模式。',
      fr: 'Entre Bruxelles et Paris, a l aise avec une dynamique ou la personne mene la relation et la famille complete le contexte.',
      en: 'Moves between Brussels and Paris, comfortable with user-led dating and family-assisted context only when needed.',
    },
    tags: [
      { zh: '布鲁塞尔', fr: 'Bruxelles', en: 'Brussels' },
      { zh: '公共事务', fr: 'Affaires publiques', en: 'Public affairs' },
      { zh: '家长可见', fr: 'Visible famille', en: 'Family-visible' },
    ],
    languages: ['FR', 'EN', 'NL'],
  },
]

export const mockEvents: MockEvent[] = [
  {
    id: 'e-001',
    date: '2026-04-12',
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    venue: { zh: '左岸私人会客厅', fr: 'Salon prive rive gauche', en: 'Left Bank private salon' },
    status: 'open',
    title: {
      zh: '春季双语沙龙',
      fr: 'Salon bilingue du printemps',
      en: 'Spring bilingual salon',
    },
    format: {
      zh: '12 人主题沙龙',
      fr: 'Salon thematique, 12 personnes',
      en: '12-person themed salon',
    },
    audience: {
      zh: '适合 27-35 岁、希望稳定发展的会员',
      fr: 'Pour 27-35 ans avec intention relationnelle stable',
      en: 'For users aged 27-35 seeking stable development',
    },
    summary: {
      zh: '围绕跨文化关系、工作节奏和城市生活展开小组交流，活动后可进入定向跟进。',
      fr: 'Echanges en petits groupes autour des relations interculturelles, du rythme de travail et de la vie urbaine.',
      en: 'Small-group conversations around intercultural dating, work rhythms, and city life, with targeted follow-up after the event.',
    },
    seats: 12,
    registered: 8,
  },
  {
    id: 'e-002',
    date: '2026-04-18',
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    venue: { zh: '玛黑区私宴空间', fr: 'Table privee au Marais', en: 'Private table in Le Marais' },
    status: 'waitlist',
    title: {
      zh: '左岸晚餐局',
      fr: 'Diner rive gauche',
      en: 'Left Bank dinner gathering',
    },
    format: {
      zh: '8 人精选晚餐',
      fr: 'Diner selectif, 8 personnes',
      en: '8-person curated dinner',
    },
    audience: {
      zh: '以已完成资料审核的会员为主',
      fr: 'Principalement membres verifies',
      en: 'Mainly for profile-verified members',
    },
    summary: {
      zh: '更强调表达、互动和节奏，适合想把线上兴趣转化为线下确认的会员。',
      fr: 'Un format plus intime pour valider en presentiel une premiere compatibilite observee en ligne.',
      en: 'An intimate format for members who want to validate online interest through real-world interaction.',
    },
    seats: 8,
    registered: 8,
  },
  {
    id: 'e-003',
    date: '2026-04-26',
    city: { zh: '布鲁塞尔', fr: 'Bruxelles', en: 'Brussels' },
    venue: { zh: '欧洲区文化空间', fr: 'Espace culturel du quartier europeen', en: 'European Quarter cultural venue' },
    status: 'open',
    title: {
      zh: '文化散步与咖啡交流',
      fr: 'Parcours culturel et cafe',
      en: 'Culture walk and coffee exchange',
    },
    format: {
      zh: '城市散步 + 交流',
      fr: 'Balade urbaine + echanges',
      en: 'City walk plus discussion',
    },
    audience: {
      zh: '适合首次参加平台活动的新会员',
      fr: 'Ideal pour une premiere participation',
      en: 'Good for first-time platform participants',
    },
    summary: {
      zh: '路线和话题都更轻松，适合从资料浏览过渡到第一次真实见面。',
      fr: 'Un format leger pour transformer la navigation de profils en premiere rencontre reelle.',
      en: 'A lighter format designed to turn profile browsing into a first in-person meeting.',
    },
    seats: 16,
    registered: 11,
  },
  {
    id: 'e-004',
    date: '2026-05-03',
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    venue: { zh: '七区顾问会客室', fr: 'Cabinet conseil du 7e', en: 'Advisor room in the 7th arrondissement' },
    status: 'open',
    title: {
      zh: '家长沙龙',
      fr: 'Salon famille',
      en: 'Family salon',
    },
    format: {
      zh: '家长圆桌',
      fr: 'Table ronde famille',
      en: 'Family roundtable',
    },
    audience: {
      zh: '适合需要家长协助理解平台规则与沟通边界的家庭',
      fr: 'Pour les familles souhaitant comprendre les regles et limites de participation',
      en: 'For families who want to understand platform rules and family participation boundaries',
    },
    summary: {
      zh: '聚焦资料协助、沟通方式、边界意识和代际预期，不公开讨论隐私资料。',
      fr: 'Echanges sur l aide au dossier, la communication et les limites, sans exposition de donnees privees.',
      en: 'Focused on dossier support, communication style, and boundaries, without exposing private profile data.',
    },
    seats: 10,
    registered: 5,
  },
  {
    id: 'e-005',
    date: '2026-05-10',
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    venue: { zh: '十六区私宴空间', fr: 'Diner prive dans le 16e', en: 'Private dinner venue in the 16th' },
    status: 'closed',
    title: {
      zh: 'VIP 定向晚餐',
      fr: 'Diner VIP cible',
      en: 'VIP targeted dinner',
    },
    format: {
      zh: '6 人定向匹配晚餐',
      fr: 'Diner VIP cible, 6 personnes',
      en: '6-person targeted VIP dinner',
    },
    audience: {
      zh: '面向已经进入定向匹配流程的 VIP 会员',
      fr: 'Reserve aux membres VIP deja engages dans un matching cible',
      en: 'Reserved for VIP members already in targeted matching flow',
    },
    summary: {
      zh: '已满额，后续申请将转入候补或下一场同类型活动。',
      fr: 'Complet, les demandes suivantes passent en liste d attente ou sur la prochaine edition.',
      en: 'Fully booked, with new applicants moved to the waitlist or next edition.',
    },
    seats: 6,
    registered: 6,
  },
]

export const mockFamilyPrograms: MockFamilyProgram[] = [
  {
    id: 'pp-001',
    date: '2026-04-15',
    city: { zh: '线上', fr: 'En ligne', en: 'Online' },
    mode: { zh: '顾问答疑', fr: 'Q&A conseillere', en: 'Advisor Q&A' },
    status: 'open',
    title: {
      zh: '家长资料审核说明会',
      fr: 'Session famille sur la verification des dossiers',
      en: 'Family briefing on profile review',
    },
    summary: {
      zh: '说明家长可以补充哪些背景信息，以及哪些内容必须由用户本人确认。',
      fr: 'Explication des informations que la famille peut completer et de celles qui doivent rester confirmees par l utilisateur.',
      en: 'Explains what family members may add to a profile and what must remain confirmed by the user directly.',
    },
    seats: 20,
  },
  {
    id: 'pp-002',
    date: '2026-05-03',
    city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
    mode: { zh: '线下沙龙', fr: 'Salon sur place', en: 'In-person salon' },
    status: 'open',
    title: {
      zh: '巴黎家长沙龙',
      fr: 'Salon famille a Paris',
      en: 'Paris family salon',
    },
    summary: {
      zh: '围绕跨文化婚恋、代际沟通和资料协助展开，适合准备参与平台流程的家庭。',
      fr: 'Autour des relations interculturelles, de la communication intergenerationnelle et de l aide au dossier.',
      en: 'Focused on intercultural relationships, intergenerational communication, and dossier support for families entering the platform flow.',
    },
    seats: 10,
  },
  {
    id: 'pp-003',
    date: '2026-05-09',
    city: { zh: '线上', fr: 'En ligne', en: 'Online' },
    mode: { zh: '一对一时段', fr: 'Creneaux individuels', en: 'One-to-one slots' },
    status: 'waitlist',
    title: {
      zh: '家长协助沟通时段',
      fr: 'Creneaux d accompagnement famille',
      en: 'Family-assisted communication slots',
    },
    summary: {
      zh: '适合已经进入候选人沟通阶段的家庭，用于确认沟通边界和信息整理方式。',
      fr: 'Pour les familles deja en phase de communication avec un candidat, afin de cadrer les limites et les informations a partager.',
      en: 'For families already entering candidate conversations, helping define boundaries and what information can be shared.',
    },
    seats: 6,
  },
]

export const mockCurrentUser: MockUserAccount = {
  id: 'u-001',
  name: 'Lin S.',
  avatar: 'LS',
  city: { zh: '巴黎', fr: 'Paris', en: 'Paris' },
  joinedAt: '2026-01-18',
  profileId: 'p-002',
  completion: 82,
  membership: 'gold',
  bio: {
    zh: '当前账号用于演示站点的用户侧浏览路径，包含资料、会员升级和活动报名等 mock 场景。',
    fr: 'Ce compte sert a demontrer le parcours utilisateur avec profil, abonnement et inscriptions mock.',
    en: 'This account is used to demonstrate the user-side browsing flow, including profile setup, membership, and event registrations.',
  },
}

export const mockUserRegistrations: MockUserRegistration[] = [
  {
    id: 'r-001',
    eventId: 'e-001',
    status: 'confirmed',
    note: {
      zh: '已确认席位，可在活动前查看详情与注意事项。',
      fr: 'Place confirmee, avec acces au detail de l evenement avant la date.',
      en: 'Seat confirmed, with access to event details and notes before the date.',
    },
  },
  {
    id: 'r-002',
    eventId: 'e-002',
    status: 'waitlist',
    note: {
      zh: '当前处于候补序列，后续可转正或调整到下一场同类活动。',
      fr: 'Actuellement en liste d attente, avec bascule possible vers la prochaine edition.',
      en: 'Currently on the waitlist, with possible promotion or transfer to the next edition.',
    },
  },
  {
    id: 'r-003',
    eventId: 'e-004',
    status: 'completed',
    note: {
      zh: '已参与完成，可回看家长沙龙说明与后续协助建议。',
      fr: 'Participation terminee, avec recapitulatif et conseils de suivi.',
      en: 'Completed participation, with recap and follow-up guidance available.',
    },
  },
]

export const mockFavoriteProfiles: MockFavoriteProfile[] = [
  {
    profileId: 'p-001',
    savedAt: '2026-03-12',
    note: {
      zh: '已收藏，准备继续看她适合参加哪些线下活动。',
      fr: 'Profil sauvegarde pour voir ensuite les evenements qui lui correspondent.',
      en: 'Saved to review which events and next steps may fit this profile.',
    },
  },
  {
    profileId: 'p-005',
    savedAt: '2026-03-20',
    note: {
      zh: '文化活动方向比较契合，准备后续联系顾问进一步沟通。',
      fr: 'Tres bon alignement culturel, a revoir avec la conseillere.',
      en: 'Strong cultural fit, likely worth discussing with an advisor next.',
    },
  },
]

export const mockMessageThreads: MockMessageThread[] = [
  {
    id: 'm-001',
    profileId: 'p-001',
    updatedAt: '2026-03-26T18:30:00',
    unread: 2,
    lastMessage: {
      zh: '你好，最近巴黎的双语沙龙你会参加吗？',
      fr: 'Bonjour, participeras-tu au salon bilingue de Paris ?',
      en: 'Hi, are you joining the upcoming bilingual salon in Paris?',
    },
  },
  {
    id: 'm-002',
    profileId: 'p-005',
    updatedAt: '2026-03-24T20:10:00',
    unread: 0,
    lastMessage: {
      zh: '我对文化散步活动也很感兴趣。',
      fr: 'Le parcours culturel m interesse aussi beaucoup.',
      en: 'I am also very interested in the culture walk event.',
    },
  },
]

export const mockPrivacySettings: MockPrivacySetting[] = [
  {
    id: 'privacy-contact',
    enabled: true,
    title: {
      zh: '允许顾问联系',
      fr: 'Autoriser le contact conseiller',
      en: 'Allow advisor contact',
    },
    desc: {
      zh: '顾问可在活动、会员升级或资料审核阶段主动联系你。',
      fr: 'La conseillere peut te contacter pour le suivi des evenements, du profil ou de l abonnement.',
      en: 'Advisors may proactively contact you for events, profile review, or membership follow-up.',
    },
  },
  {
    id: 'privacy-family',
    enabled: true,
    title: {
      zh: '允许家长辅助了解',
      fr: 'Autoriser un appui familial limite',
      en: 'Allow limited family-assisted context',
    },
    desc: {
      zh: '在你的授权下，家长可查看有限背景说明，但不能替代你做决定。',
      fr: 'Avec ton accord, la famille peut voir un contexte limite sans jamais remplacer ta decision.',
      en: 'With your permission, family may review limited background context without replacing your decisions.',
    },
  },
  {
    id: 'privacy-visibility',
    enabled: false,
    title: {
      zh: '公开更多资料字段',
      fr: 'Rendre plus de champs visibles',
      en: 'Expose more profile fields',
    },
    desc: {
      zh: '当前关闭，表示部分细节仍需在进一步互动后再开放。',
      fr: 'Desactive pour garder certains champs visibles seulement apres interaction plus avancee.',
      en: 'Disabled, meaning some details remain hidden until interaction goes further.',
    },
  },
]

export function getMockProfileById(id: string) {
  return mockProfiles.find(item => item.id === id)
}

export function getMockEventById(id: string) {
  return mockEvents.find(item => item.id === id)
}

export function getMockFamilyProgramById(id: string) {
  return mockFamilyPrograms.find(item => item.id === id)
}

export function getCurrentMockProfile() {
  return getMockProfileById(mockCurrentUser.profileId)
}

export function getMockUserEvents() {
  return mockUserRegistrations
    .map(registration => {
      const event = getMockEventById(registration.eventId)

      if (!event) {
        return undefined
      }

      return {
        registration,
        event,
      }
    })
    .filter((item): item is MockUserEventRecord => Boolean(item))
}

export function getMockFavorites() {
  return mockFavoriteProfiles
    .map(favorite => {
      const profile = getMockProfileById(favorite.profileId)

      if (!profile) {
        return undefined
      }

      return {
        favorite,
        profile,
      }
    })
    .filter((item): item is MockFavoriteRecord => Boolean(item))
}

export function getMockThreads() {
  return mockMessageThreads
    .map(thread => {
      const profile = getMockProfileById(thread.profileId)

      if (!profile) {
        return undefined
      }

      return {
        thread,
        profile,
      }
    })
    .filter((item): item is MockThreadRecord => Boolean(item))
}
