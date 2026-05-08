import {computed, ref, watch, type Ref} from 'vue'
import {
    getSelfProfileDetail,
    requestSelfProfilePrivateIntroduction,
    type FormatLocale,
    type SelfProfileDetail,
} from '@/api/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toSelfProfileDetailPageData} from '@/mappers/self-profile-detail-page'

/** 个人资料详情数据 */
export function useSelfProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const profile = ref<SelfProfileDetail | null>(null)

    watch([profileId, locale], () => {
        void load()
    }, {immediate: true})

    const pageData = computed(() => toSelfProfileDetailPageData({
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

        const nextProfile = await latest.run(() => getSelfProfileDetail(id))

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

        const nextIntroduction = await latest.run(() => requestSelfProfilePrivateIntroduction(id))
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
        relationshipFacts: computed(() => pageData.value.relationshipFacts),
        personalityFacts: computed(() => pageData.value.personalityFacts),
        preferenceFacts: computed(() => pageData.value.preferenceFacts),
        valueFacts: computed(() => pageData.value.valueFacts),
        lifestyleFacts: computed(() => pageData.value.lifestyleFacts),
        privateIntroductionData: computed(() => pageData.value.privateIntroductionData),
        requestPrivateIntroduction,
        refresh: load,
    }
}
