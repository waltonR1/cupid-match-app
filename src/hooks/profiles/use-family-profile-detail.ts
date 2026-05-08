import {computed, ref, watch, type Ref} from 'vue'
import {
    getFamilyProfileDetail,
    requestFamilyProfilePrivateIntroduction,
    type FamilyProfileDetail,
    type FormatLocale,
} from '@/api/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toFamilyProfileDetailPageData} from '@/mappers/family-profile-detail-page'

/** 家庭资料详情数据 */
export function useFamilyProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const profile = ref<FamilyProfileDetail | null>(null)

    watch([profileId, locale], () => {
        void load()
    }, {immediate: true})

    const pageData = computed(() => toFamilyProfileDetailPageData({
        profile: profile.value,
        locale: locale.value,
        t,
    }))

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

    async function requestPrivateIntroduction() {
        const id = profileId.value
        if (!id) return

        const nextIntroduction = await latest.run(() => requestFamilyProfilePrivateIntroduction(id))
        if (!nextIntroduction || !profile.value) return

        profile.value = {
            ...profile.value,
            privateIntroduction: nextIntroduction,
        }
    }

    return {
        loading: latest.loading,
        error: latest.error,
        accessLevel: computed(() => pageData.value.accessLevel),
        heroData: computed(() => pageData.value.heroData),
        snapshotFacts: computed(() => pageData.value.snapshotFacts),
        familyReviewFacts: computed(() => pageData.value.familyReviewFacts),
        relationshipFacts: computed(() => pageData.value.relationshipFacts),
        lifestyleFacts: computed(() => pageData.value.lifestyleFacts),
        preferenceFacts: computed(() => pageData.value.preferenceFacts),
        valueFacts: computed(() => pageData.value.valueFacts),
        familyIntroductionData: computed(() => pageData.value.familyIntroductionData),
        privateIntroductionData: computed(() => pageData.value.privateIntroductionData),
        requestPrivateIntroduction,
        refresh: load,
    }
}
