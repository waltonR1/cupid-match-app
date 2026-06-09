import type {MembershipTier} from '@/api/membership'

export interface MembershipPlanViewModel {
  id: string
  tier: MembershipTier
  name: string
  euroPrice: string
  cnyPrice: string
  validity: string
  privateIntroduction: string
  eventAllowance: string
  featured: boolean
}
