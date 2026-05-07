import {computed, ref, watch, type Ref} from 'vue'
import {getFamilyProfileDetail, type FamilyProfileDetail, type FormatLocale} from '@/api/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import type {ProfileDetailBadgeItem} from '@/types/profiles/detail'
import {formatLocalizedDate} from '@/utils/locale-format'
import {
    createProfileFact,
    formatBooleanText,
    formatLocalizedAge,
    formatProfileLanguages,
} from '@/utils/profile-format'

/** 家庭资料详情数据 */
export function useFamilyProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const profile = ref<Awaited<ReturnType<typeof getFamilyProfileDetail>>>(null)

    /** ID 或语言变化时重新加载详情 */
    watch([profileId, locale], () => {
        void load()
    }, {immediate: true})

    /** 页面展示数据 */
    const pageData = computed(() => {
        if (!profile.value) {
            return {
                heroData: null,
                overviewFacts: [],
                relationshipFacts: [],
                lifestyleFacts: [],
                spotlightFacts: [],
                intentText: '',
                relationshipPlanText: '',
                highlightTexts: [],
                tagTexts: [],
            }
        }

        const recordId = profile.value.id.toUpperCase()
        const verificationText = profile.value.isVerified ? t('badges.verified') : t('badges.unverified')
        const visibilityText = profile.value.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
        const familyModeText = resolveFamilyModeText(profile.value, t)
        const badges: ProfileDetailBadgeItem[] = [
            {label: familyModeText},
            {label: visibilityText, tone: profile.value.familyVisible ? 'highlight' : 'muted'},
            {label: verificationText, tone: profile.value.isVerified ? 'highlight' : 'muted'},
        ]

        return {
            heroData: {
                eyebrow: t('hero.eyebrow'),
                recordId,
                avatarUrl: profile.value.avatarUrl,
                displayName: profile.value.displayName,
                gender: profile.value.gender,
                meta: [
                    formatLocalizedAge(locale.value, profile.value.age),
                    profile.value.city,
                    profile.value.education,
                ].join(' / '),
                summary: profile.value.relationshipPlan,
                badges,
                indexTitle: t('sections.archiveIndex'),
                indexFacts: [
                    createProfileFact(t('fields.recordNumber'), recordId),
                    createProfileFact(t('fields.city'), profile.value.city),
                    createProfileFact(t('fields.education'), profile.value.education),
                    createProfileFact(t('fields.residencePlan'), profile.value.residencePlan),
                    createProfileFact(t('fields.lastActive'), formatLocalizedDate(locale.value, profile.value.lastActiveAt)),
                    createProfileFact(t('fields.joinedAt'), formatLocalizedDate(locale.value, profile.value.joinedAt)),
                ],
            },
            overviewFacts: [
                createProfileFact(t('fields.age'), formatLocalizedAge(locale.value, profile.value.age)),
                createProfileFact(t('fields.city'), profile.value.city),
                createProfileFact(t('fields.country'), profile.value.country),
                createProfileFact(t('fields.nationality'), profile.value.nationality),
                createProfileFact(t('fields.education'), profile.value.education),
                createProfileFact(t('fields.job'), profile.value.occupation),
                createProfileFact(t('fields.industry'), profile.value.industry),
                createProfileFact(t('fields.income'), profile.value.incomeRange),
                createProfileFact(t('fields.residencePlan'), profile.value.residencePlan),
            ],
            relationshipFacts: [
                createProfileFact(t('fields.maritalStatus'), t(`maritalStatus.${profile.value.maritalStatus}`)),
                createProfileFact(t('fields.children'), formatBooleanText(profile.value.hasChildren, t)),
                createProfileFact(t('fields.wantChildren'), formatBooleanText(profile.value.wantsChildren, t)),
                createProfileFact(t('fields.longDistance'), formatBooleanText(profile.value.acceptsLongDistance, t)),
                createProfileFact(t('fields.familySupport'), familyModeText),
            ],
            lifestyleFacts: [
                createProfileFact(t('fields.languages'), formatProfileLanguages(locale.value, profile.value.languages)),
                createProfileFact(t('fields.exercise'), profile.value.exercise),
                createProfileFact(t('fields.smoke'), t(`habits.${profile.value.smoking}`)),
                createProfileFact(t('fields.drink'), t(`habits.${profile.value.drinking}`)),
            ],
            spotlightFacts: [
                createProfileFact(t('fields.intent'), profile.value.datingIntentionLabel),
                createProfileFact(t('fields.maritalPlan'), profile.value.relationshipPlan),
                createProfileFact(t('fields.longDistance'), formatBooleanText(profile.value.acceptsLongDistance, t)),
                createProfileFact(t('fields.familySupport'), familyModeText),
            ],
            intentText: profile.value.datingIntentionLabel,
            relationshipPlanText: profile.value.relationshipPlan,
            highlightTexts: [
                profile.value.summary,
                `${t('fields.residencePlan')}: ${profile.value.residencePlan}`,
                `${t('fields.longDistance')}: ${formatBooleanText(profile.value.acceptsLongDistance, t)}`,
            ],
            tagTexts: profile.value.tags.slice(0, 3),
        }
    })

    /** 加载家庭资料详情 */
    async function load() {
        const id = profileId.value

        if (!id) {
            profile.value = null
            return
        }

        const nextProfile = await latest.run(() => getFamilyProfileDetail(id))

        if (nextProfile === undefined) {
            if (latest.error.value !== null) {
                profile.value = null
            }
            return
        }

        profile.value = nextProfile
    }

    return {
        loading: latest.loading,
        error: latest.error,
        heroData: computed(() => pageData.value.heroData),
        overviewFacts: computed(() => pageData.value.overviewFacts),
        relationshipFacts: computed(() => pageData.value.relationshipFacts),
        lifestyleFacts: computed(() => pageData.value.lifestyleFacts),
        spotlightFacts: computed(() => pageData.value.spotlightFacts),
        intentText: computed(() => pageData.value.intentText),
        relationshipPlanText: computed(() => pageData.value.relationshipPlanText),
        highlightTexts: computed(() => pageData.value.highlightTexts),
        tagTexts: computed(() => pageData.value.tagTexts),
        refresh: load,
    }
}

/** 解析家庭支持模式文案 */
function resolveFamilyModeText(profile: FamilyProfileDetail, t: Translate) {
    if (profile.familyPriority) return t('familySupport.priority')
    if (profile.allowFamilyContact) return t('familySupport.contactReady')
    return t('familySupport.contextOnly')
}
