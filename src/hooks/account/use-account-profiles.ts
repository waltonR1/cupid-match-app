import {ref} from 'vue'
import {getAccountProfiles, type AccountProfilesDTO} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountProfiles() {
    const authStore = useAuthStore()
    const latest = useLatestRequest()
    const payload = ref<AccountProfilesDTO | null>(null)

    void load()

    async function load() {
        if (!authStore.isLoggedIn) return

        const data = await latest.run(() => getAccountProfiles())
        if (data) payload.value = data
    }

    return {loading: latest.loading, error: latest.error, payload, refresh: load}
}
