import type { Ref } from 'vue'
import { formatProfileAge, formatProfileLanguages, localizeProfileText } from '@/utils/profile-format'
import type { ActiveDirectoryFilterChip, DirectoryOption } from '@/types/profiles/directory'
import type { ProfileCardViewModel } from '@/types/profiles/card'
import type { FormatLocale, FamilyProfileDirectoryFacetsDTO, ProfileDTO, SelfProfileDirectoryFacetsDTO } from '@/api/profiles/profiles.types'
import type { ProfileDirectoryFilterItemVM } from '@/types/vm/profiles'

type Translate = (key: string) => string

const compactWidthClass = 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]'
const regularWidthClass = 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]'
const wideWidthClass = 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]'

export function buildSelfProfileCardViewModel(
  profile: ProfileDTO,
  locale: FormatLocale,
  t: Translate,
): ProfileCardViewModel {
  return {
    avatarUrl: profile.avatarUrl,
    avatarFallback: profile.displayName,
    displayName: profile.displayName,
    gender: profile.gender,
    meta: `${formatProfileAge(locale, profile.age)} / ${localizeProfileText(locale, profile.occupation)}`,
    badge: t(intentBadgeKey(profile.intentCode)),
    summary: localizeProfileText(locale, profile.summary),
    facts: [
      { label: t('fields.city'), value: localizeProfileText(locale, profile.city) },
      { label: t('fields.education'), value: localizeProfileText(locale, profile.education) },
      { label: t('fields.languages'), value: formatProfileLanguages(locale, profile.languages) },
    ],
    tags: profile.tags.slice(0, 3).map(item => localizeProfileText(locale, item)),
    footer: t(statusFooterKey(profile.status)),
  }
}

export function buildFamilyProfileCardViewModel(
  profile: ProfileDTO,
  locale: FormatLocale,
  t: Translate,
): ProfileCardViewModel {
  const familyMode = resolveFamilyMode(profile)
  const additionalTags = [
    t(maritalStatusTagKey(profile.maritalStatus)),
    profile.acceptLongDistance ? t('tags.longDistanceYes') : '',
    profile.hasChildren ? t('tags.childrenYes') : t('tags.childrenNo'),
  ].filter(Boolean)

  return {
    avatarUrl: profile.avatarUrl,
    avatarFallback: profile.displayName,
    displayName: profile.displayName,
    gender: profile.gender,
    meta: `${formatProfileAge(locale, profile.age)} / ${localizeProfileText(locale, profile.occupation)}`,
    badge: t(familyModeBadgeKey(familyMode)),
    summary: localizeProfileText(locale, profile.maritalPlan),
    facts: [
      { label: t('fields.city'), value: localizeProfileText(locale, profile.city) },
      { label: t('fields.education'), value: localizeProfileText(locale, profile.education) },
      { label: t('fields.residencePlan'), value: localizeProfileText(locale, profile.residencePlan) },
    ],
    tags: [...profile.tags.map(item => localizeProfileText(locale, item)), ...additionalTags].slice(0, 3),
    footer: t(familyFooterKey(profile, familyMode)),
  }
}

export function buildSelfDirectoryFilterItems(
  facets: SelfProfileDirectoryFacetsDTO | null,
  filters: Record<string, string>,
  locale: Ref<FormatLocale>,
  t: Translate,
): ProfileDirectoryFilterItemVM[] {
  const cities = facets?.cities ?? []
  const intents = facets?.intents ?? []
  const industries = facets?.industries ?? []
  const occupations = facets?.occupations ?? []
  const languages = facets?.languages ?? []

  return [
    {
      key: 'gender',
      label: t('filters.gender'),
      options: [
        allOption(t),
        { label: t('filters.genderMale'), value: 'male' },
        { label: t('filters.genderFemale'), value: 'female' },
      ],
      value: filters.gender,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'ageRange',
      label: t('filters.age'),
      options: [
        allOption(t),
        { label: t('filters.ageUnder25'), value: 'under25' },
        { label: t('filters.age25to29'), value: '25to29' },
        { label: t('filters.age30to34'), value: '30to34' },
        { label: t('filters.age35to39'), value: '35to39' },
        { label: t('filters.age40plus'), value: '40plus' },
      ],
      value: filters.ageRange,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'city',
      label: t('filters.city'),
      options: [
        allOption(t),
        ...cities.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.city,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'heightRange',
      label: t('filters.height'),
      options: [
        allOption(t),
        { label: '165cm-', value: 'under165' },
        { label: '165-169cm', value: '165to169' },
        { label: '170-174cm', value: '170to174' },
        { label: '175-179cm', value: '175to179' },
        { label: '180cm+', value: '180plus' },
      ],
      value: filters.heightRange,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'education',
      label: t('filters.education'),
      options: [
        allOption(t),
        { label: t('filters.eduBachelor'), value: 'bachelor' },
        { label: t('filters.eduMaster'), value: 'master' },
        { label: t('filters.eduPhD'), value: 'phd' },
      ],
      value: filters.education,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'intentCode',
      label: t('filters.intent'),
      options: [
        allOption(t),
        ...intents.map(item => ({
          label: localizeProfileText(locale.value, item.label),
          value: item.code,
        })),
      ],
      value: filters.intentCode,
      widthClass: wideWidthClass,
      group: 'primary',
    },
    {
      key: 'industry',
      label: t('filters.industry'),
      options: [
        allOption(t),
        ...industries.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.industry,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'occupation',
      label: t('fields.job'),
      options: [
        allOption(t),
        ...occupations.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.occupation,
      widthClass: wideWidthClass,
      group: 'secondary',
    },
    {
      key: 'language',
      label: t('filters.languages'),
      options: [
        allOption(t),
        ...languages.map(value => ({
          label: resolveLanguageLabel(locale.value, value),
          value,
        })),
      ],
      value: filters.language,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'verified',
      label: t('filters.verified'),
      options: [
        allOption(t),
        { label: t('filters.verifiedYes'), value: 'verified' },
        { label: t('filters.verifiedNo'), value: 'unverified' },
      ],
      value: filters.verified,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'maritalStatus',
      label: t('filters.maritalStatus'),
      options: [
        allOption(t),
        { label: t('filters.maritalSingle'), value: 'single' },
        { label: t('filters.maritalDivorced'), value: 'divorced' },
        { label: t('filters.maritalWidowed'), value: 'widowed' },
      ],
      value: filters.maritalStatus,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'hasChildren',
      label: t('filters.children'),
      options: [
        allOption(t),
        { label: t('filters.childrenYes'), value: 'yes' },
        { label: t('filters.childrenNo'), value: 'no' },
      ],
      value: filters.hasChildren,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'acceptLongDistance',
      label: t('filters.longDistance'),
      options: [
        allOption(t),
        { label: t('filters.longDistanceYes'), value: 'yes' },
        { label: t('filters.longDistanceNo'), value: 'no' },
      ],
      value: filters.acceptLongDistance,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
  ]
}

export function buildFamilyDirectoryFilterItems(
  facets: FamilyProfileDirectoryFacetsDTO | null,
  filters: Record<string, string>,
  locale: Ref<FormatLocale>,
  t: Translate,
): ProfileDirectoryFilterItemVM[] {
  const cities = facets?.cities ?? []
  const intents = facets?.intents ?? []
  const occupations = facets?.occupations ?? []
  const industries = facets?.industries ?? []

  return [
    {
      key: 'gender',
      label: t('filters.gender'),
      options: [
        allOption(t),
        { label: t('filters.genderMale'), value: 'male' },
        { label: t('filters.genderFemale'), value: 'female' },
      ],
      value: filters.gender,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'ageRange',
      label: t('filters.age'),
      options: [
        allOption(t),
        { label: t('filters.ageUnder25'), value: 'under25' },
        { label: t('filters.age25to29'), value: '25to29' },
        { label: t('filters.age30to34'), value: '30to34' },
        { label: t('filters.age35to39'), value: '35to39' },
        { label: t('filters.age40plus'), value: '40plus' },
      ],
      value: filters.ageRange,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'familyMode',
      label: t('filters.familyMode'),
      options: [
        allOption(t),
        { label: t('filters.modeContextOnly'), value: 'context_only' },
        { label: t('filters.modeContactReady'), value: 'contact_ready' },
        { label: t('filters.modePriority'), value: 'priority' },
      ],
      value: filters.familyMode,
      widthClass: wideWidthClass,
      group: 'primary',
    },
    {
      key: 'city',
      label: t('filters.city'),
      options: [
        allOption(t),
        ...cities.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.city,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'education',
      label: t('filters.education'),
      options: [
        allOption(t),
        { label: t('filters.eduBachelor'), value: 'bachelor' },
        { label: t('filters.eduMaster'), value: 'master' },
        { label: t('filters.eduPhD'), value: 'phd' },
      ],
      value: filters.education,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'intentCode',
      label: t('filters.intent'),
      options: [
        allOption(t),
        ...intents.map(item => ({
          label: localizeProfileText(locale.value, item.label),
          value: item.code,
        })),
      ],
      value: filters.intentCode,
      widthClass: wideWidthClass,
      group: 'primary',
    },
    {
      key: 'occupation',
      label: t('filters.occupation'),
      options: [
        allOption(t),
        ...occupations.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.occupation,
      widthClass: wideWidthClass,
      group: 'secondary',
    },
    {
      key: 'industry',
      label: t('filters.industry'),
      options: [
        allOption(t),
        ...industries.map(item => ({
          label: localizeProfileText(locale.value, item),
          value: item.en,
        })),
      ],
      value: filters.industry,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'maritalStatus',
      label: t('filters.maritalStatus'),
      options: [
        allOption(t),
        { label: t('filters.maritalSingle'), value: 'single' },
        { label: t('filters.maritalDivorced'), value: 'divorced' },
        { label: t('filters.maritalWidowed'), value: 'widowed' },
      ],
      value: filters.maritalStatus,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'hasChildren',
      label: t('filters.children'),
      options: [
        allOption(t),
        { label: t('filters.childrenYes'), value: 'yes' },
        { label: t('filters.childrenNo'), value: 'no' },
      ],
      value: filters.hasChildren,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'acceptLongDistance',
      label: t('filters.longDistance'),
      options: [
        allOption(t),
        { label: t('filters.longDistanceYes'), value: 'yes' },
        { label: t('filters.longDistanceNo'), value: 'no' },
      ],
      value: filters.acceptLongDistance,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
  ]
}

export function buildActiveFilterChips(
  items: ProfileDirectoryFilterItemVM[],
  filters: Record<string, string>,
): ActiveDirectoryFilterChip[] {
  return items
    .map((item) => {
      const value = filters[item.key]
      if (!value) return undefined

      return {
        key: item.key,
        label: item.label,
        value: item.options.find(option => option.value === value)?.label ?? value,
      }
    })
    .filter((item): item is ActiveDirectoryFilterChip => Boolean(item))
}

function allOption(t: Translate): DirectoryOption {
  return {
    label: t('filters.all'),
    value: '',
  }
}

function intentBadgeKey(intentCode: ProfileDTO['intentCode']) {
  switch (intentCode) {
    case 'marriage':
      return 'card.goalMarriage'
    case 'exclusive':
      return 'card.goalExclusive'
    case 'cross_border':
      return 'card.goalCrossBorder'
    case 'serious':
    default:
      return 'card.goalSerious'
  }
}

function statusFooterKey(status: ProfileDTO['status']) {
  switch (status) {
    case 'review':
      return 'card.labelReview'
    case 'vip':
      return 'card.labelPriority'
    case 'open':
    default:
      return 'card.labelSelected'
  }
}

function resolveFamilyMode(profile: ProfileDTO) {
  if (profile.familyPriority) return 'PRIORITY'
  if (profile.allowFamilyContact) return 'CONTACT_READY'
  return 'CONTEXT_ONLY'
}

function familyModeBadgeKey(mode: ReturnType<typeof resolveFamilyMode>) {
  switch (mode) {
    case 'PRIORITY':
      return 'modes.priority'
    case 'CONTACT_READY':
      return 'modes.contactReady'
    case 'CONTEXT_ONLY':
    default:
      return 'modes.contextOnly'
  }
}

function familyFooterKey(profile: ProfileDTO, mode: ReturnType<typeof resolveFamilyMode>) {
  if (profile.status === 'review') return 'card.labelReview'

  switch (mode) {
    case 'PRIORITY':
      return 'card.labelPriority'
    case 'CONTACT_READY':
      return 'card.labelContactReady'
    case 'CONTEXT_ONLY':
    default:
      return 'card.labelObserve'
  }
}

function maritalStatusTagKey(value: ProfileDTO['maritalStatus']) {
  switch (value) {
    case 'divorced':
      return 'tags.maritalDivorced'
    case 'widowed':
      return 'tags.maritalWidowed'
    case 'single':
    default:
      return 'tags.maritalSingle'
  }
}

function resolveLanguageLabel(locale: FormatLocale, value: string) {
  return formatProfileLanguages(locale, [value])
}
