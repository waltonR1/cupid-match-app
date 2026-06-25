import type {FamilyProfileDetail, FormatLocale, RestrictedProfileField} from '@/api/profiles'
import {PROFILE_FIELD_HIDDEN, PROFILE_FIELD_LOGIN_REQUIRED, PROFILE_FIELD_MEMBER_ONLY} from '@/api/profiles'
import type {Translate} from '@/i18n/types'
import type {
    FamilyIntroductionSectionData,
    FamilyProfileDetailAccessLevel,
    FamilyProfileDetailPageData,
    PrivateIntroductionSectionData,
    ProfileDetailBadgeItem,
    ProfileDetailFactItem,
} from '@/types/profiles/detail'
import {
    createProfileFact,
    formatBooleanText,
    formatLocalizedAge,
    formatProfileHeight,
} from '@/utils/profile-format'

type FactBuilder = (label: string, value: RestrictedProfileField<string>) => ProfileDetailFactItem
type OptionLabel = (fieldKey: string, value: string) => string

/** 转换家庭详情页展示数据 */
export function toFamilyProfileDetailPageData(params: {
    profile: FamilyProfileDetail | null
    locale: FormatLocale
    t: Translate
    optionLabel?: OptionLabel
}): FamilyProfileDetailPageData {
    if (!params.profile) {
        return emptyFamilyProfileDetailPageData()
    }

    return buildFamilyProfileDetailPageData(params.profile, params)
}

/** 构建家庭详情页数据 */
function buildFamilyProfileDetailPageData(
    profile: FamilyProfileDetail,
    context: {
        locale: FormatLocale
        t: Translate
        optionLabel?: OptionLabel
    },
): FamilyProfileDetailPageData {
    const {locale, t} = context
    const optionLabel = context.optionLabel ?? ((_fieldKey: string, value: string) => value)
    const pub = (label: string, value: string) => createProfileFact(label, value)
    const access = (label: string, value: RestrictedProfileField<string>) => accessFact(label, value)
    const accessLevel = resolveAccessLevel(profile)
    const familyModeText = resolveFamilyModeText(profile, t)

    return {
        accessLevel,
        heroData: {
            avatarUrl: profile.avatarUrl,
            photos: buildHeroPhotos(profile, accessLevel),
            displayName: profile.displayName,
            gender: profile.gender,
            meta: [
                formatLocalizedAge(locale, profile.age),
                formatProfileHeight(profile.height),
                profile.education,
                profile.industry,
            ].filter(Boolean).join(' / '),
            location: buildLocationText(profile),
            summary: profile.summary,
            badges: buildBadges(profile, familyModeText, t),
            tags: profile.tags.slice(0, 5),
            quickFacts: [
                pub(t('fields.intent'), profile.datingIntentionLabel),
                access(t('fields.maritalStatus'), formatRestrictedEnum('maritalStatus', profile.maritalStatus, optionLabel)),
                access(t('fields.languages'), formatRestrictedLanguages(profile.languages, optionLabel)),
            ],
            hasMemberAccess: accessLevel === 'premium',
            accessLabel: buildAccessLabel(accessLevel, t),
            galleryLockedText: buildGalleryLockedText(profile, accessLevel, t),
        },
        snapshotFacts: buildSnapshotFacts(profile, locale, pub, access, t, optionLabel, accessLevel),
        familyReviewFacts: buildFamilyReviewFacts(profile, access, t, optionLabel),
        relationshipFacts: buildRelationshipFacts(profile, pub, access, t, optionLabel),
        lifestyleFacts: buildLifestyleFacts(profile, access, t, optionLabel),
        preferenceFacts: buildPreferenceFacts(profile, access, t, optionLabel),
        valueFacts: buildValueFacts(profile, access, t, optionLabel),
        familyIntroductionData: buildFamilyIntroductionData(profile, familyModeText, t),
        privateIntroductionData: buildPrivateIntroductionData(profile),
    }
}

/** 构建访问身份文案 */
function buildAccessLabel(accessLevel: FamilyProfileDetailAccessLevel, t: Translate): string {
    if (accessLevel === 'premium') return t('badges.memberView')
    if (accessLevel === 'registered') return t('badges.registeredView')
    return t('badges.visitorView')
}

/** 构建头图相册 */
function buildHeroPhotos(profile: FamilyProfileDetail, accessLevel: FamilyProfileDetailAccessLevel): string[] {
    if (isRestrictedValue(profile.photos)) return []
    const photos = profile.photos.map(photo => photo.url)
    if (accessLevel === 'visitor') return photos.slice(0, 2)
    if (accessLevel === 'registered') return photos.slice(0, 3)
    return photos
}

/** 构建锁定相册提示 */
function buildGalleryLockedText(profile: FamilyProfileDetail, accessLevel: FamilyProfileDetailAccessLevel, t: Translate): string {
    if (profile.photos === PROFILE_FIELD_HIDDEN) return ''

    const visibleCount = isRestrictedValue(profile.photos)
        ? Math.min(profile.photoCount, 1)
        : buildHeroPhotos(profile, accessLevel).length
    const hiddenCount = Math.max(0, profile.photoCount - visibleCount)

    if (hiddenCount <= 0) return ''

    return `${t('sections.galleryLockedPrefix')}${hiddenCount}${t('sections.galleryLockedSuffix')}`
}

/** 构建地点文案 */
function buildLocationText(profile: FamilyProfileDetail): string {
    const country = formatRestrictedText(profile.country)
    return [profile.city, country].filter(Boolean).join(', ')
}

/** 构建基础概览 */
function buildSnapshotFacts(
    profile: FamilyProfileDetail,
    locale: FormatLocale,
    pub: (label: string, value: string) => ProfileDetailFactItem,
    access: FactBuilder,
    t: Translate,
    optionLabel: OptionLabel,
    accessLevel: FamilyProfileDetailAccessLevel,
): ProfileDetailFactItem[] {
    const visitorFacts = [
        pub(t('fields.age'), formatLocalizedAge(locale, profile.age)),
        pub(t('fields.height'), formatProfileHeight(profile.height)),
        pub(t('fields.city'), profile.city),
        pub(t('fields.education'), profile.education),
        pub(t('fields.industry'), profile.industry),
    ]

    if (accessLevel === 'visitor') return visitorFacts

    return [
        ...visitorFacts,
        access(t('fields.country'), profile.country),
        access(t('fields.nationality'), profile.nationality),
        access(t('fields.languages'), formatRestrictedLanguages(profile.languages, optionLabel)),
    ]
}

/** 构建家庭协作判断 */
function buildFamilyReviewFacts(profile: FamilyProfileDetail, access: FactBuilder, t: Translate, optionLabel: OptionLabel): ProfileDetailFactItem[] {
    return [
        createProfileFact(t('fields.familySupport'), resolveFamilyModeText(profile, t)),
        createProfileFact(t('fields.visibility'), profile.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')),
        access(t('fields.relationshipValues'), joinEnumValues('relationshipValues', profile.relationshipValues, optionLabel)),
        access(t('fields.communicationStyle'), formatRestrictedEnum('communicationStyle', profile.communicationStyle, optionLabel)),
    ]
}

/** 构建婚恋规划 */
function buildRelationshipFacts(
    profile: FamilyProfileDetail,
    pub: (label: string, value: string) => ProfileDetailFactItem,
    access: FactBuilder,
    t: Translate,
    optionLabel: OptionLabel,
): ProfileDetailFactItem[] {
    return [
        pub(t('fields.intent'), profile.datingIntentionLabel),
        access(t('fields.maritalStatus'), formatRestrictedEnum('maritalStatus', profile.maritalStatus, optionLabel)),
        access(t('fields.relationshipGoal'), profile.relationshipGoal),
        access(t('fields.residencePlan'), profile.residencePlan),
        access(t('fields.relocation'), formatRestrictedEnum('relocation', profile.relocation, optionLabel)),
        access(t('fields.longDistance'), formatRestrictedBoolean(profile.acceptsLongDistance, t)),
        access(t('fields.familyLife'), profile.familyLife),
    ]
}

/** 构建生活背景 */
function buildLifestyleFacts(profile: FamilyProfileDetail, access: FactBuilder, t: Translate, optionLabel: OptionLabel): ProfileDetailFactItem[] {
    return [
        access(t('fields.exercise'), profile.exercise),
        access(t('fields.activityLevel'), formatRestrictedEnum('activityLevel', profile.activityLevel, optionLabel)),
        access(t('fields.weekendStyle'), formatRestrictedEnum('weekendStyle', profile.weekendStyle, optionLabel)),
        access(t('fields.smoke'), formatRestrictedEnum('smoking', profile.smoking, optionLabel)),
        access(t('fields.drink'), formatRestrictedEnum('drinking', profile.drinking, optionLabel)),
        access(t('fields.pets'), formatRestrictedEnum('pets', profile.pets, optionLabel)),
    ]
}

/** 构建择偶偏好 */
function buildPreferenceFacts(profile: FamilyProfileDetail, access: FactBuilder, t: Translate, optionLabel: OptionLabel): ProfileDetailFactItem[] {
    return [
        access(t('fields.preferredAgeRange'), formatPreferredAgeRange(profile.preferredAgeMin, profile.preferredAgeMax)),
        access(t('fields.preferredLocation'), formatRestrictedEnum('preferredLocation', profile.preferredLocation, optionLabel)),
        access(t('fields.preferredEducation'), profile.preferredEducation),
        access(t('fields.preferredFamilyPlan'), profile.familyLife),
        access(t('fields.dealBreakers'), joinRestrictedList(profile.dealBreakers)),
    ]
}

/** 构建家庭价值观 */
function buildValueFacts(profile: FamilyProfileDetail, access: FactBuilder, t: Translate, optionLabel: OptionLabel): ProfileDetailFactItem[] {
    return [
        access(t('fields.relationshipValues'), joinEnumValues('relationshipValues', profile.relationshipValues, optionLabel)),
        access(t('fields.personalityTraits'), joinRestrictedList(profile.personalityTraits)),
        access(t('fields.communicationStyle'), formatRestrictedEnum('communicationStyle', profile.communicationStyle, optionLabel)),
        access(t('fields.children'), formatRestrictedBoolean(profile.hasChildren, t)),
        access(t('fields.childrenPlan'), formatRestrictedEnum('childrenPlan', profile.childrenPlan, optionLabel)),
    ]
}

/** 构建家庭介绍模块 */
function buildFamilyIntroductionData(
    profile: FamilyProfileDetail,
    familyModeText: string,
    t: Translate,
): FamilyIntroductionSectionData {
    const mode = resolveFamilyMode(profile)

    return {
        mode,
        title: t('sections.familyIntroductionTitle'),
        subtitle: t(`familyIntroduction.${mode}`),
        facts: [
            createProfileFact(t('fields.familySupport'), familyModeText),
            createProfileFact(t('fields.verification'), profile.isVerified ? t('badges.verified') : t('badges.unverified')),
        ],
    }
}

/** 构建私人介绍申请 */
function buildPrivateIntroductionData(profile: FamilyProfileDetail): PrivateIntroductionSectionData {
    const {status} = profile.privateIntroduction

    return {
        status,
        quotaTotal: profile.privateIntroduction.quotaTotal,
        quotaRemaining: profile.privateIntroduction.quotaRemaining,
        canRequest: profile.privateIntroduction.canRequest,
        alreadyRequested: profile.privateIntroduction.alreadyRequested,
        showPrivateRoom: status === 'accepted',
    }
}

/** 构建徽章 */
function buildBadges(profile: FamilyProfileDetail, familyModeText: string, t: Translate): ProfileDetailBadgeItem[] {
    const verificationText = profile.isVerified ? t('badges.verified') : t('badges.unverified')
    const badges: ProfileDetailBadgeItem[] = [
        {label: familyModeText},
        {label: verificationText, tone: profile.isVerified ? 'highlight' : 'muted'},
    ]

    return badges
}

/** 构建受限字段 */
function accessFact(label: string, value: RestrictedProfileField<string>): ProfileDetailFactItem {
    if (value === PROFILE_FIELD_HIDDEN) {
        return {label, value: '', access: 'hidden'}
    }
    if (value === PROFILE_FIELD_MEMBER_ONLY) {
        return {label, value: '', access: 'masked', lockReason: 'member'}
    }
    if (value === PROFILE_FIELD_LOGIN_REQUIRED) {
        return {label, value: '', access: 'masked', lockReason: 'login'}
    }
    return {label, value}
}

/** 格式化受限布尔值 */
function formatRestrictedBoolean(value: RestrictedProfileField<boolean>, t: Translate): RestrictedProfileField<string> {
    return isRestrictedValue(value) ? value : formatBooleanText(value, t)
}

/** 格式化受限文本 */
function formatRestrictedText(value: RestrictedProfileField<string>): string {
    return isRestrictedValue(value) ? '' : value
}

/** 格式化偏好年龄范围 */
/** Format restricted languages through common options. */
function formatRestrictedLanguages(value: RestrictedProfileField<string[]>, optionLabel: OptionLabel): RestrictedProfileField<string> {
    return isRestrictedValue(value) ? value : value.map(item => optionLabel('languages', item.toUpperCase())).join(' / ')
}

/** Format an enum code through common options. */
function formatRestrictedEnum(fieldKey: string, value: RestrictedProfileField<string>, optionLabel: OptionLabel): RestrictedProfileField<string> {
    return isRestrictedValue(value) ? value : optionLabel(fieldKey, value)
}

/** Join enum code arrays through common options. */
function joinEnumValues(
    fieldKey: string,
    values: RestrictedProfileField<string[]>,
    optionLabel: OptionLabel,
): RestrictedProfileField<string> {
    return isRestrictedValue(values)
        ? values
        : values.map(value => optionLabel(fieldKey, value)).join(' / ')
}

function formatPreferredAgeRange(
    min: RestrictedProfileField<number>,
    max: RestrictedProfileField<number>,
): RestrictedProfileField<string> {
    if (isRestrictedValue(min)) return min
    if (isRestrictedValue(max)) return max

    return `${min}-${max}`
}

/** 拼接受限列表 */
function joinRestrictedList(value: RestrictedProfileField<string[]>): RestrictedProfileField<string> {
    return isRestrictedValue(value) ? value : value.join(' / ')
}

/** 判断是否为受限值 */
function isRestrictedValue(value: unknown): value is typeof PROFILE_FIELD_MEMBER_ONLY | typeof PROFILE_FIELD_LOGIN_REQUIRED | typeof PROFILE_FIELD_HIDDEN {
    return value === PROFILE_FIELD_MEMBER_ONLY || value === PROFILE_FIELD_LOGIN_REQUIRED || value === PROFILE_FIELD_HIDDEN
}

/** 判断资料是否包含指定受限值 */
function hasRestrictedValue(value: unknown, marker: typeof PROFILE_FIELD_MEMBER_ONLY | typeof PROFILE_FIELD_LOGIN_REQUIRED): boolean {
    if (value === marker) return true

    if (Array.isArray(value)) {
        return value.some(item => hasRestrictedValue(item, marker))
    }

    if (value && typeof value === 'object') {
        return Object.values(value).some(item => hasRestrictedValue(item, marker))
    }

    return false
}

/** 判断当前访问层级 */
function resolveAccessLevel(profile: FamilyProfileDetail): FamilyProfileDetailAccessLevel {
    if (hasRestrictedValue(profile, PROFILE_FIELD_LOGIN_REQUIRED)) return 'visitor'
    if (hasRestrictedValue(profile, PROFILE_FIELD_MEMBER_ONLY)) return 'registered'
    return 'premium'
}

/** 判断家庭协作模式 */
function resolveFamilyMode(profile: FamilyProfileDetail): FamilyIntroductionSectionData['mode'] {
    return 'context_only'
}

/** 解析家庭协作文案 */
function resolveFamilyModeText(profile: FamilyProfileDetail, t: Translate): string {
    return t(`familySupport.${resolveFamilyMode(profile)}`)
}

/** 空详情页数据 */
function emptyFamilyProfileDetailPageData(): FamilyProfileDetailPageData {
    return {
        accessLevel: 'visitor',
        heroData: null,
        snapshotFacts: [],
        familyReviewFacts: [],
        relationshipFacts: [],
        lifestyleFacts: [],
        preferenceFacts: [],
        valueFacts: [],
        familyIntroductionData: null,
        privateIntroductionData: null,
    }
}
