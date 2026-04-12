import type { ApiResult } from './types'

export interface MockRequestOptions {
  delay?: number
}

export function mockRequest<T>(
  data: T,
  options: MockRequestOptions = {},
): Promise<ApiResult<T>> {
  const response: ApiResult<T> = {
    code: 0,
    message: 'ok',
    data,
  }

  if (!options.delay) {
    return Promise.resolve(response)
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response)
    }, options.delay)
  })
}
