import { requestJson } from '@/api/shared/http'
import type {
  Account,
  AccountFavoriteProfileCard,
  AccountFavoriteRecord,
  AccountMembershipLevel,
  AccountOverviewResponse,
  AccountPrivacySetting,
  AccountProfileSummary,
  AccountThreadProfileCard,
  AccountThreadRecord,
  AccountUserEventRecord,
  FormatLocale,
} from './account.types'

export type {
  Account,
  AccountFavoriteProfileCard,
  AccountFavoriteRecord,
  AccountMembershipLevel,
  AccountOverviewResponse,
  AccountPrivacySetting,
  AccountProfileSummary,
  AccountThreadProfileCard,
  AccountThreadRecord,
  AccountUserEventRecord,
  FormatLocale,
} from './account.types'

export function getAccountOverview(): Promise<AccountOverviewResponse> {
  return requestJson<AccountOverviewResponse>('/account/overview')
}
