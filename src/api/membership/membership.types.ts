export type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond'

export interface MembershipPlanDTO {
  id: string
  tier: MembershipTier
  name: string
  description: string
  priceCents: number
  currency: 'EUR'
  cnyPriceCents: number
  billingType: 'free' | 'one_time' | 'recurring'
  billingPeriod?: 'monthly' | 'quarterly' | 'yearly'
  validityMonths?: number
  privateIntroductionQuota: number
  privateIntroductionPeriod: 'monthly' | 'quarterly' | 'yearly'
  eventQuota: number
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  conciergePriority: boolean
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  sortOrder: number
  featured: boolean
}

export interface MembershipCatalogDTO {
  plans: MembershipPlanDTO[]
}
