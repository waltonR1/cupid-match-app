import { ref } from 'vue'
import {login as loginApi, type LoginPayload} from '@/api/auth'
import { useAuthStore } from '@/stores/modules/auth'
import {useLocaleStore} from '@/stores/modules/locale'

/**
 * 登录业务 Hook
 *
 * 负责：
 * - 登录请求
 * - loading 状态
 * - 错误状态
 * - 写入认证 Store
 */
export function useLogin() {
  /** 认证 Store */
  const auth = useAuthStore()
  const locale = useLocaleStore()

  /** 登录加载状态 */
  const loading = ref(false)

  /** 登录错误信息 */
  const error = ref<unknown>(null)

  /**
   * 执行登录
   */
  async function login(payload: LoginPayload) {
    // 开始请求
    loading.value = true
    error.value = null

    try {
      // 调用登录接口
      const session = await loginApi(payload)

      auth.login(session)
      locale.setLocale(session.user.preferredLocale)

      return session
    } catch (requestError) {
      // 保存错误状态
      error.value = requestError

      // 继续向上抛出错误
      throw requestError
    } finally {
      // 无论成功失败都结束 loading
      loading.value = false
    }
  }

  return {
    loading,
    error,
    login,
  }
}
