import { logoutSession } from '@/api/auth'
import { useAuthStore } from '@/stores/modules/auth'

export function useLogout() {
  const auth = useAuthStore()

  async function logout() {
    try {
      await logoutSession()
    } catch {
      // Network failures must not keep the local session signed in.
    } finally {
      auth.logout()
    }
  }

  return { logout }
}
