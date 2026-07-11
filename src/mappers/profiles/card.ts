import type {
    FamilyProfileListItem,
    SelfProfileListItem,
} from '@/api/profiles'
import type {Translate} from '@/i18n/types'
import {resolveAssetUrl} from '@/config/app'
import type {ProfileCardViewModel} from '@/types/profiles/card'
import {formatLocalizedAge} from '@/utils/profile-format'
import type {FormatLocale} from '@/utils/locale-format'

type OptionLabel = (fieldKey: string, value: string) => string

export function toSelfProfileCardViewModel(
    profile: SelfProfileListItem,
    locale: FormatLocale,
    t: Translate,
    optionLabel: OptionLabel = fallbackOptionLabel,
): ProfileCardViewModel {
    return {
        avatarUrl: profile.avatarUrl ? resolveAssetUrl(profile.avatarUrl) : '',
        displayName: profile.displayName,
        gender: profile.gender,
        meta: formatLocalizedAge(locale, profile.age) + ' / ' + profile.industry,
        badge: optionLabel('datingIntentionCode', profile.datingIntentionCode),
        summary: profile.summary,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.languages'), value: formatLanguageLabels(profile.languages, optionLabel)},
        ],
        tags: profile.tags.slice(0, 3),
        footer: optionLabel('profileStatus', profile.profileStatus),
    }
}

export function toFamilyProfileCardViewModel(
    profile: FamilyProfileListItem,
    locale: FormatLocale,
    t: Translate,
    optionLabel: OptionLabel = fallbackOptionLabel,
): ProfileCardViewModel {
    const tagTexts = [
        profile.acceptsLongDistance ? t('tags.longDistanceYes') : '',
        profile.hasChildren ? t('tags.childrenYes') : t('tags.childrenNo'),
    ].filter(Boolean)

    return {
        avatarUrl: profile.avatarUrl ? resolveAssetUrl(profile.avatarUrl) : '',
        displayName: profile.displayName,
        gender: profile.gender,
        meta: formatLocalizedAge(locale, profile.age) + ' / ' + profile.industry,
        badge: optionLabel('maritalStatus', profile.maritalStatus),
        summary: profile.relationshipGoal,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.residencePlan'), value: profile.residencePlan},
        ],
        tags: [...profile.tags, ...tagTexts].slice(0, 3),
        footer: optionLabel('profileStatus', profile.profileStatus),
    }
}

function formatLanguageLabels(values: string[], optionLabel: OptionLabel): string {
    if (values.length === 0) return '-'
    return values.map(value => optionLabel('languages', value.toUpperCase())).join(' / ')
}

function fallbackOptionLabel(_fieldKey: string, value: string): string {
    return value
}
