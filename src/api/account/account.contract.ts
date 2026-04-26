import type { AccountOverviewDTO } from './account.types'

export interface AccountApiClient {
  getAccountOverview(): Promise<AccountOverviewDTO>
}
