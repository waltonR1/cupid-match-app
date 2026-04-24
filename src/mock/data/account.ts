import { localized } from '@/mock/shared'
import type {
  MockFavoriteProfile,
  MockMessageThread,
  MockPrivacySetting,
  MockUserAccount,
  MockUserRegistration,
} from '@/mock/types/account'

export type {
  MembershipLevel,
  MockFavoriteProfile,
  MockFavoriteRecord,
  MockMessageThread,
  MockPrivacySetting,
  MockThreadRecord,
  MockUserAccount,
  MockUserEventRecord,
  MockUserRegistration,
  RegistrationStatus,
} from '@/mock/types/account'

export const mockCurrentUser: MockUserAccount = {
  id: 'u-001',
  realName: 'Lin S.',
  nickName: 'Lin S.',
  avatarUrl: '',
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
  {
    profileId: 'p-006',
    savedAt: '2026-03-28',
    note: localized(
        '这份资料已允许进入家长协同视角，后续可一起评估双城发展与家庭节奏。',
        'Ce profil peut deja entrer dans une lecture familiale limitee pour evaluer le rythme entre deux villes.',
        'This profile is already suitable for a limited family-assisted review around cross-city rhythm and fit.'
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
  {
    id: 'm-003',
    profileId: 'p-006',
    updatedAt: '2026-03-27T19:15:00',
    unread: 1,
    lastMessage: localized(
        '如果后续节奏合适，我们也可以讨论巴黎和布鲁塞尔之间的安排。',
        'Si le rythme convient, on pourra aussi parler d un equilibre entre Paris et Bruxelles.',
        'If the pace feels right, we can also talk about how Paris and Brussels might work.'
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
