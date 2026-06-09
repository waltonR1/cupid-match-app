import {computed, ref, watch, type Ref} from 'vue'
import {
    getFamilyProfileDetail,
    requestFamilyProfilePrivateIntroduction,
    type FamilyProfileDetail,
    type FormatLocale,
} from '@/api/profiles'
import { addFavorite, removeFavorite } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import type { Translate } from '@/i18n/types'
import { toFamilyProfileDetailPageData } from '@/mappers/profiles/family-detail-page'

export function useFamilyProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>, showToast?: (msg: string, type?: 'success' | 'error' | 'info') => void) {
    const latest = useLatestRequest()
    const profile = ref<FamilyProfileDetail | null>(null)

    watch([profileId, locale], () => { void load() }, {immediate: true})

    const pageData = computed(() => toFamilyProfileDetailPageData({
        profile: profile.value, locale: locale.value, t,
    }))
    const accessLevel = computed(() => pageData.value.accessLevel)
    const favorite = computed(() => profile.value?.favorite ?? { isFavorite: false, canFavorite: false })
    const favoriteLoading = ref(false)
    const canFavorite = computed(() => favorite.value.canFavorite)

    async function toggleFavorite() {
        const id = profileId.value
        if (!id || !profile.value || favoriteLoading.value) return
        favoriteLoading.value = true
        try {
            if (favorite.value.isFavorite) {
                await removeFavorite(id)
                profile.value = { ...profile.value, favorite: { isFavorite: false, canFavorite: true } }
            } else {
                const result = await addFavorite(id)
                if (result) {
                    profile.value = { ...profile.value, favorite: { isFavorite: true, favoriteId: result.favoriteId, canFavorite: true } }
                }
            }
        } catch {
            showToast?.(t('actions.favoriteFailed'), 'error')
        } finally {
            favoriteLoading.value = false
        }
    }

    async function load() {
        const id = profileId.value
        if (!id) { profile.value = null; return }
        const nextProfile = await latest.run(() => getFamilyProfileDetail(id))
        if (nextProfile === undefined) {
            if (latest.error.value !== null) profile.value = null
            return
        }
        profile.value = nextProfile
    }

    async function requestPrivateIntroduction() {
        const id = profileId.value
        if (!id) return
        const nextIntroduction = await latest.run(() => requestFamilyProfilePrivateIntroduction(id))
        if (!nextIntroduction || !profile.value) return
        profile.value = { ...profile.value, privateIntroduction: nextIntroduction }
    }

    return {
        loading: latest.loading, error: latest.error,
        accessLevel, heroData: computed(() => pageData.value.heroData),
        snapshotFacts: computed(() => pageData.value.snapshotFacts),
        familyReviewFacts: computed(() => pageData.value.familyReviewFacts),
        relationshipFacts: computed(() => pageData.value.relationshipFacts),
        lifestyleFacts: computed(() => pageData.value.lifestyleFacts),
        preferenceFacts: computed(() => pageData.value.preferenceFacts),
        valueFacts: computed(() => pageData.value.valueFacts),
        familyIntroductionData: computed(() => pageData.value.familyIntroductionData),
        privateIntroductionData: computed(() => pageData.value.privateIntroductionData),
        favorite, canFavorite, favoriteLoading, toggleFavorite,
        requestPrivateIntroduction, refresh: load,
    }
}
