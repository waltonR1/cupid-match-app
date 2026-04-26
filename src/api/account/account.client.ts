import type { AccountApiClient } from './account.contract'
import { createHttpAccountApiClient } from './account.http'
import type {
  AccountDTO,
  AccountFavoriteRecordDTO,
  AccountMembershipLevel,
  AccountOverviewDTO,
  AccountPrivacySettingDTO,
  AccountProfileDTO,
  AccountThreadRecordDTO,
  AccountUserEventRecordDTO,
  FormatLocale,
  LocalizedTextDTO,
} from './account.types'

const accountApiClient = createHttpAccountApiClient()

export type { AccountApiClient }
export type {
  AccountDTO,
  AccountFavoriteRecordDTO,
  AccountMembershipLevel,
  AccountOverviewDTO,
  AccountPrivacySettingDTO,
  AccountProfileDTO,
  AccountThreadRecordDTO,
  AccountUserEventRecordDTO,
  FormatLocale,
  LocalizedTextDTO,
} from './account.types'

export function getAccountApiClient() {
  return accountApiClient
}

export function getAccountOverview(): Promise<AccountOverviewDTO> {
  return accountApiClient.getAccountOverview()
}
