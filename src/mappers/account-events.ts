import type { AccountEventRegistrationDTO } from '@/api/account'
import type { EventCardStatus } from '@/types/events/card'

/** 将报名状态映射为卡片的视觉状态 */
export function toBadgeStatus(status: AccountEventRegistrationDTO['status']): EventCardStatus {
  if (status === 'confirmed') return 'open'
  if (status === 'requested' || status === 'waitlist') return 'waitlist'
  return 'closed'
}

/** 按状态将报名记录分为"关注中"和"历史"两组 */
export function groupRegistrations(registrations: AccountEventRegistrationDTO[]) {
  return {
    attention: registrations.filter((item) =>
      ['requested', 'confirmed', 'waitlist'].includes(item.status),
    ),
    history: registrations.filter((item) =>
      ['attended', 'declined', 'cancelled'].includes(item.status),
    ),
  }
}
