import type { AppLocaleMessages } from '@/i18n/types'

export const messagesPageMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Messages',
      title: '消息与沟通边界',
      subtitle: '消息页始终以本人直接沟通为核心。即使某份资料对家长可见，聊天本身仍由你来发起、判断和推进。',
    },
    stats: {
      threads: '会话数量',
      unread: '未读消息',
      familyVisible: '家长可见资料',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '沟通必须由本人推进',
        description: '聊天是最容易暴露节奏感和判断力的环节，不能被家长或顾问替代。',
        point1: '本人决定什么时候回复和如何推进',
        point2: '未读消息反映当前沟通节奏，不等于必须立刻回应',
        point3: '关系边界与沟通语气都应由你亲自把握',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只能理解背景，不进入对话',
        description: '即使对方资料允许家庭视角，消息内容本身也不应进入代聊或代决策模式。',
        point1: '家长只适合了解背景节奏，不看对话细节',
        point2: '如需家庭参与，应在聊天之外单独说明',
        point3: '消息页默认保持本人对人的直接感知',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: '当前会话',
      familyBadge: '资料可给家长看',
      unreadLabel: '未读',
      open: '查看资料',
    },
    support: {
      eyebrow: 'Support',
      title: '沟通提示',
      point1: '未读不一定是风险，更重要的是回复质量和推进清晰度。',
      point2: '如果准备进入线下或家庭协同，再把说明放到聊天之外处理。',
      point3: '优先保留你自己的语气，而不是写成流程化沟通。',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: '家长在消息页的边界',
      point1: '不代发消息，不代替判断关系温度。',
      point2: '如需家长参与，只补充背景或后续建议。',
      point3: '真正的匹配感只能通过本人互动来判断。',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Messages',
      title: 'Messages et limites de communication',
      subtitle: 'La page messages reste centree sur un echange direct mene par la personne. Meme si un profil est visible cote famille, la conversation ne l est pas.',
    },
    stats: {
      threads: 'Fils',
      unread: 'Non lus',
      familyVisible: 'Profils visibles famille',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'La conversation doit rester personnelle',
        description: 'Le rythme de reponse et la maniere de faire avancer l echange ne peuvent pas etre delegues.',
        point1: 'La personne choisit quand repondre et comment avancer',
        point2: 'Un non lu n impose pas une reaction immediate',
        point3: 'Le ton et les limites relationnelles restent personnels',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille comprend le contexte, pas le dialogue',
        description: 'Meme quand un profil est partageable cote famille, la discussion elle-meme ne doit pas devenir un espace de delegation.',
        point1: 'La famille peut comprendre le contexte general, pas le detail de l echange',
        point2: 'Si une aide familiale est utile, elle se traite hors conversation',
        point3: 'La lecture humaine de l echange reste celle de la personne',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: 'Conversations en cours',
      familyBadge: 'Profil visible famille',
      unreadLabel: 'Non lu',
      open: 'Voir le profil',
    },
    support: {
      eyebrow: 'Support',
      title: 'Repères de communication',
      point1: 'Le vrai signal n est pas la vitesse seule mais la qualite de l echange.',
      point2: 'Si une phase hors ligne ou familiale arrive, mieux vaut la traiter hors messagerie.',
      point3: 'Conserver une voix personnelle reste prioritaire.',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: 'Limite familiale sur cette page',
      point1: 'Pas de messages envoyes a la place de la personne.',
      point2: 'Seulement du contexte ou du conseil hors fil de discussion.',
      point3: 'La compatibilite se lit dans l interaction directe.',
    },
  },
  en: {
    hero: {
      eyebrow: 'Messages',
      title: 'Messages and communication boundaries',
      subtitle: 'The messaging page stays centered on direct user-led conversation. Even if a profile is family-visible, the conversation itself is not delegated.',
    },
    stats: {
      threads: 'Threads',
      unread: 'Unread',
      familyVisible: 'Family-visible profiles',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Conversation must stay personal',
        description: 'Reply timing, tone, and next-step judgment are part of the user s own relational signal and should not be outsourced.',
        point1: 'The user decides when to reply and how to move forward',
        point2: 'Unread messages do not automatically require an instant answer',
        point3: 'Tone and relationship boundaries should stay in the user s hands',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family can understand context, not enter the dialogue',
        description: 'Even when a profile is visible to family, the conversation itself should not become a delegated channel.',
        point1: 'Family may understand general context but not the detail of the exchange',
        point2: 'If family input is useful, it should happen outside the chat thread',
        point3: 'Actual chemistry can only be judged through direct interaction',
      },
    },
    list: {
      eyebrow: 'Threads',
      title: 'Current conversations',
      familyBadge: 'Family-visible profile',
      unreadLabel: 'Unread',
      open: 'Open profile',
    },
    support: {
      eyebrow: 'Support',
      title: 'Communication reminders',
      point1: 'The strongest signal is reply quality and clarity, not raw speed alone.',
      point2: 'If offline steps or family involvement are next, handle them outside the thread.',
      point3: 'Keep the user s own voice instead of drifting into scripted messaging.',
    },
    boundary: {
      eyebrow: 'Boundary',
      title: 'Family boundary on this page',
      point1: 'No one sends messages on the user s behalf.',
      point2: 'Family input stays limited to outside context or follow-up advice.',
      point3: 'Real compatibility is judged through direct user interaction.',
    },
  },
}
