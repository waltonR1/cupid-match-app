import { ref } from 'vue'
import {register as registerApi, type RegisterPayload} from '@/api/auth'

/**
 * 注册业务 Hook
 *
 * 负责：
 * - 注册请求
 * - loading 状态
 * - 错误状态
 */
export function useRegister() {
  /** 注册加载状态 */
  const loading = ref(false)

  /** 注册错误信息 */
  const error = ref<unknown>(null)

  /**
   * 执行注册
   */
  async function register(payload: RegisterPayload) {
    // 开始请求
    loading.value = true
    error.value = null

    try {
      // 调用注册接口
      return await registerApi(payload)
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
    register,
  }
}