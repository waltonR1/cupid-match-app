import type { AccountIntroductionSummaryDTO } from '@/api/account'

/** 将介绍请求按状态分为"进行中"和"历史"两组 */
export function splitIntroductions(items: AccountIntroductionSummaryDTO[]) {
  return {
    attention: items.filter((item) => item.status === 'requested'),
    history: items.filter((item) => item.status !== 'requested'),
  }
}
