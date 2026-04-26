import { requestJson } from '@/api/shared/http'
import type { AccountApiClient } from './account.contract'
import type { AccountOverviewDTO } from './account.types'

export function createHttpAccountApiClient(): AccountApiClient {
  return {
    getAccountOverview() {
      return requestJson<AccountOverviewDTO>('/account/overview')
    },
  }
}
