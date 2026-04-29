import { requestJson } from '@/api/shared/http'
import type {
  AccountDTO,
  AccountFavoriteProfileCard,
  AccountFavoriteRecordDTO,
  AccountMembershipLevel,
  AccountOverviewDTO,
  AccountPrivacySettingDTO,
  AccountProfileSummary,
  AccountThreadProfileCard,
  AccountThreadRecordDTO,
  AccountUserEventRecordDTO,
  FormatLocale,
} from './account.types'

export type {
  AccountDTO,
  AccountFavoriteProfileCard,
  AccountFavoriteRecordDTO,
  AccountMembershipLevel,
  AccountOverviewDTO,
  AccountPrivacySettingDTO,
  AccountProfileSummary,
  AccountThreadProfileCard,
  AccountThreadRecordDTO,
  AccountUserEventRecordDTO,
  FormatLocale,
} from './account.types'

export function getAccountOverview(): Promise<AccountOverviewDTO> {
  return requestJson<AccountOverviewDTO>('/account/overview')
}
