import { onMounted, ref } from 'vue'
import { listHomePreviewProfiles, type Profile } from '@/api/modules/profiles'

export function useHomePreviewProfiles() {
  const profiles = ref<Profile[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadProfiles()
  })

  async function loadProfiles() {
    loading.value = true
    error.value = null

    try {
      const response = await listHomePreviewProfiles()
      profiles.value = response.data
    } catch (requestError) {
      profiles.value = []
      error.value = requestError
      console.warn('Failed to load home preview profiles.', requestError)
    } finally {
      loading.value = false
    }
  }

  return {
    profiles,
    loading,
    error,
    refresh: loadProfiles,
  }
}
