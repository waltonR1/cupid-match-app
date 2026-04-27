import { ref } from 'vue'
import { login as loginApi, type LoginPayload } from '@/api/auth/auth'
import { useAuthStore } from '@/stores/modules/auth'

export function useLoginAction() {
  const auth = useAuthStore()
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null

    try {
      const session = await loginApi(payload)
      auth.login(session.user)
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
    login,
  }
}
