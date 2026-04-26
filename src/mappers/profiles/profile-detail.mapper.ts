import { formatProfileAge, formatProfileDate, formatProfileHeight, formatProfileLanguages, localizeProfileText } from '@/utils/profile-format'
import type { ProfileDetailFactItem, ProfileDetailHeroData } from '@/types/profiles/detail'
import type { FormatLocale, ProfileDTO } from '@/api/profiles/profiles.types'
import type { ProfileDetailPageVM } from '@/types/vm/profiles'

type Translate = (key: string) => string

export function mapSelfProfileDetailPage(
  profile: ProfileDTO | null,
  locale: FormatLocale,
  t: Translate,
): ProfileDetailPageVM {
  if (!profile) {
    return emptyDetailPage()
  }

  const recordId = profile.id.toUpperCase()
  const statusText = t(`status.${profile.status}`)
  const verificationText = profile.isVerified ? t('badges.verified') : t('badges.unverified')
  const visibilityText = profile.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
  const familyModeText = resolveFamilyModeText(profile, t)

  return {
    heroData: {
      eyebrow: t('hero.eyebrow'),
      recordId,
      avatarUrl: profile.avatarUrl,
      avatarFallback: profile.displayName,
      displayName: profile.displayName,
      gender: profile.gender,
      meta: [
        formatProfileAge(locale, profile.age),
        localizeProfileText(locale, profile.occupation),
        localizeProfileText(locale, profile.city),
      ].join(' / '),
      summary: localizeProfileText(locale, profile.summary),
      badges: [
        { label: statusText },
        { label: verificationText, tone: profile.isVerified ? 'highlight' : 'muted' },
        { label: visibilityText, tone: profile.familyVisible ? 'highlight' : 'muted' },
      ],
      indexTitle: t('sections.archiveIndex'),
      indexFacts: [
        { label: t('fields.recordNumber'), value: recordId },
        { label: t('fields.status'), value: statusText },
        { label: t('fields.verification'), value: verificationText },
        { label: t('fields.visibility'), value: visibilityText },
        { label: t('fields.lastActive'), value: formatProfileDate(locale, profile.lastActiveAt) },
        { label: t('fields.joinedAt'), value: formatProfileDate(locale, profile.joinedAt) },
      ],
    },
    overviewFacts: [
      fact(t('fields.age'), formatProfileAge(locale, profile.age)),
      fact(t('fields.height'), formatProfileHeight(profile.height)),
      fact(t('fields.city'), localizeProfileText(locale, profile.city)),
      fact(t('fields.country'), localizeProfileText(locale, profile.country)),
      fact(t('fields.nationality'), localizeProfileText(locale, profile.nationality)),
      fact(t('fields.education'), localizeProfileText(locale, profile.education)),
      fact(t('fields.job'), localizeProfileText(locale, profile.occupation)),
      fact(t('fields.industry'), localizeProfileText(locale, profile.industry)),
      fact(t('fields.employer'), localizeProfileText(locale, profile.employer)),
      fact(t('fields.income'), localizeProfileText(locale, profile.incomeRange)),
    ],
    relationshipFacts: [
      fact(t('fields.maritalStatus'), t(`maritalStatus.${profile.maritalStatus}`)),
      fact(t('fields.children'), booleanText(profile.hasChildren, t)),
      fact(t('fields.wantChildren'), booleanText(profile.wantChildren, t)),
      fact(t('fields.longDistance'), booleanText(profile.acceptLongDistance, t)),
      fact(t('fields.familySupport'), familyModeText),
    ],
    lifestyleFacts: [
      fact(t('fields.languages'), formatProfileLanguages(locale, profile.languages)),
      fact(t('fields.smoke'), t(`habits.${profile.smoke}`)),
      fact(t('fields.drink'), t(`habits.${profile.drink}`)),
      fact(t('fields.exercise'), localizeProfileText(locale, profile.exercise)),
      fact(t('fields.residencePlan'), localizeProfileText(locale, profile.residencePlan)),
    ],
    spotlightFacts: [
      fact(t('fields.education'), localizeProfileText(locale, profile.education)),
      fact(t('fields.job'), localizeProfileText(locale, profile.occupation)),
      fact(t('fields.languages'), formatProfileLanguages(locale, profile.languages)),
      fact(t('fields.residencePlan'), localizeProfileText(locale, profile.residencePlan)),
    ],
    intentText: localizeProfileText(locale, profile.intent),
    maritalPlanText: localizeProfileText(locale, profile.maritalPlan),
    highlightTexts: profile.highlights.map(item => localizeProfileText(locale, item)),
    tagTexts: profile.tags.map(item => localizeProfileText(locale, item)),
  }
}

export function mapFamilyProfileDetailPage(
  profile: ProfileDTO | null,
  locale: FormatLocale,
  t: Translate,
): ProfileDetailPageVM {
  if (!profile) {
    return emptyDetailPage()
  }

  const recordId = profile.id.toUpperCase()
  const verificationText = profile.isVerified ? t('badges.verified') : t('badges.unverified')
  const visibilityText = profile.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
  const familyModeText = resolveFamilyModeText(profile, t)

  return {
    heroData: {
      eyebrow: t('hero.eyebrow'),
      recordId,
      avatarUrl: profile.avatarUrl,
      avatarFallback: profile.displayName,
      displayName: profile.displayName,
      gender: profile.gender,
      meta: [
        formatProfileAge(locale, profile.age),
        localizeProfileText(locale, profile.city),
        localizeProfileText(locale, profile.education),
      ].join(' / '),
      summary: localizeProfileText(locale, profile.maritalPlan),
      badges: [
        { label: familyModeText },
        { label: visibilityText, tone: profile.familyVisible ? 'highlight' : 'muted' },
        { label: verificationText, tone: profile.isVerified ? 'highlight' : 'muted' },
      ],
      indexTitle: t('sections.archiveIndex'),
      indexFacts: [
        fact(t('fields.recordNumber'), recordId),
        fact(t('fields.city'), localizeProfileText(locale, profile.city)),
        fact(t('fields.education'), localizeProfileText(locale, profile.education)),
        fact(t('fields.residencePlan'), localizeProfileText(locale, profile.residencePlan)),
        fact(t('fields.lastActive'), formatProfileDate(locale, profile.lastActiveAt)),
        fact(t('fields.joinedAt'), formatProfileDate(locale, profile.joinedAt)),
      ],
    },
    overviewFacts: [
      fact(t('fields.age'), formatProfileAge(locale, profile.age)),
      fact(t('fields.city'), localizeProfileText(locale, profile.city)),
      fact(t('fields.country'), localizeProfileText(locale, profile.country)),
      fact(t('fields.nationality'), localizeProfileText(locale, profile.nationality)),
      fact(t('fields.education'), localizeProfileText(locale, profile.education)),
      fact(t('fields.job'), localizeProfileText(locale, profile.occupation)),
      fact(t('fields.industry'), localizeProfileText(locale, profile.industry)),
      fact(t('fields.income'), localizeProfileText(locale, profile.incomeRange)),
      fact(t('fields.residencePlan'), localizeProfileText(locale, profile.residencePlan)),
    ],
    relationshipFacts: [
      fact(t('fields.maritalStatus'), t(`maritalStatus.${profile.maritalStatus}`)),
      fact(t('fields.children'), booleanText(profile.hasChildren, t)),
      fact(t('fields.wantChildren'), booleanText(profile.wantChildren, t)),
      fact(t('fields.longDistance'), booleanText(profile.acceptLongDistance, t)),
      fact(t('fields.familySupport'), familyModeText),
    ],
    lifestyleFacts: [
      fact(t('fields.languages'), formatProfileLanguages(locale, profile.languages)),
      fact(t('fields.exercise'), localizeProfileText(locale, profile.exercise)),
      fact(t('fields.smoke'), t(`habits.${profile.smoke}`)),
      fact(t('fields.drink'), t(`habits.${profile.drink}`)),
    ],
    spotlightFacts: [
      fact(t('fields.intent'), localizeProfileText(locale, profile.intent)),
      fact(t('fields.maritalPlan'), localizeProfileText(locale, profile.maritalPlan)),
      fact(t('fields.longDistance'), booleanText(profile.acceptLongDistance, t)),
      fact(t('fields.familySupport'), familyModeText),
    ],
    intentText: localizeProfileText(locale, profile.intent),
    maritalPlanText: localizeProfileText(locale, profile.maritalPlan),
    highlightTexts: [
      localizeProfileText(locale, profile.summary),
      `${t('fields.residencePlan')}: ${localizeProfileText(locale, profile.residencePlan)}`,
      `${t('fields.longDistance')}: ${booleanText(profile.acceptLongDistance, t)}`,
    ],
    tagTexts: profile.tags.slice(0, 3).map(item => localizeProfileText(locale, item)),
  }
}

function emptyDetailPage(): ProfileDetailPageVM {
  return {
    heroData: null,
    overviewFacts: [],
    relationshipFacts: [],
    lifestyleFacts: [],
    spotlightFacts: [],
    intentText: '',
    maritalPlanText: '',
    highlightTexts: [],
    tagTexts: [],
  }
}

function resolveFamilyModeText(profile: ProfileDTO, t: Translate) {
  if (profile.familyPriority) return t('familySupport.priority')
  if (profile.allowFamilyContact) return t('familySupport.contactReady')
  return t('familySupport.contextOnly')
}

function booleanText(value: boolean, t: Translate) {
  return value ? t('values.yes') : t('values.no')
}

function fact(label: string, value: string): ProfileDetailFactItem {
  return { label, value }
}
