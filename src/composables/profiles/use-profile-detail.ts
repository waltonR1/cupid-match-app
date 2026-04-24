import { ref, watch, type Ref } from 'vue'
import { getProfileDetail, type Profile } from '@/api/modules/profiles'

export function useProfileDetail(profileId: Ref<string>) {
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)

  function loadProfile() {
    const id = profileId.value

    if (!id) {
      profile.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      profile.value = getProfileDetail(id)
    } catch (requestError) {
      profile.value = null
      error.value = requestError
      console.warn('Failed to load profile detail.', requestError)
    } finally {
      loading.value = false
    }
  }

  watch(
    profileId,
    () => {
      loadProfile()
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
