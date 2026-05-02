import { ref, type Ref } from 'vue'

type LatestRequestTask<T> = () => Promise<T>

export interface UseLatestRequestResult {
  loading: Ref<boolean>
  error: Ref<unknown>
  run: <T>(task: LatestRequestTask<T>) => Promise<T | undefined>
}

/**
 * 统一管理“仅最新请求生效”的异步请求状态。
 * 只有最新请求可以更新 loading 和 error，过期请求的结果、异常和 finally 都会被忽略。
 */
export function useLatestRequest(): UseLatestRequestResult {
  const loading = ref(false)
  const error = ref<unknown>(null)
  let requestToken = 0

  async function run<T>(task: LatestRequestTask<T>): Promise<T | undefined> {
    const currentToken = ++requestToken

    loading.value = true
    error.value = null

    try {
      const response = await task()

      if (currentToken !== requestToken) return undefined

      return response
    } catch (requestError: unknown) {
      if (currentToken !== requestToken) return undefined

      error.value = requestError
      return undefined
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  return {
    loading,
    error,
    run,
  }
}
