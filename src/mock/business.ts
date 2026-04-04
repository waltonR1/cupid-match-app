import type { AppLocale } from '@/i18n/types'

import { getMockEventById, type MockEvent } from './events'

export type LocalizedText = Record<AppLocale, string>

export function localized(zh: string, fr: string, en: string): LocalizedText {
  return { zh, fr, en }
}

export type Gender = 'male' | 'female'
export type ProfileStatus = 'open' | 'review' | 'vip'
export type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type RegistrationStatus = 'confirmed' | 'waitlist' | 'completed'
export type MaritalStatus = 'single' | 'divorced' | 'widowed'
export type IntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
export type DegreeLevel = 'bachelor' | 'master' | 'phd'
export type SmokeLevel = 'never' | 'social' | 'often'
export type DrinkLevel = 'never' | 'social' | 'often'

export interface MockProfile {
  id: string
  name: string
  avatar: string

  gender: Gender
  age: number
  height: number

  city: LocalizedText
  country: LocalizedText
  nationality: LocalizedText

  status: ProfileStatus
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string

  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean

  degreeLevel: DegreeLevel
  education: LocalizedText
  occupation: LocalizedText
  industry: LocalizedText
  employer: LocalizedText
  incomeRange: LocalizedText

  maritalStatus: MaritalStatus
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean

  intentCode: IntentionCode
  intent: LocalizedText
  maritalPlan: LocalizedText

  languages: string[]
  smoke: SmokeLevel
  drink: DrinkLevel
  exercise: LocalizedText
  residencePlan: LocalizedText

  summary: LocalizedText
  highlights: LocalizedText[]
  tags: LocalizedText[]
}

export interface MockUserAccount {
  id: string
  name: string
  avatar: string
  city: LocalizedText
  joinedAt: string
  profileId: string
  completion: number
  membership: MembershipLevel
  bio: LocalizedText
}

export interface MockUserRegistration {
  id: string
  eventId: string
  status: RegistrationStatus
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
    gender: 'female',
    age: 29,
    height: 168,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francaise', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-05',
    joinedAt: '2026-01-11',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('ESCP 管理学硕士', 'Master en management, ESCP', 'ESCP Master in Management'),
    occupation: localized('奢侈品牌策略师', 'Strategiste de marque luxe', 'Luxury brand strategist'),
    industry: localized('奢侈品', 'Luxe', 'Luxury'),
    employer: localized('巴黎品牌顾问公司', 'Cabinet de marque a Paris', 'Paris branding consultancy'),
    incomeRange: localized('€50k - €70k', '€50k - €70k', '€50k - €70k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'serious',
    intent: localized('认真长期关系', 'Relation serieuse a long terme', 'Serious long-term relationship'),
    maritalPlan: localized('先认真交往，再考虑婚姻', 'Relation serieuse d abord, mariage ensuite', 'Serious dating first, marriage later'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('瑜伽与慢跑', 'Yoga et jogging', 'Yoga and jogging'),
    residencePlan: localized('长期定居巴黎', 'Projet stable a Paris', 'Long-term Paris settlement'),
    summary: localized(
        '常驻巴黎，节奏稳定，偏好高质量的小范围社交，希望认识成熟、自洽、具有国际视野的对象。',
        'Basee a Paris, rythme stable, prefere les petits cercles de qualite et recherche une personne mature et ouverte.',
        'Based in Paris, steady lifestyle, prefers smaller high-quality circles and is looking for someone mature and internationally minded.'
    ),
    highlights: [
      localized('巴黎常驻', 'Basee a Paris', 'Based in Paris'),
      localized('节奏稳定', 'Rythme stable', 'Stable rhythm'),
      localized('高质量社交', 'Cercles choisis', 'Selective social circle'),
    ],
    tags: [
      localized('艺术展', 'Expositions', 'Art exhibitions'),
      localized('法英双语', 'Bilingue FR/EN', 'FR/EN bilingual'),
      localized('周末晚餐', 'Diners du week-end', 'Weekend dinners'),
    ],
  },
  {
    id: 'p-002',
    name: 'Ning Z.',
    avatar: 'NZ',
    gender: 'female',
    age: 31,
    height: 172,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('中国', 'Chinoise', 'Chinese'),
    status: 'vip',
    isVerified: true,
    lastActiveAt: '2026-04-07',
    joinedAt: '2025-12-22',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: true,
    degreeLevel: 'master',
    education: localized('巴黎建筑学院硕士', 'Master en architecture a Paris', 'Paris architecture graduate'),
    occupation: localized('城市空间设计师', 'Designer d espaces urbains', 'Urban spatial designer'),
    industry: localized('建筑设计', 'Architecture', 'Architecture'),
    employer: localized('巴黎建筑工作室', 'Studio parisien d architecture', 'Paris architecture studio'),
    incomeRange: localized('€60k - €80k', '€60k - €80k', '€60k - €80k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'marriage',
    intent: localized('婚姻导向', 'Orientation mariage', 'Marriage-oriented'),
    maritalPlan: localized('希望 1-2 年内稳定成家', 'Souhaite construire sous 1 a 2 ans', 'Hopes to settle down within 1-2 years'),
    languages: ['ZH', 'FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('普拉提与散步', 'Pilates et marche', 'Pilates and walking'),
    residencePlan: localized('长期定居巴黎', 'Installation durable a Paris', 'Long-term Paris settlement'),
    summary: localized(
        '生活和工作都在巴黎，愿意在本人授权下接受适度的家长辅助了解和沟通支持。',
        'Vie et travail a Paris, ouverte a une participation familiale limitee avec accord explicite.',
        'Lives and works in Paris, and accepts limited family-assisted review when explicitly authorized.'
    ),
    highlights: [
      localized('长期定居巴黎', 'Installee a Paris', 'Settled in Paris'),
      localized('婚姻导向明确', 'Orientation claire', 'Clear marriage intent'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('建筑', 'Architecture', 'Architecture'),
      localized('家长协助', 'Avec famille', 'Family-assisted'),
      localized('稳定定居', 'Installation stable', 'Settled life'),
    ],
  },
  {
    id: 'p-003',
    name: 'Vincent H.',
    avatar: 'VH',
    gender: 'male',
    age: 33,
    height: 181,
    city: localized('里昂', 'Lyon', 'Lyon'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francais', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-04',
    joinedAt: '2025-11-17',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('HEC 金融硕士', 'Master finance, HEC', 'HEC finance graduate'),
    occupation: localized('并购分析师', 'Analyste M&A', 'M&A analyst'),
    industry: localized('金融', 'Finance', 'Finance'),
    employer: localized('里昂投资机构', 'Cabinet d investissement a Lyon', 'Lyon investment firm'),
    incomeRange: localized('€70k - €90k', '€70k - €90k', '€70k - €90k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'serious',
    intent: localized('稳定交往到结婚', 'Relation stable vers mariage', 'Stable relationship leading to marriage'),
    maritalPlan: localized('先稳定交往再进入婚姻', 'Relation stable avant mariage', 'Stable relationship before marriage'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('健身与骑行', 'Salle et velo', 'Gym and cycling'),
    residencePlan: localized('里昂为主，接受巴黎通勤', 'Base a Lyon avec mobilite Paris', 'Based in Lyon with Paris mobility'),
    summary: localized(
        '工作在里昂，常往返巴黎，重视价值观和执行力，不偏好高频社交。',
        'Travaille a Lyon, se deplace souvent a Paris, cherche un rythme serieux et privilegie les valeurs partagees.',
        'Works in Lyon, often travels to Paris, prefers a serious pace and values alignment over high-frequency socializing.'
    ),
    highlights: [
      localized('里昂 / 巴黎双城', 'Lyon / Paris', 'Lyon / Paris'),
      localized('认真关系', 'Relation serieuse', 'Serious relationship'),
      localized('节奏克制', 'Rythme mesure', 'Measured pace'),
    ],
    tags: [
      localized('金融', 'Finance', 'Finance'),
      localized('里昂 / 巴黎', 'Lyon / Paris', 'Lyon / Paris'),
      localized('认真交往', 'Relation serieuse', 'Serious dating'),
    ],
  },
  {
    id: 'p-004',
    name: 'Sofia R.',
    avatar: 'SR',
    gender: 'female',
    age: 28,
    height: 167,
    city: localized('日内瓦', 'Geneve', 'Geneva'),
    country: localized('瑞士', 'Suisse', 'Switzerland'),
    nationality: localized('意大利', 'Italienne', 'Italian'),
    status: 'review',
    isVerified: false,
    lastActiveAt: '2026-04-01',
    joinedAt: '2026-02-03',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: false,
    degreeLevel: 'phd',
    education: localized('生物医学博士', 'Doctorat en biomedecine', 'PhD in biomedicine'),
    occupation: localized('临床研究经理', 'Responsable recherche clinique', 'Clinical research manager'),
    industry: localized('医疗科研', 'Recherche medicale', 'Medical research'),
    employer: localized('日内瓦研究中心', 'Centre de recherche a Geneve', 'Geneva clinical research center'),
    incomeRange: localized('CHF 90k - CHF 120k', 'CHF 90k - CHF 120k', 'CHF 90k - CHF 120k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'cross_border',
    intent: localized('跨国长期关系', 'Relation internationale durable', 'Cross-border long-term partnership'),
    maritalPlan: localized('接受跨城与跨国发展', 'Ouverte a une relation entre villes', 'Open to cross-city development'),
    languages: ['EN', 'FR', 'IT'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('徒步与瑜伽', 'Randonnee et yoga', 'Hiking and yoga'),
    residencePlan: localized('接受瑞士 / 法国双城发展', 'Projet possible entre Suisse et France', 'Open to Switzerland / France dual-city life'),
    summary: localized(
        '常驻日内瓦，接受跨城发展，资料审核中，家长仅用于提供背景说明。',
        'Basee a Geneve, ouverte a une relation entre villes, dossier en cours de verification avec un role familial limite.',
        'Based in Geneva, open to cross-city development, profile is under review, and family only helps provide background context.'
    ),
    highlights: [
      localized('科研背景', 'Recherche', 'Research background'),
      localized('跨城接受度高', 'Ouverte entre villes', 'Open to cross-city'),
      localized('资料审核中', 'Verification', 'Under review'),
    ],
    tags: [
      localized('科研', 'Recherche', 'Research'),
      localized('跨城发展', 'Entre villes', 'Cross-city'),
      localized('审核中', 'Verification', 'Under review'),
    ],
  },
  {
    id: 'p-005',
    name: 'Julien C.',
    avatar: 'JC',
    gender: 'male',
    age: 32,
    height: 179,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francais', 'French'),
    status: 'vip',
    isVerified: true,
    lastActiveAt: '2026-04-06',
    joinedAt: '2025-10-29',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('索邦艺术史硕士', 'Histoire de l art, Sorbonne', 'Sorbonne art history graduate'),
    occupation: localized('博物馆策展人', 'Curateur de musee', 'Museum curator'),
    industry: localized('文化艺术', 'Culture', 'Culture'),
    employer: localized('巴黎博物馆项目组', 'Programme museal parisien', 'Paris museum program'),
    incomeRange: localized('€55k - €75k', '€55k - €75k', '€55k - €75k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'exclusive',
    intent: localized('高匹配度长期伴侣', 'Partenaire long terme de haute compatibilite', 'Highly compatible long-term partner'),
    maritalPlan: localized('更重视关系质量与长期兼容', 'Recherche une compatibilite profonde et durable', 'Values deep compatibility over speed'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('游泳与步行', 'Natation et marche', 'Swimming and walking'),
    residencePlan: localized('长期在巴黎生活', 'Vie durable a Paris', 'Long-term life in Paris'),
    summary: localized(
        '长期参与巴黎文化展览和小型活动，偏好自然但明确的关系推进方式。',
        'Travaille dans les expositions parisiennes, prefere un rythme naturel mais clair et participe volontiers aux evenements selectionnes.',
        'Works on exhibitions in Paris, prefers a natural but clear relationship pace, and actively joins selective offline events.'
    ),
    highlights: [
      localized('文化氛围浓厚', 'Ancrage culturel', 'Culturally rooted'),
      localized('线下活跃', 'Actif hors ligne', 'Offline active'),
      localized('优先资料', 'Profil prioritaire', 'Priority profile'),
    ],
    tags: [
      localized('文化活动', 'Culture', 'Culture'),
      localized('线下活跃', 'Actif hors ligne', 'Offline active'),
      localized('VIP 优先', 'Priorite VIP', 'VIP priority'),
    ],
  },
  {
    id: 'p-006',
    name: 'Aurelie W.',
    avatar: 'AW',
    gender: 'female',
    age: 30,
    height: 170,
    city: localized('布鲁塞尔', 'Bruxelles', 'Brussels'),
    country: localized('比利时', 'Belgique', 'Belgium'),
    nationality: localized('比利时', 'Belge', 'Belgian'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-02',
    joinedAt: '2026-01-07',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('欧洲政策硕士', 'Master en politiques europeennes', 'Master in European policy'),
    occupation: localized('公共事务顾问', 'Consultante affaires publiques', 'Public affairs consultant'),
    industry: localized('公共事务', 'Affaires publiques', 'Public affairs'),
    employer: localized('布鲁塞尔公共事务咨询公司', 'Cabinet affaires publiques a Bruxelles', 'Brussels public affairs consultancy'),
    incomeRange: localized('€55k - €70k', '€55k - €70k', '€55k - €70k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'exclusive',
    intent: localized('明确排他关系', 'Relation exclusive claire', 'Clear exclusive relationship'),
    maritalPlan: localized('先建立信任，再排他发展', 'Construire la confiance avant une relation exclusive', 'Build trust before exclusivity'),
    languages: ['FR', 'EN', 'NL'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('慢跑与普拉提', 'Course legere et pilates', 'Jogging and pilates'),
    residencePlan: localized('布鲁塞尔 / 巴黎双城可协商', 'Projet possible Bruxelles / Paris', 'Open to Brussels / Paris arrangement'),
    summary: localized(
        '长期往返布鲁塞尔和巴黎，接受本人主导、家庭补充背景的沟通模式。',
        'Entre Bruxelles et Paris, a l aise avec une dynamique ou la personne mene la relation et la famille complete le contexte.',
        'Moves between Brussels and Paris, comfortable with user-led dating and family-assisted context only when needed.'
    ),
    highlights: [
      localized('双城生活', 'Entre deux villes', 'Cross-city life'),
      localized('关系目标明确', 'Intention claire', 'Clear intent'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('布鲁塞尔', 'Bruxelles', 'Brussels'),
      localized('公共事务', 'Affaires publiques', 'Public affairs'),
      localized('家长可见', 'Visible famille', 'Family-visible'),
    ],
  },
  {
    id: 'p-007',
    name: 'Camille D.',
    avatar: 'CD',
    gender: 'female',
    age: 27,
    height: 168,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francaise', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-05',
    joinedAt: '2026-01-25',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('传播学硕士', 'Master en communication', 'Master in Communication'),
    occupation: localized('品牌顾问', 'Consultante en marque', 'Brand consultant'),
    industry: localized('品牌咨询', 'Conseil en marque', 'Brand consulting'),
    employer: localized('巴黎创意顾问公司', 'Cabinet creatif a Paris', 'Paris creative consultancy'),
    incomeRange: localized('€45k - €60k', '€45k - €60k', '€45k - €60k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'serious',
    intent: localized('认真长期关系', 'Relation serieuse', 'Serious relationship'),
    maritalPlan: localized('希望 2 年内稳定发展', 'Souhaite une relation stable sous 2 ans', 'Hopes for stable development within 2 years'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('瑜伽与散步', 'Yoga et marche', 'Yoga and walking'),
    residencePlan: localized('偏向巴黎长期生活', 'Projet durable a Paris', 'Prefers long-term Paris life'),
    summary: localized(
        '生活节奏稳定，偏好有边界感和表达能力成熟的关系。',
        'Rythme stable, prefere une relation mature et bien cadree.',
        'Has a steady lifestyle and prefers a mature, well-bounded relationship.'
    ),
    highlights: [
      localized('巴黎常驻', 'Basee a Paris', 'Based in Paris'),
      localized('沟通自然', 'Communication fluide', 'Easy communication'),
      localized('节奏稳定', 'Rythme stable', 'Stable rhythm'),
    ],
    tags: [
      localized('品牌咨询', 'Conseil', 'Consulting'),
      localized('艺术展', 'Expositions', 'Art exhibitions'),
      localized('法英双语', 'Bilingue FR/EN', 'FR/EN bilingual'),
    ],
  },
  {
    id: 'p-008',
    name: 'Leon Y.',
    avatar: 'LY',
    gender: 'male',
    age: 34,
    height: 181,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('中国', 'Chinois', 'Chinese'),
    status: 'vip',
    isVerified: true,
    lastActiveAt: '2026-04-07',
    joinedAt: '2025-12-03',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: true,
    degreeLevel: 'master',
    education: localized('工程管理硕士', 'Master en management de l ingenierie', 'Master in Engineering Management'),
    occupation: localized('科技产品负责人', 'Responsable produit tech', 'Tech product lead'),
    industry: localized('科技', 'Technologie', 'Technology'),
    employer: localized('巴黎科技公司', 'Entreprise tech parisienne', 'Paris tech company'),
    incomeRange: localized('€80k - €110k', '€80k - €110k', '€80k - €110k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'marriage',
    intent: localized('婚姻导向', 'Orientation mariage', 'Marriage-oriented'),
    maritalPlan: localized('希望尽快进入稳定关系', 'Souhaite entrer rapidement dans une relation stable', 'Wants to enter a stable relationship soon'),
    languages: ['ZH', 'FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('跑步与力量训练', 'Course et musculation', 'Running and strength training'),
    residencePlan: localized('长期巴黎定居', 'Projet de vie durable a Paris', 'Long-term Paris settlement'),
    summary: localized(
        '长期在巴黎工作生活，重视价值观、执行力与长期规划。',
        'Vit et travaille a Paris, valorise les valeurs partagees et la projection long terme.',
        'Lives and works in Paris, values aligned principles and long-term planning.'
    ),
    highlights: [
      localized('长期定居', 'Installation stable', 'Settled'),
      localized('婚姻导向', 'Oriente mariage', 'Marriage-oriented'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('科技', 'Tech', 'Tech'),
      localized('稳定定居', 'Vie stable', 'Stable life'),
      localized('优先资料', 'Prioritaire', 'Priority'),
    ],
  },
  {
    id: 'p-009',
    name: 'Emma P.',
    avatar: 'EP',
    gender: 'female',
    age: 30,
    height: 170,
    city: localized('里昂', 'Lyon', 'Lyon'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francaise', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-03',
    joinedAt: '2026-02-14',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('法律硕士', 'Master en droit', 'Master in Law'),
    occupation: localized('企业法务', 'Juriste entreprise', 'Corporate legal counsel'),
    industry: localized('法律', 'Juridique', 'Legal'),
    employer: localized('里昂企业法务部', 'Service juridique lyonnais', 'Lyon legal department'),
    incomeRange: localized('€50k - €65k', '€50k - €65k', '€50k - €65k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'serious',
    intent: localized('稳定交往到结婚', 'Relation stable vers mariage', 'Stable relationship leading to marriage'),
    maritalPlan: localized('先认真交往再考虑婚姻', 'Commencer serieusement puis envisager le mariage', 'Serious dating first, marriage later'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('普拉提', 'Pilates', 'Pilates'),
    residencePlan: localized('里昂为主，接受巴黎发展', 'Lyon en base avec ouverture Paris', 'Lyon-based, open to Paris'),
    summary: localized(
        '偏好稳定节奏，不喜欢高频社交，更看重长期兼容性。',
        'Prefere un rythme stable et valorise la compatibilite de long terme.',
        'Prefers a steady rhythm and values long-term compatibility.'
    ),
    highlights: [
      localized('里昂常驻', 'Basee a Lyon', 'Based in Lyon'),
      localized('认真交往', 'Relation serieuse', 'Serious dating'),
      localized('节奏稳定', 'Rythme stable', 'Stable rhythm'),
    ],
    tags: [
      localized('法律', 'Droit', 'Law'),
      localized('稳定关系', 'Stable', 'Stable'),
      localized('法英双语', 'FR/EN', 'FR/EN'),
    ],
  },
  {
    id: 'p-010',
    name: 'Matteo F.',
    avatar: 'MF',
    gender: 'male',
    age: 31,
    height: 178,
    city: localized('布鲁塞尔', 'Bruxelles', 'Brussels'),
    country: localized('比利时', 'Belgique', 'Belgium'),
    nationality: localized('意大利', 'Italien', 'Italian'),
    status: 'review',
    isVerified: false,
    lastActiveAt: '2026-04-01',
    joinedAt: '2026-02-08',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('国际关系硕士', 'Master en relations internationales', 'Master in International Relations'),
    occupation: localized('政策分析师', 'Analyste politique', 'Policy analyst'),
    industry: localized('公共政策', 'Politiques publiques', 'Public policy'),
    employer: localized('布鲁塞尔智库', 'Think tank a Bruxelles', 'Brussels think tank'),
    incomeRange: localized('€55k - €70k', '€55k - €70k', '€55k - €70k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'cross_border',
    intent: localized('跨国长期关系', 'Relation internationale durable', 'Cross-border long-term relationship'),
    maritalPlan: localized('接受跨城发展', 'Ouvert a une relation entre villes', 'Open to a cross-city relationship'),
    languages: ['EN', 'FR', 'IT'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('跑步', 'Course', 'Running'),
    residencePlan: localized('布鲁塞尔为主，可接受迁移讨论', 'Bruxelles comme base, mobilite discutable', 'Brussels-based, relocation discussable'),
    summary: localized(
        '常驻布鲁塞尔，重视沟通成熟度与现实规划。',
        'Base a Bruxelles, attache a la maturite relationnelle et au realisme.',
        'Based in Brussels, values emotional maturity and realistic planning.'
    ),
    highlights: [
      localized('跨城发展', 'Entre villes', 'Cross-city'),
      localized('资料审核中', 'En verification', 'Under review'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('政策', 'Politique', 'Policy'),
      localized('跨国关系', 'International', 'International'),
      localized('审核中', 'Verification', 'Review'),
    ],
  },
  {
    id: 'p-011',
    name: 'Iris G.',
    avatar: 'IG',
    gender: 'female',
    age: 28,
    height: 166,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francaise', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-06',
    joinedAt: '2026-01-30',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('市场学硕士', 'Master en marketing', 'Master in Marketing'),
    occupation: localized('内容策略经理', 'Responsable strategie de contenu', 'Content strategy manager'),
    industry: localized('媒体营销', 'Medias et marketing', 'Media and marketing'),
    employer: localized('巴黎媒体品牌公司', 'Groupe media parisien', 'Paris media brand group'),
    incomeRange: localized('€45k - €60k', '€45k - €60k', '€45k - €60k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'serious',
    intent: localized('认真长期关系', 'Relation serieuse', 'Serious relationship'),
    maritalPlan: localized('希望节奏自然但明确', 'Souhaite un rythme naturel mais clair', 'Prefers a natural but clear pace'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('瑜伽', 'Yoga', 'Yoga'),
    residencePlan: localized('偏向巴黎长期生活', 'Projet durable a Paris', 'Prefers long-term Paris life'),
    summary: localized(
        '偏好小范围社交，重视沟通和生活观念的匹配。',
        'Prefere les petits cercles et valorise la qualite des echanges.',
        'Prefers smaller circles and values quality communication.'
    ),
    highlights: [
      localized('巴黎工作', 'Travaille a Paris', 'Works in Paris'),
      localized('表达清晰', 'Communication claire', 'Clear communication'),
      localized('认真关系', 'Serieuse', 'Serious minded'),
    ],
    tags: [
      localized('营销', 'Marketing', 'Marketing'),
      localized('内容策划', 'Contenu', 'Content'),
      localized('周末活动', 'Week-end', 'Weekend'),
    ],
  },
  {
    id: 'p-012',
    name: 'Arthur M.',
    avatar: 'AM',
    gender: 'male',
    age: 35,
    height: 183,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francais', 'French'),
    status: 'vip',
    isVerified: true,
    lastActiveAt: '2026-04-07',
    joinedAt: '2025-11-08',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('中央理工硕士', 'Ingenieur Centrale', 'Centrale engineering graduate'),
    occupation: localized('能源项目总监', 'Directeur de projet energie', 'Energy project director'),
    industry: localized('能源', 'Energie', 'Energy'),
    employer: localized('法国能源集团', 'Groupe energie francais', 'French energy group'),
    incomeRange: localized('€100k - €140k', '€100k - €140k', '€100k - €140k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'marriage',
    intent: localized('婚姻导向', 'Orientation mariage', 'Marriage-oriented'),
    maritalPlan: localized('更倾向直接进入严肃关系', 'Souhaite rapidement une relation stable', 'Leans toward serious commitment relatively quickly'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('游泳与网球', 'Natation et tennis', 'Swimming and tennis'),
    residencePlan: localized('长期巴黎定居', 'Projet durable a Paris', 'Long-term Paris settlement'),
    summary: localized(
        '职业稳定，生活规律，偏好成熟理性的长期关系。',
        'Situation stable, rythme regulier, prefere une relation mature et durable.',
        'Stable career, regular lifestyle, prefers a mature long-term relationship.'
    ),
    highlights: [
      localized('职业稳定', 'Situation stable', 'Stable career'),
      localized('婚姻导向', 'Mariage', 'Marriage-oriented'),
      localized('优先资料', 'Prioritaire', 'Priority'),
    ],
    tags: [
      localized('能源', 'Energie', 'Energy'),
      localized('工程背景', 'Ingenierie', 'Engineering'),
      localized('长期关系', 'Long terme', 'Long term'),
    ],
  },
  {
    id: 'p-013',
    name: 'Mila S.',
    avatar: 'MS',
    gender: 'female',
    age: 27,
    height: 165,
    city: localized('日内瓦', 'Geneve', 'Geneva'),
    country: localized('瑞士', 'Suisse', 'Switzerland'),
    nationality: localized('瑞士', 'Suisse', 'Swiss'),
    status: 'review',
    isVerified: false,
    lastActiveAt: '2026-04-02',
    joinedAt: '2026-02-19',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('国际商务硕士', 'Master en commerce international', 'Master in International Business'),
    occupation: localized('医药商务经理', 'Responsable business pharma', 'Pharma business manager'),
    industry: localized('医药', 'Pharmaceutique', 'Pharmaceutical'),
    employer: localized('日内瓦医药企业', 'Entreprise pharma a Geneve', 'Geneva pharmaceutical company'),
    incomeRange: localized('CHF 80k - CHF 100k', 'CHF 80k - CHF 100k', 'CHF 80k - CHF 100k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'cross_border',
    intent: localized('跨国长期关系', 'Relation internationale durable', 'Cross-border long-term relationship'),
    maritalPlan: localized('接受跨城市定居协商', 'Ouverte a un projet de vie entre villes', 'Open to cross-city life planning'),
    languages: ['EN', 'FR', 'DE'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('普拉提与徒步', 'Pilates et randonnee', 'Pilates and hiking'),
    residencePlan: localized('瑞士 / 法国均可协商', 'Suisse / France discutable', 'Open to Switzerland / France arrangement'),
    summary: localized(
        '重视现实规划和生活秩序，希望关系发展稳定清晰。',
        'Valorise la clarte et la stabilite dans le developpement relationnel.',
        'Values clarity and stability in relationship development.'
    ),
    highlights: [
      localized('跨国接受度高', 'Tres ouverte a l international', 'Internationally open'),
      localized('资料审核中', 'En verification', 'Under review'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('医药', 'Pharma', 'Pharma'),
      localized('国际商务', 'International', 'International'),
      localized('审核中', 'Verification', 'Review'),
    ],
  },
  {
    id: 'p-014',
    name: 'Theo B.',
    avatar: 'TB',
    gender: 'male',
    age: 29,
    height: 180,
    city: localized('布鲁塞尔', 'Bruxelles', 'Brussels'),
    country: localized('比利时', 'Belgique', 'Belgium'),
    nationality: localized('比利时', 'Belge', 'Belgian'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-03',
    joinedAt: '2026-01-18',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('经济学硕士', 'Master en economie', 'Master in Economics'),
    occupation: localized('数据经济分析师', 'Analyste economique data', 'Economic data analyst'),
    industry: localized('咨询', 'Conseil', 'Consulting'),
    employer: localized('布鲁塞尔咨询机构', 'Cabinet de conseil a Bruxelles', 'Brussels consulting firm'),
    incomeRange: localized('€50k - €65k', '€50k - €65k', '€50k - €65k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'exclusive',
    intent: localized('明确排他关系', 'Relation exclusive claire', 'Clear exclusive relationship'),
    maritalPlan: localized('希望循序渐进但方向明确', 'Souhaite un rythme progressif mais clair', 'Prefers a gradual but clear progression'),
    languages: ['FR', 'EN', 'NL'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('骑行与游泳', 'Velo et natation', 'Cycling and swimming'),
    residencePlan: localized('布鲁塞尔为主，开放跨城', 'Bruxelles en base, ouvert entre villes', 'Brussels-based, open to cross-city'),
    summary: localized(
        '偏理性，重视双方节奏与价值观的匹配。',
        'Profil rationnel qui valorise l alignement de rythme et de valeurs.',
        'More rational in temperament and values aligned rhythm and principles.'
    ),
    highlights: [
      localized('布鲁塞尔常驻', 'Base a Bruxelles', 'Based in Brussels'),
      localized('理性稳重', 'Profil stable', 'Steady personality'),
      localized('方向明确', 'Direction claire', 'Clear direction'),
    ],
    tags: [
      localized('经济学', 'Economie', 'Economics'),
      localized('咨询', 'Conseil', 'Consulting'),
      localized('排他关系', 'Exclusif', 'Exclusive'),
    ],
  },
  {
    id: 'p-015',
    name: 'Selena Q.',
    avatar: 'SQ',
    gender: 'female',
    age: 30,
    height: 169,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('中国', 'Chinoise', 'Chinese'),
    status: 'vip',
    isVerified: true,
    lastActiveAt: '2026-04-08',
    joinedAt: '2025-12-14',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: true,
    degreeLevel: 'master',
    education: localized('金融工程硕士', 'Master en ingenierie financiere', 'Master in Financial Engineering'),
    occupation: localized('资产配置顾问', 'Conseillere allocation d actifs', 'Asset allocation advisor'),
    industry: localized('金融', 'Finance', 'Finance'),
    employer: localized('巴黎私人财富机构', 'Maison de gestion de patrimoine a Paris', 'Paris private wealth firm'),
    incomeRange: localized('€80k - €110k', '€80k - €110k', '€80k - €110k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'marriage',
    intent: localized('婚姻导向', 'Orientation mariage', 'Marriage-oriented'),
    maritalPlan: localized('未来 1-2 年内考虑成家', 'Envisage de fonder une famille sous 1 a 2 ans', 'Considering marriage within 1-2 years'),
    languages: ['ZH', 'FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('普拉提与慢跑', 'Pilates et jogging', 'Pilates and jogging'),
    residencePlan: localized('巴黎长期定居', 'Projet durable a Paris', 'Long-term Paris settlement'),
    summary: localized(
        '工作成熟、生活规律，接受适度家庭参与，但本人决策明确。',
        'Vie reglee, travail solide, accepte une participation familiale limitee tout en gardant sa decision propre.',
        'Has a stable life and work rhythm, accepts limited family involvement while keeping clear personal agency.'
    ),
    highlights: [
      localized('巴黎金融行业', 'Finance parisienne', 'Paris finance sector'),
      localized('婚姻导向', 'Oriente mariage', 'Marriage-oriented'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('金融', 'Finance', 'Finance'),
      localized('稳定生活', 'Stable', 'Stable'),
      localized('优先资料', 'Prioritaire', 'Priority'),
    ],
  },
  {
    id: 'p-016',
    name: 'Remi K.',
    avatar: 'RK',
    gender: 'male',
    age: 32,
    height: 182,
    city: localized('里昂', 'Lyon', 'Lyon'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francais', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-06',
    joinedAt: '2026-01-12',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('供应链管理硕士', 'Master en supply chain', 'Master in Supply Chain Management'),
    occupation: localized('运营负责人', 'Responsable operations', 'Operations lead'),
    industry: localized('工业制造', 'Industrie', 'Industrial operations'),
    employer: localized('里昂工业集团', 'Groupe industriel lyonnais', 'Lyon industrial group'),
    incomeRange: localized('€60k - €80k', '€60k - €80k', '€60k - €80k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'serious',
    intent: localized('稳定交往到结婚', 'Relation stable vers mariage', 'Stable relationship leading to marriage'),
    maritalPlan: localized('希望稳步推进，不追求高频试错', 'Prefere une progression stable sans multiplication des essais', 'Prefers steady progress over rapid trial-and-error dating'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('健身与徒步', 'Salle et randonnee', 'Gym and hiking'),
    residencePlan: localized('里昂为主，接受跨城', 'Base a Lyon, ouvert entre villes', 'Lyon-based, open to cross-city'),
    summary: localized(
        '生活规律，重视可靠性、责任感与长期生活节奏的兼容。',
        'Valorise la fiabilite, le sens des responsabilites et la compatibilite de vie.',
        'Values reliability, responsibility, and long-term lifestyle compatibility.'
    ),
    highlights: [
      localized('里昂常驻', 'Base a Lyon', 'Based in Lyon'),
      localized('稳重务实', 'Pragmatique', 'Practical and steady'),
      localized('长期关系', 'Long terme', 'Long-term minded'),
    ],
    tags: [
      localized('供应链', 'Supply chain', 'Supply chain'),
      localized('责任感', 'Responsable', 'Responsible'),
      localized('规律生活', 'Vie reglee', 'Structured lifestyle'),
    ],
  },
  {
    id: 'p-017',
    name: 'Elise T.',
    avatar: 'ET',
    gender: 'female',
    age: 26,
    height: 164,
    city: localized('巴黎', 'Paris', 'Paris'),
    country: localized('法国', 'France', 'France'),
    nationality: localized('法国', 'Francaise', 'French'),
    status: 'review',
    isVerified: false,
    lastActiveAt: '2026-04-01',
    joinedAt: '2026-02-27',
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('设计硕士', 'Master en design', 'Master in Design'),
    occupation: localized('视觉设计师', 'Designer visuelle', 'Visual designer'),
    industry: localized('创意设计', 'Creation', 'Creative design'),
    employer: localized('巴黎创意工作室', 'Studio creatif parisien', 'Paris design studio'),
    incomeRange: localized('€38k - €50k', '€38k - €50k', '€38k - €50k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: false,
    intentCode: 'exclusive',
    intent: localized('明确排他关系', 'Relation exclusive claire', 'Clear exclusive relationship'),
    maritalPlan: localized('先建立高质量相处，再考虑长期', 'Construire une relation de qualite avant le long terme', 'Build a high-quality bond before long-term commitment'),
    languages: ['FR', 'EN'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('舞蹈与瑜伽', 'Danse et yoga', 'Dance and yoga'),
    residencePlan: localized('巴黎为主', 'Paris comme base', 'Paris-based'),
    summary: localized(
        '偏安静克制，喜欢审美一致、节奏舒适的关系。',
        'Profil discret, prefere une relation esthetiquement et humainement coherente.',
        'Quiet and measured, prefers a relationship with aesthetic and emotional coherence.'
    ),
    highlights: [
      localized('审美一致感强', 'Sens esthetique', 'Strong aesthetic sense'),
      localized('安静克制', 'Discrete', 'Reserved'),
      localized('资料审核中', 'En verification', 'Under review'),
    ],
    tags: [
      localized('设计', 'Design', 'Design'),
      localized('排他关系', 'Exclusif', 'Exclusive'),
      localized('审核中', 'Verification', 'Review'),
    ],
  },
  {
    id: 'p-018',
    name: 'Hugo N.',
    avatar: 'HN',
    gender: 'male',
    age: 33,
    height: 184,
    city: localized('日内瓦', 'Geneve', 'Geneva'),
    country: localized('瑞士', 'Suisse', 'Switzerland'),
    nationality: localized('法国', 'Francais', 'French'),
    status: 'open',
    isVerified: true,
    lastActiveAt: '2026-04-07',
    joinedAt: '2025-12-28',
    familyVisible: true,
    allowFamilyContact: true,
    familyPriority: false,
    degreeLevel: 'master',
    education: localized('应用数学硕士', 'Master en mathematiques appliquees', 'Master in Applied Mathematics'),
    occupation: localized('量化研究员', 'Chercheur quantitatif', 'Quant researcher'),
    industry: localized('金融科技', 'Finance quantitative', 'Quant finance'),
    employer: localized('日内瓦量化基金', 'Fonds quantitatif a Geneve', 'Geneva quant fund'),
    incomeRange: localized('CHF 110k - CHF 150k', 'CHF 110k - CHF 150k', 'CHF 110k - CHF 150k'),
    maritalStatus: 'single',
    hasChildren: false,
    wantChildren: true,
    acceptLongDistance: true,
    intentCode: 'exclusive',
    intent: localized('高匹配度长期伴侣', 'Partenaire long terme tres compatible', 'Highly compatible long-term partner'),
    maritalPlan: localized('重视长期相处的理性兼容', 'Recherche une compatibilite profonde et durable', 'Values deep long-term compatibility'),
    languages: ['EN', 'FR'],
    smoke: 'never',
    drink: 'social',
    exercise: localized('滑雪与游泳', 'Ski et natation', 'Skiing and swimming'),
    residencePlan: localized('接受日内瓦 / 巴黎讨论', 'Ouvert a Geneve / Paris', 'Open to Geneva / Paris arrangement'),
    summary: localized(
        '偏理性但不冷淡，重视生活秩序、沟通边界与长期兼容。',
        'Profil rationnel mais chaleureux, attache a l ordre de vie et a la compatibilite durable.',
        'Rational but not cold, values life structure, communication boundaries, and durable compatibility.'
    ),
    highlights: [
      localized('日内瓦常驻', 'Base a Geneve', 'Based in Geneva'),
      localized('理性兼容', 'Compatibilite rationnelle', 'Rational compatibility'),
      localized('家庭可见', 'Visible famille', 'Family-visible'),
    ],
    tags: [
      localized('量化', 'Quant', 'Quant'),
      localized('长期关系', 'Long terme', 'Long term'),
      localized('边界清晰', 'Cadre clair', 'Clear boundaries'),
    ],
  },
]

export const mockCurrentUser: MockUserAccount = {
  id: 'u-001',
  name: 'Lin S.',
  avatar: 'LS',
  city: localized('巴黎', 'Paris', 'Paris'),
  joinedAt: '2026-01-18',
  profileId: 'p-002',
  completion: 82,
  membership: 'gold',
  bio: localized(
      '当前账号用于演示站点的用户侧浏览路径，包含资料、会员升级和活动报名等 mock 场景。',
      'Ce compte sert a demontrer le parcours utilisateur avec profil, abonnement et inscriptions mock.',
      'This account is used to demonstrate the user-side browsing flow, including profile setup, membership, and event registrations.'
  ),
}

export const mockUserRegistrations: MockUserRegistration[] = [
  {
    id: 'r-001',
    eventId: 'e-001',
    status: 'confirmed',
    note: localized(
        '已确认席位，可在活动前查看详情与注意事项。',
        'Place confirmee, avec acces au detail de l evenement avant la date.',
        'Seat confirmed, with access to event details and notes before the date.'
    ),
  },
  {
    id: 'r-002',
    eventId: 'e-002',
    status: 'waitlist',
    note: localized(
        '当前处于候补序列，后续可转正或调整到下一场同类活动。',
        'Actuellement en liste d attente, avec bascule possible vers la prochaine edition.',
        'Currently on the waitlist, with possible promotion or transfer to the next edition.'
    ),
  },
  {
    id: 'r-003',
    eventId: 'e-004',
    status: 'completed',
    note: localized(
        '已参与完成，可回看家长沙龙说明与后续协助建议。',
        'Participation terminee, avec recapitulatif et conseils de suivi.',
        'Completed participation, with recap and follow-up guidance available.'
    ),
  },
]

export const mockFavoriteProfiles: MockFavoriteProfile[] = [
  {
    profileId: 'p-001',
    savedAt: '2026-03-12',
    note: localized(
        '已收藏，准备继续看她适合参加哪些线下活动。',
        'Profil sauvegarde pour voir ensuite les evenements qui lui correspondent.',
        'Saved to review which events and next steps may fit this profile.'
    ),
  },
  {
    profileId: 'p-005',
    savedAt: '2026-03-20',
    note: localized(
        '文化活动方向比较契合，准备后续联系顾问进一步沟通。',
        'Tres bon alignement culturel, a revoir avec la conseillere.',
        'Strong cultural fit, likely worth discussing with an advisor next.'
    ),
  },
]

export const mockMessageThreads: MockMessageThread[] = [
  {
    id: 'm-001',
    profileId: 'p-001',
    updatedAt: '2026-03-26T18:30:00',
    unread: 2,
    lastMessage: localized(
        '你好，最近巴黎的双语沙龙你会参加吗？',
        'Bonjour, participeras-tu au salon bilingue de Paris ?',
        'Hi, are you joining the upcoming bilingual salon in Paris?'
    ),
  },
  {
    id: 'm-002',
    profileId: 'p-005',
    updatedAt: '2026-03-24T20:10:00',
    unread: 0,
    lastMessage: localized(
        '我对文化散步活动也很感兴趣。',
        'Le parcours culturel m interesse aussi beaucoup.',
        'I am also very interested in the culture walk event.'
    ),
  },
]

export const mockPrivacySettings: MockPrivacySetting[] = [
  {
    id: 'privacy-contact',
    enabled: true,
    title: localized('允许顾问联系', 'Autoriser le contact conseiller', 'Allow advisor contact'),
    desc: localized(
        '顾问可在活动、会员升级或资料审核阶段主动联系你。',
        'La conseillere peut te contacter pour le suivi des evenements, du profil ou de l abonnement.',
        'Advisors may proactively contact you for events, profile review, or membership follow-up.'
    ),
  },
  {
    id: 'privacy-family',
    enabled: true,
    title: localized('允许家长辅助了解', 'Autoriser un appui familial limite', 'Allow limited family-assisted context'),
    desc: localized(
        '在你的授权下，家长可查看有限背景说明，但不能替代你做决定。',
        'Avec ton accord, la famille peut voir un contexte limite sans jamais remplacer ta decision.',
        'With your permission, family may review limited background context without replacing your decisions.'
    ),
  },
  {
    id: 'privacy-visibility',
    enabled: false,
    title: localized('公开更多资料字段', 'Rendre plus de champs visibles', 'Expose more profile fields'),
    desc: localized(
        '当前关闭，表示部分细节仍需在进一步互动后再开放。',
        'Desactive pour garder certains champs visibles seulement apres interaction plus avancee.',
        'Disabled, meaning some details remain hidden until interaction goes further.'
    ),
  },
]

export function getMockProfileById(id: string) {
  return mockProfiles.find(item => item.id === id)
}

export function getCurrentMockProfile() {
  return getMockProfileById(mockCurrentUser.profileId)
}

export function getMockUserEvents() {
  return mockUserRegistrations
      .map(registration => {
        const event = getMockEventById(registration.eventId)
        if (!event) return undefined
        return { registration, event }
      })
      .filter((item): item is MockUserEventRecord => Boolean(item))
}

export function getMockFavorites() {
  return mockFavoriteProfiles
      .map(favorite => {
        const profile = getMockProfileById(favorite.profileId)
        if (!profile) return undefined
        return { favorite, profile }
      })
      .filter((item): item is MockFavoriteRecord => Boolean(item))
}

export function getMockThreads() {
  return mockMessageThreads
      .map(thread => {
        const profile = getMockProfileById(thread.profileId)
        if (!profile) return undefined
        return { thread, profile }
      })
      .filter((item): item is MockThreadRecord => Boolean(item))
}

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedText> = {
  FR: localized('法语', 'Francais', 'French'),
  EN: localized('英语', 'Anglais', 'English'),
  ZH: localized('中文', 'Chinois', 'Chinese'),
  NL: localized('荷兰语', 'Neerlandais', 'Dutch'),
  IT: localized('意大利语', 'Italien', 'Italian'),
  DE: localized('德语', 'Allemand', 'German'),
}

export interface LocalizedChoiceOption {
  label: string
  value: string
}

export function getLocalizedLanguageLabel(locale: AppLocale, language: string) {
  const label = PROFILE_LANGUAGE_LABELS[String(language || '').trim()]
  if (!label) return String(language || '').trim()
  return pickLocalized(locale, label)
}

function formatProfileDirectoryMeta(locale: AppLocale, profile: MockProfile) {
  const occupation = pickLocalized(locale, profile.occupation)

  if (locale === 'zh') return `${profile.age}岁 · ${occupation}`
  if (locale === 'fr') return `${profile.age} ans · ${occupation}`
  return `${profile.age} · ${occupation}`
}

function formatProfileDirectoryLanguages(locale: AppLocale, languages: string[]) {
  return languages
      .map(language => getLocalizedLanguageLabel(locale, language))
      .join(' / ')
}

export interface LocalizedProfileCardData {
  id: string
  name: string
  avatar: string
  meta: string
  goalCode: IntentionCode
  status: ProfileStatus
  summary: string
  facts: {
    city: string
    education: string
    languages: string
  }
  tags: string[]
}

export function getLocalizedProfileCardData(
    locale: AppLocale,
    profile: MockProfile,
): LocalizedProfileCardData {
  return {
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar,
    meta: formatProfileDirectoryMeta(locale, profile),
    goalCode: profile.intentCode,
    status: profile.status,
    summary: pickLocalized(locale, profile.summary),
    facts: {
      city: pickLocalized(locale, profile.city),
      education: pickLocalized(locale, profile.education),
      languages: formatProfileDirectoryLanguages(locale, profile.languages),
    },
    tags: profile.tags
        .slice(0, 3)
        .map(item => pickLocalized(locale, item)),
  }
}

export function getLocalizedProfileOptions(
    locale: AppLocale,
    getter: (profile: MockProfile) => LocalizedText,
) {
  const values = new Set<string>()

  mockProfiles.forEach(profile => {
    const value = pickLocalized(locale, getter(profile)).trim()
    if (!value) return
    values.add(value)
  })

  return Array.from(values).sort((a, b) => a.localeCompare(b))
}

export function getLocalizedIntentOptions(locale: AppLocale) {
  const seen = new Set<string>()

  return mockProfiles
      .map(profile => ({
        code: profile.intentCode,
        label: pickLocalized(locale, profile.intent),
      }))
      .filter(item => {
        if (!item.code || !item.label) return false
        if (seen.has(item.code)) return false
        seen.add(item.code)
        return true
      })
}

export function getLocalizedLanguageOptions(locale: AppLocale): LocalizedChoiceOption[] {
  const values = new Set<string>()

  mockProfiles.forEach(profile => {
    profile.languages.forEach(language => {
      const value = String(language || '').trim()
      if (!value) return
      values.add(value)
    })
  })

  return Array.from(values)
      .sort((a, b) => getLocalizedLanguageLabel(locale, a).localeCompare(getLocalizedLanguageLabel(locale, b)))
      .map(value => ({
        label: getLocalizedLanguageLabel(locale, value),
        value,
      }))
}

const HOME_PROFILE_PREVIEW_IDS = ['p-002', 'p-005', 'p-006'] as const

export function getHomePreviewProfiles() {
  return HOME_PROFILE_PREVIEW_IDS
      .map(id => getMockProfileById(id))
      .filter((item): item is MockProfile => Boolean(item))
}
