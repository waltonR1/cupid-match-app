import type { AccountEventRegistrationDTO } from '@/api/account'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

export function toAccountEventsPageData(params: {
  registrations: AccountEventRegistrationDTO[]
  locale: FormatLocale
}) {
  return {
    eventRegistrations: params.registrations.map((item) => ({
      registrationId: item.registrationId,
      eventId: item.eventId,
      title: item.title,
      coverImageUrl: item.coverImageUrl,
      city: item.city,
      venue: item.venue,
      addressText: item.address,
      dateText: formatLocalizedDate(params.locale, item.date),
      timeText: `${item.startTime}-${item.endTime}`,
      status: item.status,
    })),
  }
}
