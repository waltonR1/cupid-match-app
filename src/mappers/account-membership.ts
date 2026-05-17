import type {
  AccountEntitlementBalanceDTO,
  AccountMembershipDTO,
  MembershipPlanDTO,
} from '@/api/account'
import type { Translate } from '@/i18n/types'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

/** 将会员接口数据转换为会员页面可直接使用的数据。 */
export function toAccountMembershipPageData(params: {
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  availablePlans: MembershipPlanDTO[]
  t: Translate
  locale: FormatLocale
}) {
  const { membership, entitlements, availablePlans, t, locale } = params

  return {
    currentPlan: membership
      ? {
          ...membership,
          startedAtText: formatLocalizedDate(locale, membership.startedAt),
          expiresAtText: membership.expiresAt ? formatLocalizedDate(locale, membership.expiresAt) : undefined,
        }
      : null,
    entitlementBalances: entitlements.map((item) => ({
      ...item,
      label: t(`membership.entitlement.${item.code}`),
      displayValue: item.quotaTotal > 0
        ? `${item.quotaRemaining} / ${item.quotaTotal}`
        : t(`membership.entitlementState.${item.code}`),
    })),
    nextPlan: findNextPlan(availablePlans, membership?.tier),
  }
}

function findNextPlan(plans: MembershipPlanDTO[], currentTier?: AccountMembershipDTO['tier']) {
  const tierOrder: AccountMembershipDTO['tier'][] = ['free', 'silver', 'gold', 'diamond']
  const currentIndex = currentTier ? tierOrder.indexOf(currentTier) : -1
  const nextTier = tierOrder[currentIndex + 1]
  return plans.find((item) => item.tier === nextTier) ?? null
}
