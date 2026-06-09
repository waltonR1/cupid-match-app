export type EventRegistrationDebugStatus =
  | 'requested'
  | 'confirmed'
  | 'declined'
  | 'waitlist'
  | 'cancelled'
  | 'attended'

export type EventRegistrationDebugReviewStatus = 'confirmed' | 'declined' | 'waitlist'

export interface EventRegistrationDebugItem {
  id: string
  eventId: string
  eventTitle: string
  userId: string
  userName: string
  status: EventRegistrationDebugStatus
  requestedAt: string
  confirmedAt?: string
  declinedAt?: string
  cancelledAt?: string
  eventQuotaConsumedAt?: string
  eventQuotaReleasedAt?: string
}

export interface EventRegistrationDebugResponse {
  items: EventRegistrationDebugItem[]
}
