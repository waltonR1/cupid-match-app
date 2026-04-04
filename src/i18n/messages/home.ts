import type { AppLocaleMessages } from '@/i18n/types'

export const homeMessages: AppLocaleMessages = {
  zh: {
    hero: {
      meta: 'Paris · {year}',
      title: '相约巴黎',
      titleAccent: 'Rencontre à Paris',
      description: '巴黎起点的高学历相亲与社交演示站。',
      secondaryDescription: '围绕认真关系、跨文化相遇与高质量连接而设计。',
      actions: {
        primary: '立即加入',
        secondary: '查看精选会员',
      },
      quote: '让爱，有文化的温度。',
      stats: {
        members: { value: '7万+', label: '全球高学历用户' },
        events: { value: '300', label: '巴黎及欧洲活动' },
        connections: { value: '3000', label: '跨文化真实相遇' },
      },
    },
    vision: {
      eyebrow: '我们的愿景',
      title: '相约巴黎',
      titleAccent: '愿景',
      intro: '在巴黎这座浪漫之城，我们希望为真诚、成熟、关系目标清晰的人，建立一个更值得信任的相识平台。',
      description: '我们相信，一段真正有质量的关系，不只始于心动，也始于价值观、人生节奏与未来方向的彼此靠近。',
      secondaryDescription: '在这座关于爱与相遇的城市里，每一颗认真生活的心，都值得找到与自己同频的回响。',
      pointLabel: '愿景切片',
      points: {
        relationship: {title: '关系导向', desc: '不是短暂热闹，而是以认真相识、真实发展为前提的连接。'},
        values: {title: '价值观接近', desc: '文化背景、人生阶段与处事方式越契合，关系越容易走得更远。'},
        intention: {title: '认真而明确', desc: '不将就，不暧昧，只连接真正愿意进入现实关系的人。'},
      },
    },
    features: {
      eyebrow: '服务体系',
      title: '核心功能',
      titleAccent: '服务模块',
      subtitle: '从资料浏览、互动沟通到线下相遇，再到家庭协助与顾问支持，形成更完整的相识服务路径。',
      ai: {title: '智能匹配', desc: '结合教育背景、语言能力、生活方式与关系期待，提供更有质量的推荐。', label: 'Intelligence Artificielle'},
      message: {title: '私信互动', desc: '支持资料浏览、收藏、表达兴趣与私信沟通，让互动更自然顺畅。', label: 'Connexion Privée'},
      event: {title: '线下活动', desc: '围绕巴黎与欧洲城市，组织晚宴、沙龙与文化型相遇活动。', label: 'Rencontres Hors Ligne'},
      family: {title: '家庭协助', desc: '为希望参与了解与沟通的家庭，提供更清晰、更克制的支持入口。', label: 'Espace Famille'},
      vip: {title: '顾问服务', desc: '提供更深入的介绍、沟通建议与高质量关系推进支持。', label: 'Service Premium'},
      story: {title: '成功故事', desc: '展示真实相识案例、平台故事与品牌所倡导的关系价值。', label: 'Histoires Réelles'},
    },
    audience: {
      eyebrow: '适合人群',
      title: '适合谁',
      titleAccent: ' 加入',
      description: '我们主要面向受教育程度较高、具备国际化视野、认真看待长期关系，并希望通过更真实方式建立连接的单身人群。',
      secondaryDescription: '平台结合资料浏览、互动沟通、线下活动与适度家庭支持，让认真相遇更有效率，也更有边界感。',
      tag1: {title: '认真关系导向', desc: '不是为了短暂热闹，而是为了走向现实、稳定与长期发展的关系。'},
      tag2: {title: '跨文化与高质量沟通', desc: '能够理解不同背景与生活方式，在沟通中重视礼貌、分寸与共识。'},
      tag3: {title: '愿意走向真实相遇', desc: '不只停留在线上表达，也愿意通过活动与真实互动建立更可靠的判断。'},
      card1Label: '适合加入',
      card1: '价值观接近、节奏相合的人，更容易把关系真正走远。',
      card1Accent: '不是简单匹配标签，而是寻找可以一起进入现实生活的人。',
      card2Label: '关系态度',
      card2: '我们不鼓励将就，只连接真正愿意认真进入关系的人。',
      card2Accent: '每一次相遇，都应该建立在清晰、真诚与彼此尊重之上。',
    },
    membership: {
      eyebrow: 'PRIVATE MEMBERSHIP',
      title: '专属会籍',
      titleAccent: '礼遇路径',
      subtitle: '从基础体验到顾问协助，再到更私密的高阶撮合服务，按照关系节奏与期待层级，选择更适合自己的相识方式。',
      note: '不同会籍对应不同的服务深度、推荐优先级与活动参与礼遇。',
      free: {
        badge: '基础入口',
        name: '免费体验',
        description: '适合刚开始了解平台与整体相识方式的用户。',
        price: '¥0',
        priceNote: '免费开放',
        period: '基础体验权限',
        f1: '完成注册与基础资料建立',
        f2: '浏览部分公开资料与平台内容',
        f3: '了解活动形式与整体服务流程',
        button: '开启体验',
      },
      vip: {
        cta: '咨询专属顾问',
        silver: {
          badge: 'Silver Access',
          name: '白银会籍',
          description: '适合希望进入更完整浏览与基础相识节奏的会员。',
          price: '¥499',
          priceNote: '约 €65 / 年',
          period: '年度会籍',
          f1: '基础介绍机会与资料浏览权限',
          f2: '活动参与资格与日常互动入口',
          f3: '适合建立稳定而克制的初步连接',
        },
        gold: {
          badge: 'Gold Selection',
          name: '黄金会籍',
          description: '适合希望提升推荐效率与线下相遇机会的会员。',
          price: '¥770',
          priceNote: '约 €100 / 六个月',
          period: '半年会籍',
          f1: '更高频的介绍机会与优先浏览权限',
          f2: '更完整的活动参与与筛选空间',
          f3: '适合认真推进关系判断与相识节奏',
        },
        diamond: {
          badge: 'Private Diamond',
          name: '钻石会籍',
          description: '面向希望获得更私密、更高阶顾问协助的会员。',
          price: '¥1155',
          priceNote: '约 €150 / 年',
          period: '年度高阶会籍',
          f1: '更优先的推荐排序与高阶资料查看',
          f2: '更完整的活动礼遇与相识协助',
          f3: '可进入更具私密感的顾问支持路径',
        },
      },
    },
    events: {
      eyebrow: '线下活动',
      title: '真实相遇',
      titleAccent: '活动场景',
      subtitle: '从晚宴到文化沙龙，通过精心组织的线下场景，让人与人之间的连接更加真实与自然。',
      cta: '查看全部活动',

      item1: {
        tag: '晚宴社交',
        title: '巴黎左岸晚餐局',
        desc: '小规模、高质量的晚餐交流，在轻松氛围中建立初步连接。',
        meta: '巴黎 · 8人 · 周五晚',
      },
      item2: {
        tag: '文化活动',
        title: '艺术与红酒沙龙',
        desc: '围绕艺术与生活方式展开对话，适合更深入了解彼此。',
        meta: '巴黎 · 12人 · 周末',
      },
      item3: {
        tag: '短途出行',
        title: '波尔多酒庄周末',
        desc: '在更长时间与更自然的环境中，观察人与人之间的真实互动。',
        meta: '波尔多 · 10人 · 两天一夜',
      },
    },
    profilesPreview: {
      eyebrow: '资料预览',
      title: '认识之前',
      titleAccent: '先看资料',
      subtitle: '示例档案帮助你快速理解平台资料结构、沟通维度与关系判断方式。',
      cta: '查看全部资料',

      fields: {
        city: '所在城市',
        education: '教育背景',
        languages: '语言能力',
      },
    },
    family: {
      eyebrow: '家庭参与',
      title: '不只是两个人',
      titleAccent: '的选择',
      description: '我们相信，一段长期关系不仅来自两个人的契合，也来自家庭之间的理解与认同。',
      secondary: '在合适的阶段，引入家庭沟通，让关系更加清晰与稳定。',

      item1: {
        title: '资料透明',
        desc: '父母可在授权下了解基本信息，减少信息不对称',
      },
      item2: {
        title: '沟通支持',
        desc: '在关系推进阶段，提供家庭沟通辅助',
      },
      item3: {
        title: '节奏控制',
        desc: '不是一开始介入，而是在合适阶段参与',
      },

      card1Label: '匹配原则',
      card1: '家庭观念与价值观的接近，是关系长期稳定的重要基础',

      card2Label: '我们的态度',
      card2: '我们不让家庭主导选择，但让家庭成为更可靠的支持',
    }
  },
  fr: {
    hero: {
      meta: 'Paris · {year}',
      title: '相约巴黎',
      titleAccent: 'Rencontre à Paris',
      description: 'Une vitrine demo de rencontres premium pour celibataires diplomes.',
      secondaryDescription: 'Pensee pour les relations serieuses, les rencontres interculturelles et les connexions de qualite.',
      actions: {
        primary: 'Inscription gratuite',
        secondary: 'Decouvrir les evenements',
      },
      quote: 'L amour avec une vraie profondeur culturelle.',
      stats: {
        members: { value: '700k+', label: 'Membres qualifies' },
        events: { value: '50k', label: 'Evenements en Europe' },
        connections: { value: '3M+', label: 'Rencontres authentiques' },
      },
    },
    vision: {
      eyebrow: 'Notre vision',
      title: 'Rencontre à Paris',
      titleAccent: 'Vision',
      intro: 'À Paris, ville du romantisme et des rencontres, nous voulons créer une plateforme de confiance pour des personnes sincères, mûres et claires dans leurs intentions relationnelles.',
      description: 'Nous croyons qu’une relation de qualité ne naît pas seulement d’une émotion, mais aussi d’une proximité de valeurs, de rythme de vie et de projet d’avenir.',
      secondaryDescription: 'Dans cette ville où l’amour résonne partout, chaque cœur sincère mérite de trouver un écho qui lui corresponde vraiment.',
      pointLabel: 'Point de vision',
      points: {
        relationship: {title: 'Orientation relationnelle', desc: 'Pas de lien superficiel, mais des rencontres pensées pour construire une relation réelle et sérieuse.'},
        values: {title: 'Proximité de valeurs', desc: 'Quand les repères culturels, les étapes de vie et les façons d’être se rejoignent, la relation va plus loin.'},
        intention: {title: 'Sérieux et clarté', desc: 'Sans compromis inutile, sans ambiguïté, seulement des personnes prêtes à entrer dans une relation concrète.'},
      },
    },
    features: {
      eyebrow: 'Services',
      title: 'Fonctions',
      titleAccent: 'Services',
      subtitle: 'Du parcours de profil à la rencontre hors ligne, en passant par les échanges, le soutien familial et l’accompagnement, nous construisons un chemin relationnel plus complet.',
      ai: {title: 'Matching IA', desc: 'Des recommandations plus pertinentes selon le parcours, les langues, le mode de vie et les attentes relationnelles.', label: 'Intelligence Artificielle'},
      message: {title: 'Messages et affinités', desc: 'Consultation de profils, favoris, expression d’intérêt et messagerie pour des échanges plus naturels.', label: 'Connexion Privée'},
      event: {title: 'Événements hors ligne', desc: 'Dîners, salons et formats culturels à Paris et dans d’autres villes européennes.', label: 'Rencontres Hors Ligne'},
      family: {title: 'Espace famille', desc: 'Un accès plus clair et plus mesuré pour les familles qui souhaitent accompagner avec bienveillance.', label: 'Espace Famille'},
      vip: {title: 'Service premium', desc: 'Introduction, conseil et accompagnement pour favoriser des rencontres de meilleure qualité.', label: 'Service Premium'},
      story: {title: 'Histoires réelles', desc: 'Des récits de rencontres, des parcours sincères et l’expression de la vision relationnelle de la plateforme.', label: 'Histoires Réelles'},
    },
    audience: {
      eyebrow: 'Pour qui',
      title: 'Pour qui',
      titleAccent: ' s’adresse la plateforme',
      description: 'La plateforme s’adresse avant tout à des célibataires cultivés, ouverts à l’international, sincères dans leur démarche et réellement orientés vers une relation durable.',
      secondaryDescription: 'Entre profils, échanges, rencontres hors ligne et soutien mesuré des familles, nous cherchons à rendre les rencontres sérieuses plus fluides, plus concrètes et plus respectueuses.',
      tag1: {title: 'Orientation sérieuse', desc: 'Pas pour une attention passagère, mais pour construire une relation réelle, stable et durable.'},
      tag2: {title: 'Ouverture culturelle', desc: 'Une capacité à dialoguer entre différents parcours de vie, avec respect, nuance et sens du lien.'},
      tag3: {title: 'Envie de vraies rencontres', desc: 'Au-delà du virtuel, une volonté d’avancer vers des échanges et des rencontres plus incarnés.'},
      card1Label: 'Profil recherché',
      card1: 'Quand les valeurs, le rythme de vie et les attentes se rejoignent, la relation peut aller plus loin.',
      card1Accent: 'Il ne s’agit pas seulement de cocher des critères, mais de rencontrer une personne avec qui avancer réellement.',
      card2Label: 'Esprit de la plateforme',
      card2: 'Nous ne valorisons pas le compromis forcé, mais la sincérité de personnes prêtes à s’engager vraiment.',
      card2Accent: 'Chaque rencontre mérite clarté, respect mutuel et intention authentique.',
    },
    membership: {
      eyebrow: 'PRIVATE MEMBERSHIP',
      title: 'Adhésion Privée',
      titleAccent: 'Parcours & Privilèges',
      subtitle: 'D’une première découverte à un accompagnement plus structuré, puis à une approche plus confidentielle, chaque niveau d’adhésion correspond à une profondeur différente de service.',
      note: 'Chaque niveau d’adhésion détermine l’accès aux profils, la priorité de recommandation et les privilèges liés aux événements.',

      free: {
        badge: 'Accès Découverte',
        name: 'Accès Gratuit',
        description: 'Pour découvrir la plateforme, son fonctionnement et l’esprit des rencontres proposées.',
        price: '€0',
        priceNote: 'accès libre',
        period: 'Découverte essentielle',
        f1: 'Création du profil et informations de base',
        f2: 'Consultation d’une sélection de profils publics',
        f3: 'Accès aux événements et à la présentation de la plateforme',
        button: 'Commencer'
      },

      vip: {
        cta: 'Contacter un conseiller privé',

        silver: {
          badge: 'Silver Access',
          name: 'Adhésion Argent',
          description: 'Pour entrer dans une démarche plus structurée et découvrir un rythme d’échanges plus régulier.',
          price: '€65',
          priceNote: 'env. ¥499 / an',
          period: 'Adhésion annuelle',
          f1: 'Accès élargi aux profils et premières mises en relation',
          f2: 'Participation aux événements et interactions essentielles',
          f3: 'Un rythme sobre pour des rencontres progressives'
        },

        gold: {
          badge: 'Gold Selection',
          name: 'Adhésion Or',
          description: 'Pour renforcer la qualité des mises en relation et multiplier les opportunités de rencontres réelles.',
          price: '€100',
          priceNote: 'env. ¥770 / 6 mois',
          period: 'Adhésion semestrielle',
          f1: 'Priorité plus élevée dans les recommandations',
          f2: 'Accès plus complet aux événements et aux profils',
          f3: 'Pensé pour une démarche sérieuse et active'
        },

        diamond: {
          badge: 'Private Diamond',
          name: 'Adhésion Diamant',
          description: 'Pour une approche plus confidentielle, avec un niveau de sélection et d’accompagnement plus élevé.',
          price: '€150',
          priceNote: 'env. ¥1155 / an',
          period: 'Adhésion premium annuelle',
          f1: 'Priorité renforcée dans les introductions et recommandations',
          f2: 'Privilèges étendus sur les événements et rencontres',
          f3: 'Accès à un accompagnement plus discret et personnalisé'
        }
      }
    },
    events: {
      eyebrow: 'Rencontres',
      title: 'Rencontres réelles',
      titleAccent: 'et événements',
      subtitle: 'Dîners, salons et formats culturels conçus pour favoriser des échanges sincères et naturels.',
      cta: 'Voir tous les événements',

      item1: {
        tag: 'Dîner',
        title: 'Dîner rive gauche',
        desc: 'Un dîner en petit groupe pour créer un premier lien dans une ambiance détendue.',
        meta: 'Paris · 8 personnes · Vendredi soir',
      },
      item2: {
        tag: 'Culture',
        title: 'Salon art & vin',
        desc: 'Un moment d’échange autour de l’art et du style de vie.',
        meta: 'Paris · 12 personnes · Week-end',
      },
      item3: {
        tag: 'Voyage',
        title: 'Week-end à Bordeaux',
        desc: 'Un cadre plus naturel pour observer les interactions réelles.',
        meta: 'Bordeaux · 10 personnes · 2 jours',
      },
    },
    profilesPreview: {
      eyebrow: 'Aperçu des profils',
      title: 'Avant de rencontrer',
      titleAccent: 'découvrez les profils',
      subtitle: 'Quelques profils exemples pour comprendre la structure des fiches, les points de compatibilité et le ton général de la plateforme.',
      cta: 'Voir tous les profils',

      fields: {
        city: 'Ville',
        education: 'Formation',
        languages: 'Langues',
      },
    },
    family: {
      eyebrow: 'Participation familiale',
      title: 'Pas seulement',
      titleAccent: 'deux personnes',
      description: 'Une relation durable ne repose pas uniquement sur deux individus, mais aussi sur la compréhension entre familles.',
      secondary: 'Impliquer la famille au bon moment permet une relation plus stable.',

      item1: {
        title: 'Transparence',
        desc: 'Accès encadré aux informations essentielles',
      },
      item2: {
        title: 'Accompagnement',
        desc: 'Soutien dans les échanges familiaux',
      },
      item3: {
        title: 'Au bon moment',
        desc: 'Intervention uniquement quand c’est pertinent',
      },

      card1Label: 'Principe',
      card1: 'La proximité des valeurs familiales renforce la stabilité',

      card2Label: 'Notre approche',
      card2: 'La famille soutient, sans jamais imposer',
    }
  },
  en: {
    hero: {
      meta: 'Paris · {year}',
      title: 'Meet in Paris',
      titleAccent: 'Rencontre à Paris',
      description: 'A premium dating and social demo site for highly educated singles.',
      secondaryDescription: 'Built for serious connections, intercultural encounters, and quality relationships.',
      actions: {
        primary: 'Join for Free',
        secondary: 'Explore Events',
      },
      quote: 'Let love carry cultural warmth.',
      stats: {
        members: { value: '700k+', label: 'Qualified global members' },
        events: { value: '50k', label: 'Paris and Europe events' },
        connections: { value: '3M+', label: 'Authentic connections' },
      },
    },
    vision: {
      eyebrow: 'Our vision',
      title: 'Meet in Paris',
      titleAccent: 'Vision',
      intro: 'In Paris, a city shaped by romance and meaningful encounters, we hope to build a trusted platform for sincere, mature people with clear relationship intentions.',
      description: 'We believe that a meaningful relationship begins not only with attraction, but also with shared values, compatible life rhythms, and a similar vision of the future.',
      secondaryDescription: 'In this city of love and connection, every sincere heart deserves to find an echo that truly resonates.',
      pointLabel: 'Vision point',
      points: {
        relationship: {title: 'Relationship-oriented', desc: 'Not built for passing attention, but for genuine encounters that can grow into something real.'},
        values: {title: 'Shared values', desc: 'When cultural background, life stage, and ways of living align, a relationship can go much further.'},
        intention: {title: 'Serious and clear', desc: 'No settling, no ambiguity, only people who are truly ready for a real relationship.'},
      },
    },
    features: {
      eyebrow: 'Services',
      title: 'Features',
      titleAccent: 'Service System',
      subtitle: 'From profile discovery and private interaction to offline events, family support, and advisory guidance, we build a more complete path toward meaningful connection.',
      ai: {title: 'Smart matching', desc: 'More thoughtful recommendations based on education, languages, lifestyle, and relationship expectations.', label: 'Intelligence Artificielle'},
      message: {title: 'Private interaction', desc: 'Profile browsing, favorites, expressions of interest, and direct messaging for smoother communication.', label: 'Connexion Privée'},
      event: {title: 'Offline events', desc: 'Dinners, salons, and culture-led gatherings in Paris and across selected European cities.', label: 'Rencontres Hors Ligne'},
      family: {title: 'Family support', desc: 'A clearer and more respectful entry point for families who wish to support the process.', label: 'Espace Famille'},
      vip: {title: 'Advisory service', desc: 'Introductions, communication guidance, and premium support for higher-quality relationship development.', label: 'Service Premium'},
      story: {title: 'Success stories', desc: 'Real stories, sincere connections, and the relationship values the platform stands for.', label: 'Histoires Réelles'},
    },
    audience: {
      eyebrow: 'Who it’s for',
      title: 'Who should',
      titleAccent: ' join',
      description: 'The platform is designed for educated, internationally minded singles who take long-term relationships seriously and want a more thoughtful, grounded way to connect.',
      secondaryDescription: 'Through profile discovery, private interaction, offline events, and measured family support, we aim to make meaningful relationships easier to begin and more realistic to build.',
      tag1: {title: 'Relationship-minded', desc: 'Not built for passing attention, but for people looking for something stable, real, and lasting.'},
      tag2: {title: 'Cross-cultural communication', desc: 'People who value respectful dialogue, shared understanding, and the ability to connect across backgrounds.'},
      tag3: {title: 'Ready for real encounters', desc: 'Beyond online expression, a willingness to move toward activities, conversations, and genuine meeting.'},
      card1Label: 'Best fit',
      card1: 'When values, life rhythm, and expectations align, a relationship has a stronger chance to grow.',
      card1Accent: 'This is not just about matching labels, but about finding someone you can genuinely move forward with.',
      card2Label: 'Our stance',
      card2: 'We do not encourage settling, only sincere people who are truly ready to enter a real relationship.',
      card2Accent: 'Every encounter deserves clarity, mutual respect, and honest intention.',
    },
    membership: {
      eyebrow: 'PRIVATE MEMBERSHIP',
      title: 'Private Membership',
      titleAccent: 'Privileges & Paths',
      subtitle: 'From an initial introduction to the platform, to a more structured journey, and finally to a more discreet and elevated level of matchmaking, each tier reflects a different depth of service.',
      note: 'Each membership level defines access to profiles, recommendation priority, and event privileges.',

      free: {
        badge: 'Discovery Access',
        name: 'Complimentary Access',
        description: 'For those who wish to explore the platform and understand its approach before engaging further.',
        price: '€0',
        priceNote: 'complimentary',
        period: 'Essential access',
        f1: 'Create a profile and complete basic information',
        f2: 'Browse selected public profiles',
        f3: 'Explore events and platform structure',
        button: 'Begin the Experience'
      },

      vip: {
        cta: 'Speak with a private advisor',

        silver: {
          badge: 'Silver Access',
          name: 'Silver Membership',
          description: 'Designed for members seeking a more structured introduction and steady pace of interaction.',
          price: '€65',
          priceNote: 'approx. ¥499 / year',
          period: 'Annual membership',
          f1: 'Expanded profile access and initial introductions',
          f2: 'Participation in events and basic interaction features',
          f3: 'A composed and gradual approach to connection'
        },

        gold: {
          badge: 'Gold Selection',
          name: 'Gold Membership',
          description: 'For members looking to increase both the quality and frequency of meaningful encounters.',
          price: '€100',
          priceNote: 'approx. ¥770 / 6 months',
          period: 'Six-month membership',
          f1: 'Higher priority in recommendations and introductions',
          f2: 'Broader access to events and profiles',
          f3: 'Designed for a more active and intentional journey'
        },

        diamond: {
          badge: 'Private Diamond',
          name: 'Diamond Membership',
          description: 'For a more discreet and refined experience with a higher level of selection and guidance.',
          price: '€150',
          priceNote: 'approx. ¥1155 / year',
          period: 'Premium annual membership',
          f1: 'Priority access to curated recommendations',
          f2: 'Extended privileges across events and introductions',
          f3: 'A more private and elevated matchmaking pathway'
        }
      }
    },
    events: {
      eyebrow: 'Events',
      title: 'Real encounters',
      titleAccent: 'offline',
      subtitle: 'From dinners to cultural salons, carefully designed formats for genuine connections.',
      cta: 'Explore all events',

      item1: {
        tag: 'Dinner',
        title: 'Left Bank Dinner',
        desc: 'A small, curated dinner for meaningful first interactions.',
        meta: 'Paris · 8 people · Friday evening',
      },
      item2: {
        tag: 'Culture',
        title: 'Art & Wine Salon',
        desc: 'A refined setting for deeper conversations and shared interests.',
        meta: 'Paris · 12 people · Weekend',
      },
      item3: {
        tag: 'Trip',
        title: 'Bordeaux Weekend',
        desc: 'More time and space to observe real compatibility.',
        meta: 'Bordeaux · 10 people · 2 days',
      },
    },
    profilesPreview: {
      eyebrow: 'Profile preview',
      title: 'Before meeting',
      titleAccent: 'browse the profile',
      subtitle: 'A few sample profiles to show how the platform presents background, compatibility signals, and relationship intent.',
      cta: 'Browse all profiles',

      fields: {
        city: 'City',
        education: 'Education',
        languages: 'Languages',
      },
    },
    family: {
      eyebrow: 'Family Involvement',
      title: 'Not just',
      titleAccent: 'two individuals',
      description: 'A meaningful relationship is built not only between two people, but also between families.',
      secondary: 'Involving family at the right moment brings clarity and stability.',

      item1: {
        title: 'Transparency',
        desc: 'Structured access to key information',
      },
      item2: {
        title: 'Support',
        desc: 'Guidance in family communication',
      },
      item3: {
        title: 'Timing matters',
        desc: 'Involvement only when appropriate',
      },

      card1Label: 'Principle',
      card1: 'Shared family values lead to long-term stability',

      card2Label: 'Our approach',
      card2: 'Family supports, never controls',
    }
  },
}
