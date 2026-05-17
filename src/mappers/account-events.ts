import type { AccountEventRegistrationDTO } from '@/api/account'
import type { EventCardStatus } from '@/types/events/card'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

export function toAccountEventsPageData(params: {
  registrations: AccountEventRegistrationDTO[]
  locale: FormatLocale
}) {
  const registrations = params.registrations.map((item) => ({
    registrationId: item.registrationId,
    eventId: item.eventId,
    title: item.title,
    coverImageUrl: item.coverImageUrl,
    city: item.city,
    venue: item.venue,
    dateText: formatLocalizedDate(params.locale, item.date),
    timeText: `${item.startTime}-${item.endTime}`,
    status: item.status,
    badgeStatus: toRegistrationBadgeStatus(item.status),
  }))

  return {
    attentionRegistrations: registrations.filter((item) =>
      ['requested', 'confirmed', 'waitlist'].includes(item.status),
    ),
    historyRegistrations: registrations.filter((item) =>
      ['attended', 'declined', 'cancelled'].includes(item.status),
    ),
  }
}

function toRegistrationBadgeStatus(status: AccountEventRegistrationDTO['status']): EventCardStatus {
  if (status === 'confirmed') return 'open'
  if (status === 'requested' || status === 'waitlist') return 'waitlist'
  return 'closed'
}
