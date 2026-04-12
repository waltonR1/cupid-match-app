import { ref } from 'vue'
import { login as loginApi, type LoginPayload } from '@/api/modules/auth'
import { useAuthStore } from '@/stores/modules/auth'

export function useLogin() {
  const auth = useAuthStore()
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null

    try {
      const response = await loginApi(payload)
      auth.login(response.data.user)
      return response.data
    } catch (requestError) {
      error.value = requestError
      console.warn('Failed to login.', requestError)
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
