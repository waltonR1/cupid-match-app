import { requestJson } from '@/api/shared/http'
import type {AccountOverviewQuery, AccountOverviewResponse} from './account.types'

export function getAccountOverview(query: AccountOverviewQuery): Promise<AccountOverviewResponse> {
  return requestJson<AccountOverviewResponse>('/account/overview', {query})
}
