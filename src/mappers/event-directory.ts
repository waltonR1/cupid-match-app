import type { EventDirectoryItem, EventDirectoryQuery, EventsListResponse, FormatLocale } from '@/api/events'
import type { Translate } from '@/i18n/types'
import type { EventOverviewItem, EventStatItem } from '@/types/events/card'
import type { EventDirectoryFilters } from '@/types/events/directory'
import { formatEventDate } from '@/utils/locale-format'

export const EVENT_DIRECTORY_PAGE_SIZE = 12

export const DEFAULT_EVENT_DIRECTORY_FILTERS: EventDirectoryFilters = {
  city: '',
  status: '',
  visibility: '',
  month: '',
}

export function buildEventDirectoryQuery(params: {
  page: number
  pageSize: number
  filters: EventDirectoryFilters
}): EventDirectoryQuery {
  const { visibility, ...filters } = params.filters

  return {
    page: params.page,
    pageSize: params.pageSize,
    ...filters,
    ...(visibility ? { visibility } : {}),
  }
}

export function toEventDirectoryPageData(params: {
  response: EventsListResponse | null
  filters: EventDirectoryFilters
  locale: FormatLocale
  t: Translate
}) {
  const items = params.response?.items ?? []
  const pagination = params.response?.pagination ?? {
    page: 1,
    pageSize: EVENT_DIRECTORY_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  }

  return {
    fieldLabels: buildEventFieldLabels(params.t),
    nextEventCard: items[0] ? toEventOverviewItem(items[0], params.locale, params.t) : undefined,
    featuredEventCards: items
      .filter((item) => item.status === 'open' || item.status === 'waitlist')
      .slice(0, 3)
      .map((item) => toEventOverviewItem(item, params.locale, params.t)),
    scheduleEventCards: items.map((item) => toEventOverviewItem(item, params.locale, params.t)),
    pagination,
    statCards: buildStatCards(items, params.t),
  }
}

export function toEventOverviewItem(event: EventDirectoryItem, locale: FormatLocale, t: Translate): EventOverviewItem {
  return {
    id: event.id,
    title: event.title,
    summary: event.summary,
    coverImageUrl: event.coverImageUrl,
    date: formatEventDate(locale, event.date),
    time: `${event.startTime} - ${event.endTime}`,
    city: event.city,
    venue: event.venue,
    format: event.format,
    audience: event.audience,
    relationshipFocus: event.relationshipFocus,
    remainingSeatsText: t('seats.remaining', { count: event.remainingSeats }),
    waitlistText: event.waitlistCount > 0 ? t('seats.waitlist', { count: event.waitlistCount }) : undefined,
    memberOnly: event.memberOnly,
    status: resolveEventCardStatus(event),
    statusLabel: t(`status.${resolveEventCardStatus(event)}`),
  }
}

function buildEventFieldLabels(t: Translate) {
  return {
    date: t('fields.date'),
    city: t('fields.city'),
    venue: t('fields.venue'),
    address: t('fields.address'),
    format: t('fields.format'),
    audience: t('fields.audience'),
    seats: t('fields.seats'),
    focus: t('fields.focus'),
    languages: t('fields.languages'),
    advisorNote: t('fields.advisorNote'),
    status: t('fields.status'),
  }
}

function buildStatCards(items: EventDirectoryItem[], t: Translate): EventStatItem[] {
  return [
    { label: t('stats.totalEvents'), value: String(items.length) },
    { label: t('stats.openEvents'), value: String(items.filter((item) => item.status === 'open').length) },
    { label: t('stats.waitlistEvents'), value: String(items.filter((item) => item.status === 'waitlist').length) },
    { label: t('stats.cities'), value: String(new Set(items.map((item) => item.city)).size) },
  ]
}

function resolveEventCardStatus(event: EventDirectoryItem) {
  if (event.status === 'open' && event.memberOnly) return 'member'

  return event.status
}
