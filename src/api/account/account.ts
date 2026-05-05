import { requestJson } from '@/api/shared/http'
import type {AccountOverviewResponse} from './account.types'

export function getAccountOverview(): Promise<AccountOverviewResponse> {
  return requestJson<AccountOverviewResponse>('/account/overview')
}
