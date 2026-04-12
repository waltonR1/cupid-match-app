import { ref, watch, type Ref } from 'vue'
import { getProfileDetail, type Profile } from '@/api/modules/profiles'

export function useProfileDetail(profileId: Ref<string>) {
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)
  let requestId = 0

  async function loadProfile() {
    const id = profileId.value
    const currentRequestId = ++requestId

    if (!id) {
      profile.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await getProfileDetail(id)

      if (currentRequestId !== requestId) return

      profile.value = response.data
    } catch (requestError) {
      if (currentRequestId !== requestId) return

      profile.value = null
      error.value = requestError
      console.warn('Failed to load profile detail.', requestError)
    } finally {
      if (currentRequestId === requestId) {
        loading.value = false
      }
    }
  }

  watch(
    profileId,
    () => {
      void loadProfile()
    },
    { immediate: true },
  )

  return {
    profile,
    loading,
    error,
    refresh: loadProfile,
  }
}
