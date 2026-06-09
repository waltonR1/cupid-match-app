import type {MembershipPlanDTO} from '@/api/membership'
import type {Translate} from '@/i18n/types'
import type {MembershipPlanViewModel} from '@/types/membership/catalog'

export function toMembershipPlanViewModel(plan: MembershipPlanDTO, t: Translate): MembershipPlanViewModel {
  return {
    id: plan.id,
    tier: plan.tier,
    name: plan.name,
    euroPrice: formatWholePrice(plan.priceCents, '€'),
    cnyPrice: formatWholePrice(plan.cnyPriceCents, '¥'),
    validity: plan.validityMonths
      ? t('catalog.validityMonths', {count: plan.validityMonths})
      : t('catalog.noFixedValidity'),
    privateIntroduction: plan.privateIntroductionQuota > 0
      ? t('catalog.privateIntroductions', {count: plan.privateIntroductionQuota})
      : t('catalog.noPrivateIntroductions'),
    eventAllowance: plan.eventQuota > 0
      ? t('catalog.events', {count: plan.eventQuota})
      : t('catalog.noEvents'),
    featured: plan.featured,
  }
}

function formatWholePrice(cents: number, symbol: string) {
  const amount = cents / 100
  return `${symbol}${Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2)}`
}
