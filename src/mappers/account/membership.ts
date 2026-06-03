import type { AccountMembershipDTO, MembershipPlanDTO } from '@/api/account'

/** 找到当前等级之上的下一级会员方案 */
export function findNextPlan(plans: MembershipPlanDTO[], currentTier?: AccountMembershipDTO['tier']) {
  const tierOrder: AccountMembershipDTO['tier'][] = ['free', 'silver', 'gold', 'diamond']
  const currentIndex = currentTier ? tierOrder.indexOf(currentTier) : -1
  const nextTier = tierOrder[currentIndex + 1]
  return plans.find((item) => item.tier === nextTier) ?? null
}
