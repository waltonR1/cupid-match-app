import { ref } from 'vue'
import { register as registerApi, type RegisterPayload } from '@/api/auth/auth'

export function useRegister() {
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null

    try {
      return await registerApi(payload)
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
