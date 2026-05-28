export interface MembershipPlanViewModel {
  id: string
  tier: 'free' | 'silver' | 'gold' | 'diamond'
  name: string
  description: string
  price: string
  billingPeriodLabel: string
  privateIntroductionQuota: number
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  conciergePriority: boolean
  staffSupportLevel: string
  featured: boolean
  sortOrder: number
  features: string[]
}
