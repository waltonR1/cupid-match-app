import { localized } from '@/mock/shared'
import type { MockEvent } from '@/mock/types/events'

export type { EventStatus, MockEvent, MockEventAgendaItem } from '@/mock/types/events'

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
    agenda: [
      {
        time: '18:30 - 19:00',
        title: localized('签到与顾问引导', 'Accueil et cadrage conseiller', 'Check-in and advisor orientation'),
        desc: localized(
          '确认到场信息，完成简短破冰，并由顾问说明当晚的交流节奏和轮换规则。',
          'Verification des arrivées, brise-glace court, puis cadrage du rythme et des rotations par la conseillere.',
          'Arrival check-in, a short warm-up, and advisor guidance on the evening pace and rotation format.',
        ),
      },
      {
        time: '19:00 - 19:40',
        title: localized('主题分组交流', 'Echanges thematiques en petits groupes', 'Small-group themed exchange'),
        desc: localized(
          '围绕跨文化关系、城市生活与工作节奏展开小范围对话，观察表达方式与价值观匹配。',
          'Conversations en petits groupes autour des relations interculturelles, du rythme de travail et de la vie urbaine.',
          'Small-group conversations around intercultural dating, work rhythm, and city life to observe values and communication style.',
        ),
      },
      {
        time: '19:45 - 20:20',
        title: localized('定向轮换互动', 'Rotation ciblee', 'Curated rotation round'),
        desc: localized(
          '根据现场反馈进入更聚焦的轮换阶段，让有进一步兴趣的人获得更完整的交流时间。',
          'Une seconde rotation plus ciblee permet aux profils avec interet mutuel d avoir un temps de conversation plus complet.',
          'A more focused second rotation gives mutually interested attendees more complete interaction time.',
        ),
      },
      {
        time: '20:20 - 21:00',
        title: localized('自由延展与意向记录', 'Extension libre et recueil des intentions', 'Open mingling and next-step capture'),
        desc: localized(
          '进入更自然的自由交流阶段，顾问会在结束后整理意向并安排后续跟进。',
          'Temps libre d interaction, puis recueil des intentions pour un suivi conseiller apres la soiree.',
          'A freer mingling window followed by advisor-led capture of intentions for next-step follow-up.',
        ),
      },
    ],
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
    agenda: [
      {
        time: '19:00 - 19:25',
        title: localized('到场与席位安排', 'Accueil et placement', 'Arrival and table placement'),
        desc: localized(
          '根据晚餐席位安排入座，顾问会先说明当晚的交流边界和晚餐节奏。',
          'Placement à table selon la configuration prévue, avec rappel du cadre d échange par la conseillère.',
          'Guests are seated according to the dinner plan, with a short advisor briefing on the tone and boundaries of the evening.',
        ),
      },
      {
        time: '19:25 - 20:05',
        title: localized('第一轮主题对谈', 'Premier tour de conversation', 'First guided conversation round'),
        desc: localized(
          '围绕关系期待、生活节奏和线下互动偏好展开第一轮对谈，重点看自然表达是否匹配。',
          'Premier échange autour des attentes relationnelles, du rythme de vie et de l aisance en présentiel.',
          'The first round focuses on relationship expectations, lifestyle rhythm, and in-person ease.',
        ),
      },
      {
        time: '20:05 - 20:45',
        title: localized('晚餐互动与席位微调', 'Diner et ajustements de table', 'Dinner interaction and table refinement'),
        desc: localized(
          '进入更自然的互动阶段，顾问会根据现场反馈微调席位，让对话更顺畅。',
          'Le dîner permet une interaction plus naturelle, avec quelques ajustements de table selon les retours observés.',
          'Dinner creates a more organic interaction window, with light seating adjustments based on live observations.',
        ),
      },
      {
        time: '20:45 - 21:15',
        title: localized('结束确认与候补跟进', 'Cloture et suivi', 'Closing review and waitlist follow-up'),
        desc: localized(
          '当晚结束后整理意向，候补用户会结合席位变化和匹配度继续跟进。',
          'En fin de soirée, les intentions sont consolidées et la liste d attente reste suivie selon les désistements éventuels.',
          'At the end of the evening, interest signals are consolidated and the waitlist continues to move based on fit and any seat changes.',
        ),
      },
    ],
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
    agenda: [
      {
        time: '14:30 - 14:50',
        title: localized('集合与路线说明', 'Rassemblement et briefing', 'Meet-up and route briefing'),
        desc: localized(
          '在文化空间集合，顾问说明当天下午的路线、节奏和交流方式。',
          'Point de rencontre au lieu culturel, avec rappel du parcours et du rythme d échange.',
          'Guests gather at the cultural venue for a short overview of the route, pacing, and interaction format.',
        ),
      },
      {
        time: '14:50 - 15:35',
        title: localized('文化散步与轻度互动', 'Balade culturelle et premiers echanges', 'Culture walk and first exchanges'),
        desc: localized(
          '以轻松并肩走动的方式打开对话，减少第一次见面的压力。',
          'La marche permet d ouvrir la conversation sans rigidité, avec une entrée plus naturelle dans l échange.',
          'Walking side by side makes the first interaction feel lighter and less formal.',
        ),
      },
      {
        time: '15:40 - 16:20',
        title: localized('咖啡停留与小范围对谈', 'Pause cafe et conversations ciblees', 'Coffee stop and focused conversations'),
        desc: localized(
          '在咖啡停留时进入更聚焦的小范围对话，帮助确认是否值得继续了解。',
          'La pause café sert à approfondir les échanges dans un cadre plus stable et plus ciblé.',
          'The coffee stop creates a more stable setting for deeper, more focused conversation.',
        ),
      },
      {
        time: '16:20 - 16:40',
        title: localized('结束收口与后续建议', 'Cloture et recommandations', 'Close-out and next-step guidance'),
        desc: localized(
          '活动结束后记录意向，并根据实际互动效果给出下一步建议。',
          'Les intentions sont recueillies en fin de parcours avec recommandations de suite si pertinentes.',
          'Interest is captured at the end of the route, with next-step recommendations where relevant.',
        ),
      },
    ],
  },
  {
    id: 'e-004',
    date: '2026-05-03',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('七区顾问会客室', 'Cabinet conseil du 7e', 'Advisor room in the 7th arrondissement'),
    status: 'open',
    title: localized('家庭参与沙龙', 'Salon famille', 'Family salon'),
    format: localized('家庭圆桌', 'Table ronde famille', 'Family roundtable'),
    audience: localized('适合需要家庭协助了解平台规则与沟通边界的家庭', 'Pour les familles souhaitant comprendre les regles et limites de participation', 'For families who want to understand platform rules and family participation boundaries'),
    summary: localized(
      '聚焦资料协助、沟通方式、边界意识和代际预期，不公开讨论隐私资料。',
      'Echanges sur l aide au dossier, la communication et les limites, sans exposition de donnees privees.',
      'Focused on dossier support, communication style, and boundaries, without exposing private profile data.',
    ),
    seats: 10,
    registered: 5,
    agenda: [
      {
        time: '15:00 - 15:20',
        title: localized('平台规则说明', 'Rappel des regles de plateforme', 'Platform rules overview'),
        desc: localized(
          '顾问先统一说明家庭参与边界、隐私限制和顾问在其中的角色。',
          'La conseillère clarifie d abord les limites de participation familiale et les règles de confidentialité.',
          'An advisor first clarifies family participation boundaries, privacy limits, and the advisor role.',
        ),
      },
      {
        time: '15:20 - 15:55',
        title: localized('资料辅助与沟通方式', 'Aide au dossier et modes de communication', 'Dossier support and communication modes'),
        desc: localized(
          '讨论家庭如何补充背景信息、何时应该退后，以及如何避免替代本人判断。',
          'Discussion sur la manière d apporter du contexte sans prendre la place de la personne concernée.',
          'The group discusses how families can add context without taking over the user’s decisions.',
        ),
      },
      {
        time: '16:00 - 16:35',
        title: localized('代际预期与边界讨论', 'Attentes intergenerationnelles et limites', 'Intergenerational expectations and limits'),
        desc: localized(
          '围绕节奏、婚姻预期和家长协作方式进行更深入的边界讨论。',
          'Un échange plus approfondi porte sur le rythme, les attentes matrimoniales et la juste place des parents.',
          'A deeper round focuses on pace, marriage expectations, and the right level of parental involvement.',
        ),
      },
      {
        time: '16:35 - 17:00',
        title: localized('问答与个别建议', 'Questions et conseils individuels', 'Q&A and individual guidance'),
        desc: localized(
          '最后预留问答时间，并根据家庭情况给出下一步参与建议。',
          'La session se clôt par des questions ouvertes et des recommandations adaptées à chaque situation familiale.',
          'The session ends with open questions and tailored next-step guidance for each family context.',
        ),
      },
    ],
  },
  {
    id: 'e-005',
    date: '2026-05-10',
    city: localized('巴黎', 'Paris', 'Paris'),
    venue: localized('十六区私宴空间', 'Diner prive dans le 16e', 'Private dinner venue in the 16th'),
    status: 'closed',
    title: localized('VIP 定向晚餐', 'Diner VIP cible', 'VIP targeted dinner'),
    format: localized('6 人定向晚餐', 'Diner VIP cible, 6 personnes', '6-person targeted VIP dinner'),
    audience: localized('面向已经进入定向匹配流程的 VIP 会员', 'Reserve aux membres VIP deja engages dans un matching cible', 'Reserved for VIP members already in targeted matching flow'),
    summary: localized(
      '当前已满额，后续申请将转入候补或下一场同类型活动。',
      'Complet, les demandes suivantes passent en liste d attente ou sur la prochaine edition.',
      'Fully booked, with new applicants moved to the waitlist or next edition.',
    ),
    seats: 6,
    registered: 6,
    agenda: [
      {
        time: '19:15 - 19:35',
        title: localized('VIP 到场确认', 'Accueil VIP', 'VIP arrival confirmation'),
        desc: localized(
          '以更克制的节奏确认到场和当晚安排，确保每位参与者都进入匹配好的座位。',
          'Arrivée en format discret avec vérification des placements préparés en amont.',
          'A discreet arrival sequence confirms attendance and pre-arranged seating for each participant.',
        ),
      },
      {
        time: '19:35 - 20:10',
        title: localized('定向首轮互动', 'Premier tour cible', 'Targeted first interaction'),
        desc: localized(
          '先进入针对性更强的首轮交流，直接观察真实互动中的气质和节奏。',
          'Le premier échange est volontairement ciblé pour observer très vite l aisance réelle et la compatibilité de rythme.',
          'The first exchange is intentionally targeted to quickly observe real-world chemistry and pacing.',
        ),
      },
      {
        time: '20:10 - 20:50',
        title: localized('晚餐深度交流', 'Diner et conversation approfondie', 'Dinner and deeper conversation'),
        desc: localized(
          '在正式用餐阶段进入更完整的价值观、生活方式和长期方向交流。',
          'Le dîner ouvre un temps plus long pour parler valeurs, mode de vie et horizon relationnel.',
          'Dinner opens a longer window for discussing values, lifestyle, and long-term direction.',
        ),
      },
      {
        time: '20:50 - 21:10',
        title: localized('顾问收口与后续推进', 'Cloture conseiller', 'Advisor close-out and next steps'),
        desc: localized(
          '活动结束后由顾问统一收口，记录双方意向并安排后续更私密的推进方式。',
          'La soirée se termine par une consolidation discrète des intentions et la préparation des suites éventuelles.',
          'The evening closes with discreet advisor consolidation of intentions and preparation for possible next steps.',
        ),
      },
    ],
  },
]
