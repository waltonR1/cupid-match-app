import { ref } from 'vue'
import { register as registerApi, type RegisterPayload } from '@/api/modules/auth'

export function useRegister() {
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null

    try {
      const response = await registerApi(payload)
      return response.data
    } catch (requestError) {
      error.value = requestError
      console.warn('Failed to register.', requestError)
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
