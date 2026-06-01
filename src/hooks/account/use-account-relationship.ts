import {computed, ref} from 'vue'
import {
    getAccountFavorites,
    getAccountIntroductions,
    getIntroductionContact,
    type AccountIntroductionSummaryDTO,
    type FavoriteProfileSummaryDTO,
    type IntroductionContactDTO,
    type IntroductionContactUnavailableDTO,
} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountRelationship() {
    const authStore = useAuthStore()
    const fav = useLatestRequest()
    const intro = useLatestRequest()
    const favorites = ref<FavoriteProfileSummaryDTO[]>([])
    const introductions = ref<AccountIntroductionSummaryDTO[]>([])
    const contactMap = ref<Record<string, IntroductionContactDTO | IntroductionContactUnavailableDTO | undefined>>({})
    const contactLoading = ref<Record<string, boolean>>({})

    void load()

    async function load() {
        if (!authStore.isLoggedIn) return

        const [f, i] = await Promise.all([
            fav.run(() => getAccountFavorites()),
            intro.run(() => getAccountIntroductions()),
        ])
        if (f) favorites.value = f
        if (i) introductions.value = i
    }

    async function revealContact(requestId: string) {
        if (!authStore.isLoggedIn) return

        contactLoading.value[requestId] = true
        try {
            const result = await getIntroductionContact(requestId)
            contactMap.value[requestId] = result
        } catch {
            contactMap.value[requestId] = {available: false, reason: 'not_found'}
        } finally {
            contactLoading.value[requestId] = false
        }
    }

    return {
        loading: computed(() => fav.loading.value || intro.loading.value),
        error: computed(() => fav.error.value || intro.error.value),
        favorites,
        introductions,
        contactMap,
        contactLoading,
        refresh: load,
        revealContact,
    }
}
