import { ref } from 'vue'
import {register as registerApi, type RegisterPayload} from '@/api/auth'
import {useAuthStore} from '@/stores/modules/auth'
import {useLocaleStore} from '@/stores/modules/locale'

/** 注册业务 Hook */
export function useRegister() {
  const auth = useAuthStore()
  const locale = useLocaleStore()
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null

    try {
      const session = await registerApi(payload)
      auth.login(session)
      locale.setLocale(session.user.preferredLocale)
      return session
    } catch (requestError) {
      error.value = requestError
      throw requestError
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    register,
  }
}
