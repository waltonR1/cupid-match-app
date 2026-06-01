import {ref} from 'vue'
import {getAccountEvents, type AccountEventRegistrationDTO} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountEvents() {
    const authStore = useAuthStore()
    const latest = useLatestRequest()
    const registrations = ref<AccountEventRegistrationDTO[]>([])

    void load()

    async function load() {
        if (!authStore.isLoggedIn) return

        const data = await latest.run(() => getAccountEvents())
        if (data) registrations.value = data
    }

    return {loading: latest.loading, error: latest.error, registrations, refresh: load}
}
