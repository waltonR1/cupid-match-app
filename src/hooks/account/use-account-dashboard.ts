import {ref} from 'vue'
import {getAccountDashboard, type AccountDashboardDTO} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountDashboard() {
    const authStore = useAuthStore()
    const latest = useLatestRequest()
    const payload = ref<AccountDashboardDTO | null>(null)

    void load()

    async function load() {
        if (!authStore.isLoggedIn) return

        const data = await latest.run(() => getAccountDashboard())
        if (data) payload.value = data
    }

    return {loading: latest.loading, error: latest.error, payload, refresh: load}
}
