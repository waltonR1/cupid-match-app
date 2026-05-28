import type { MembershipPlanDTO } from '@/api/account'
import type { MembershipPlanViewModel } from '@/types/membership/view'

export function formatPrice(cents?: number, currency?: string) {
  if (!cents) return ''
  const symbol = currency === 'USD' ? '$' : currency === 'CNY' ? '¥' : '€'
  return `${symbol}${(cents / 100).toFixed(0)}`
}

export function billingPeriodLabel(p: MembershipPlanDTO) {
  const map: Record<string, string> = { monthly: 'perMonthly', quarterly: 'perQuarterly', yearly: 'perYearly' }
  return map[p.billingPeriod || 'monthly'] || 'perMonthly'
}

export function planFeatureCodes(p: MembershipPlanDTO) {
  const features: string[] = []
  if (p.privateIntroductionQuota > 0) features.push(`intro:${p.privateIntroductionQuota}`)
  if (p.eventPriorityEnabled) features.push('event')
  if (p.staffReviewEnabled) features.push('review')
  if (p.profileDetailAccessLevel === 'premium') features.push('premium')
  if (p.conciergePriority) features.push('concierge')
  if (p.staffSupportLevel === 'concierge') features.push('conciergeLevel')
  else if (p.staffSupportLevel === 'priority') features.push('priorityLevel')
  return features
}

const featureI18nMap: Record<string, string> = {
  'intro': 'plans.featIntro',
  'event': 'plans.featEvent',
  'review': 'plans.featReview',
  'premium': 'plans.featPremium',
  'concierge': 'plans.featConcierge',
  'priorityLevel': 'plans.featPriorityLevel',
  'conciergeLevel': 'plans.featConciergeLevel',
}

export function featureLabel(t: (key: string, params?: Record<string, string | number>) => string, code: string) {
  const [key, n] = code.split(':')
  const i18nKey = featureI18nMap[key]
  if (!i18nKey) return code
  return n ? t(i18nKey, { n: Number(n) }) : t(i18nKey)
}

export function toMembershipPlanViewModel(p: MembershipPlanDTO): MembershipPlanViewModel {
  return {
    id: p.id,
    tier: p.tier,
    name: p.name,
    description: p.description,
    price: formatPrice(p.priceCents, p.currency),
    billingPeriodLabel: billingPeriodLabel(p),
    privateIntroductionQuota: p.privateIntroductionQuota,
    eventPriorityEnabled: p.eventPriorityEnabled,
    staffReviewEnabled: p.staffReviewEnabled,
    profileDetailAccessLevel: p.profileDetailAccessLevel,
    conciergePriority: p.conciergePriority,
    staffSupportLevel: p.staffSupportLevel,
    featured: p.featured,
    sortOrder: p.sortOrder,
    features: planFeatureCodes(p),
  }
}
