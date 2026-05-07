import type {
    FamilyModeCode,
    FamilyProfileListItem,
    DatingIntentionCode,
    ProfileStatusCode,
    SelfProfileListItem,
} from '@/api/profiles'
import type {Translate} from '@/i18n/types'
import type {ProfileCardViewModel} from '@/types/profiles/card'
import {formatLocalizedAge, formatProfileLanguages} from '@/utils/profile-format'
import type {FormatLocale} from '@/utils/locale-format'

/** 转换个人资料卡片 */
export function toSelfProfileCardViewModel(profile: SelfProfileListItem, locale: FormatLocale, t: Translate): ProfileCardViewModel {
    return {
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
        gender: profile.gender,
        meta: `${formatLocalizedAge(locale, profile.age)} / ${profile.occupation}`,
        badge: t(resolveIntentBadgeKey(profile.datingIntentionCode)),
        summary: profile.summary,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.languages'), value: formatProfileLanguages(locale, profile.languages)},
        ],
        tags: profile.tags.slice(0, 3),
        footer: t(resolveSelfFooterKey(profile.profileStatus)),
    }
}

/** 转换家庭资料卡片 */
export function toFamilyProfileCardViewModel(profile: FamilyProfileListItem, locale: FormatLocale, t: Translate): ProfileCardViewModel {
    const familyMode = resolveFamilyMode(profile)
    const tagTexts = [
        t(resolveMaritalStatusTagKey(profile.maritalStatus)),
        profile.acceptsLongDistance ? t('tags.longDistanceYes') : '',
        profile.hasChildren ? t('tags.childrenYes') : t('tags.childrenNo'),
    ].filter(Boolean)

    return {
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
        gender: profile.gender,
        meta: `${formatLocalizedAge(locale, profile.age)} / ${profile.occupation}`,
        badge: t(resolveFamilyModeBadgeKey(familyMode)),
        summary: profile.relationshipPlan,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.residencePlan'), value: profile.residencePlan},
        ],
        tags: [...profile.tags, ...tagTexts].slice(0, 3),
        footer: t(resolveFamilyFooterKey(profile.profileStatus, familyMode)),
    }
}

/** 解析意向徽章文案 */
function resolveIntentBadgeKey(code: DatingIntentionCode): string {
    switch (code) {
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

/** 解析个人卡片底部文案 */
function resolveSelfFooterKey(profileStatus: ProfileStatusCode): string {
    switch (profileStatus) {
        case 'review':
            return 'card.labelReview'
        case 'vip':
            return 'card.labelPriority'
        case 'open':
        default:
            return 'card.labelSelected'
    }
}

/** 解析家庭展示模式 */
function resolveFamilyMode(profile: FamilyProfileListItem): FamilyModeCode {
    if (profile.familyPriority) return 'priority'
    if (profile.allowFamilyContact) return 'contact_ready'
    return 'context_only'
}

/** 解析家庭模式徽章文案 */
function resolveFamilyModeBadgeKey(mode: FamilyModeCode): string {
    switch (mode) {
        case 'priority':
            return 'modes.priority'
        case 'contact_ready':
            return 'modes.contactReady'
        case 'context_only':
        default:
            return 'modes.contextOnly'
    }
}

/** 解析家庭卡片底部文案 */
function resolveFamilyFooterKey(profileStatus: ProfileStatusCode, mode: FamilyModeCode): string {
    if (profileStatus === 'review') return 'card.labelReview'

    switch (mode) {
        case 'priority':
            return 'card.labelPriority'
        case 'contact_ready':
            return 'card.labelContactReady'
        case 'context_only':
        default:
            return 'card.labelObserve'
    }
}

/** 解析婚姻状态标签文案 */
function resolveMaritalStatusTagKey(status: FamilyProfileListItem['maritalStatus']): string {
    switch (status) {
        case 'divorced':
            return 'tags.maritalDivorced'
        case 'widowed':
            return 'tags.maritalWidowed'
        case 'single':
        default:
            return 'tags.maritalSingle'
    }
}
