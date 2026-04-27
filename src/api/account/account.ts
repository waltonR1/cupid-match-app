import { requestJson } from '@/api/shared/http'
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

export function getAccountOverview(): Promise<AccountOverviewDTO> {
  return requestJson<AccountOverviewDTO>('/account/overview')
}
