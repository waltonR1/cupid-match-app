import { localized, type LocalizedText } from './shared'

export type EventStatus = 'open' | 'waitlist' | 'closed'

export interface MockEvent {
  id: string
  date: string
  city: LocalizedText
  venue: LocalizedText
  status: EventStatus
  title: LocalizedText
  format: LocalizedText
  audience: LocalizedText
  summary: LocalizedText
  seats: number
  registered: number
}

export const mockEvents: MockEvent[] = [
  {
    id: 'e-001',
    date: '2026-04-12',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('左岸私人会客厅', 'Salon prive rive gauche', 'Left Bank private salon'),
    status: 'open',
    title: localized('春季双语沙龙', 'Salon bilingue du printemps', 'Spring bilingual salon'),
    format: localized('12 人主题沙龙', 'Salon thematique, 12 personnes', '12-person themed salon'),
    audience: localized('适合 27-35 岁、希望稳定发展的会员', 'Pour 27-35 ans avec intention relationnelle stable', 'For users aged 27-35 seeking stable development'),
    summary: localized(
      '围绕跨文化关系、工作节奏和城市生活展开小组交流，活动后可进入定向跟进。',
      'Echanges en petits groupes autour des relations interculturelles, du rythme de travail et de la vie urbaine.',
      'Small-group conversations around intercultural dating, work rhythms, and city life, with targeted follow-up after the event.',
    ),
    seats: 12,
    registered: 8,
  },
  {
    id: 'e-002',
    date: '2026-04-18',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('玛黑区私宴空间', 'Table privee au Marais', 'Private table in Le Marais'),
    status: 'waitlist',
    title: localized('左岸晚餐局', 'Diner rive gauche', 'Left Bank dinner gathering'),
    format: localized('8 人精选晚餐', 'Diner selectif, 8 personnes', '8-person curated dinner'),
    audience: localized('以已完成资料审核的会员为主', 'Principalement membres verifies', 'Mainly for profile-verified members'),
    summary: localized(
      '更强调表达、互动和节奏，适合想把线上兴趣转化为线下确认的会员。',
      'Un format plus intime pour valider en presentiel une premiere compatibilite observee en ligne.',
      'An intimate format for members who want to validate online interest through real-world interaction.',
    ),
    seats: 8,
    registered: 8,
  },
  {
    id: 'e-003',
    date: '2026-04-26',
    city: localized('布鲁塞尔', 'Bruxelles', 'Brussels'),
    venue: localized('欧洲区文化空间', 'Espace culturel du quartier europeen', 'European Quarter cultural venue'),
    status: 'open',
    title: localized('文化散步与咖啡交流', 'Parcours culturel et cafe', 'Culture walk and coffee exchange'),
    format: localized('城市散步 + 交流', 'Balade urbaine + echanges', 'City walk plus discussion'),
    audience: localized('适合首次参加平台活动的新会员', 'Ideal pour une premiere participation', 'Good for first-time platform participants'),
    summary: localized(
      '路线和话题都更轻松，适合从资料浏览过渡到第一次真实见面。',
      'Un format leger pour transformer la navigation de profils en premiere rencontre reelle.',
      'A lighter format designed to turn profile browsing into a first in-person meeting.',
    ),
    seats: 16,
    registered: 11,
  },
  {
    id: 'e-004',
    date: '2026-05-03',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('七区顾问会客室', 'Cabinet conseil du 7e', 'Advisor room in the 7th arrondissement'),
    status: 'open',
    title: localized('家长沙龙', 'Salon famille', 'Family salon'),
    format: localized('家长圆桌', 'Table ronde famille', 'Family roundtable'),
    audience: localized('适合需要家长协助理解平台规则与沟通边界的家庭', 'Pour les familles souhaitant comprendre les regles et limites de participation', 'For families who want to understand platform rules and family participation boundaries'),
    summary: localized(
      '聚焦资料协助、沟通方式、边界意识和代际预期，不公开讨论隐私资料。',
      'Echanges sur l aide au dossier, la communication et les limites, sans exposition de donnees privees.',
      'Focused on dossier support, communication style, and boundaries, without exposing private profile data.',
    ),
    seats: 10,
    registered: 5,
  },
  {
    id: 'e-005',
    date: '2026-05-10',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('十六区私宴空间', 'Diner prive dans le 16e', 'Private dinner venue in the 16th'),
    status: 'closed',
    title: localized('VIP 定向晚餐', 'Diner VIP cible', 'VIP targeted dinner'),
    format: localized('6 人定向匹配晚餐', 'Diner VIP cible, 6 personnes', '6-person targeted VIP dinner'),
    audience: localized('面向已经进入定向匹配流程的 VIP 会员', 'Reserve aux membres VIP deja engages dans un matching cible', 'Reserved for VIP members already in targeted matching flow'),
    summary: localized(
      '已满额，后续申请将转入候补或下一场同类型活动。',
      'Complet, les demandes suivantes passent en liste d attente ou sur la prochaine edition.',
      'Fully booked, with new applicants moved to the waitlist or next edition.',
    ),
    seats: 6,
    registered: 6,
  },
]

export function getMockEventById(id: string) {
  return mockEvents.find(item => item.id === id)
}
