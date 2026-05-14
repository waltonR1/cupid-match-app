import type { ApiLocale, Pagination, QueryRecord } from '../types/common.js'
import type { Database, EventRecord, EventRegistrationRecord } from '../types/database.js'
import { resolveLocalizedText } from '../utils/localized.js'

type EventRegistrationStatus =
  | 'guest'
  | 'available'
  | 'requested'
  | 'confirmed'
  | 'declined'
  | 'waitlist'
  | 'cancelled'
  | 'closed'
  | 'member_required'

interface EventDirectoryQuery {
  page: number
  pageSize: number
  city?: string
  status?: string
  visibility?: 'public' | 'registered' | 'member'
  month?: string
}

interface EventRegistrationState {
  status: EventRegistrationStatus
  registrationId?: string
}

interface EventRegistrationResponse {
  registration: EventRegistrationState
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
}

type EventActionResult =
  | { status: 'not_found' }
  | { status: 'login_required'; payload: EventRegistrationResponse }
  | { status: 'blocked'; payload: EventRegistrationResponse }
  | { status: 'success'; payload: EventRegistrationResponse }

export function listEvents(locale: ApiLocale, data: Database, rawQuery: QueryRecord) {
  const query = normalizeDirectoryQuery(rawQuery)
  const filteredEvents = data.events
    .filter((event) => event.status !== 'draft')
    .filter((event) => !query.city || resolveLocalizedText(locale, event.city) === query.city)
    .filter((event) => !query.status || event.status === query.status)
    .filter((event) => !query.visibility || event.visibility === query.visibility)
    .filter((event) => !query.month || event.date.startsWith(query.month))
    .sort((left, right) => left.date.localeCompare(right.date))

  const pagination = buildPagination(filteredEvents.length, query.page, query.pageSize)
  const pageItems = filteredEvents.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)

  return {
    items: pageItems.map((event) => toDirectoryItem(locale, data, event)),
    pagination,
    facets: buildFacets(locale, data.events.filter((event) => event.status !== 'draft')),
  }
}

export function eventDetail(locale: ApiLocale, data: Database, id: string, userId: string) {
  const event = data.events.find((item) => item.id === id)
  if (!event || event.status === 'draft') {
    return null
  }

  const registration = resolveRegistrationState(data, event, userId)
  const address = resolveEventAddress(locale, event, userId, registration)

  return {
    ...toDirectoryItem(locale, data, event),
    address: address.address,
    addressVisible: address.addressVisible,
    addressLockReason: address.addressLockReason,
    languageCodes: event.languageCodes,
    advisorNote: resolveLocalizedText(locale, event.advisorNote),
    agendaItems: data.event_agenda_items
      .filter((item) => item.eventId === event.id)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => ({
        id: item.id,
        time: item.time,
        title: resolveLocalizedText(locale, item.title),
        desc: resolveLocalizedText(locale, item.desc),
        sortOrder: item.sortOrder,
      })),
    registration,
  }
}

export function registerForEvent(data: Database, eventId: string, userId: string): EventActionResult {
  const event = data.events.find((item) => item.id === eventId)
  if (!event) return { status: 'not_found' }

  if (!userId) {
    return { status: 'login_required', payload: buildRegistrationResponse(data, event, { status: 'guest' }) }
  }

  const currentState = resolveRegistrationState(data, event, userId)
  if (currentState.status === 'member_required' || currentState.status === 'closed') {
    return { status: 'blocked', payload: buildRegistrationResponse(data, event, currentState) }
  }

  // Mock storage is in-memory JSON; the structured database should enforce unique(userId, eventId).
  const existing = data.event_registrations.find((item) => item.userId === userId && item.eventId === eventId)
  if (existing && existing.status !== 'cancelled' && existing.status !== 'declined') {
    return { status: 'success', payload: buildRegistrationResponse(data, event, currentState) }
  }

  const now = new Date().toISOString()
  const nextStatus = 'requested'
  const nextRecord: EventRegistrationRecord = existing ?? {
    id: nextEventRegistrationId(data),
    userId,
    eventId,
    status: nextStatus,
    requestedAt: now,
    createdAt: now,
    updatedAt: now,
  }

  nextRecord.status = nextStatus
  nextRecord.requestedAt = now
  nextRecord.confirmedAt = undefined
  nextRecord.declinedAt = undefined
  nextRecord.cancelledAt = undefined
  nextRecord.updatedAt = now

  if (!existing) {
    data.event_registrations.push(nextRecord)
  }

  return {
    status: 'success',
    payload: buildRegistrationResponse(data, event, {
      status: nextStatus,
      registrationId: nextRecord.id,
    }),
  }
}

export function cancelEventRegistration(data: Database, eventId: string, userId: string): EventActionResult {
  const event = data.events.find((item) => item.id === eventId)
  if (!event) return { status: 'not_found' }

  if (!userId) {
    return { status: 'login_required', payload: buildRegistrationResponse(data, event, { status: 'guest' }) }
  }

  const existing = data.event_registrations.find((item) => item.userId === userId && item.eventId === eventId)
  if (!existing) {
    return { status: 'blocked', payload: buildRegistrationResponse(data, event, resolveRegistrationState(data, event, userId)) }
  }

  const now = new Date().toISOString()
  existing.status = 'cancelled'
  existing.cancelledAt = now
  existing.updatedAt = now

  return {
    status: 'success',
    payload: buildRegistrationResponse(data, event, {
      status: 'cancelled',
      registrationId: existing.id,
    }),
  }
}

function toDirectoryItem(locale: ApiLocale, data: Database, event: EventRecord) {
  const registeredCount = countRegistrations(data, event.id, 'confirmed')
  const waitlistCount = countRegistrations(data, event.id, 'waitlist')

  return {
    id: event.id,
    slug: event.slug,
    status: event.status,
    title: resolveLocalizedText(locale, event.title),
    summary: resolveLocalizedText(locale, event.summary),
    city: resolveLocalizedText(locale, event.city),
    venue: resolveLocalizedText(locale, event.venue),
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    format: resolveLocalizedText(locale, event.format),
    audience: resolveLocalizedText(locale, event.audience),
    relationshipFocus: event.relationshipFocus.map((item) => resolveLocalizedText(locale, item)),
    capacity: event.capacity,
    registeredCount,
    waitlistCount,
    remainingSeats: Math.max(event.capacity - registeredCount, 0),
    memberOnly: event.visibility === 'member',
    coverImageUrl: event.coverImageUrl,
  }
}

function resolveRegistrationState(data: Database, event: EventRecord, userId: string): EventRegistrationState {
  if (!userId) return { status: 'guest' }

  const existing = data.event_registrations.find((item) => item.userId === userId && item.eventId === event.id)
  if (existing) {
    return {
      status: existing.status === 'attended' ? 'confirmed' : existing.status,
      registrationId: existing.id,
    }
  }

  if (event.visibility === 'member' && !hasActivePaidMembership(data, userId)) {
    return { status: 'member_required' }
  }

  if (event.status === 'closed' || event.status === 'completed' || event.status === 'draft') {
    return { status: 'closed' }
  }

  return { status: 'available' }
}

function resolveEventAddress(
  locale: ApiLocale,
  event: EventRecord,
  userId: string,
  registration: EventRegistrationState,
) {
  if (!event.address) {
    return { addressVisible: false }
  }

  if (!userId) {
    return { addressVisible: false, addressLockReason: 'login_required' as const }
  }

  if (event.addressVisibility === 'confirmed_attendee_only' && registration.status !== 'confirmed') {
    return { addressVisible: false, addressLockReason: 'confirmation_required' as const }
  }

  return {
    address: resolveLocalizedText(locale, event.address),
    addressVisible: true,
  }
}

function buildRegistrationResponse(
  data: Database,
  event: EventRecord,
  registration: EventRegistrationState,
): EventRegistrationResponse {
  const registeredCount = countRegistrations(data, event.id, 'confirmed')
  const waitlistCount = countRegistrations(data, event.id, 'waitlist')

  return {
    registration,
    registeredCount,
    waitlistCount,
    remainingSeats: Math.max(event.capacity - registeredCount, 0),
  }
}

function normalizeDirectoryQuery(query: QueryRecord): EventDirectoryQuery {
  const page = normalizePositiveInteger(query.page, 1)
  const pageSize = normalizePositiveInteger(query.pageSize, 12)
  const visibility = normalizeVisibility(query.visibility)

  return {
    page,
    pageSize,
    city: normalizeString(query.city),
    status: normalizeString(query.status),
    visibility,
    month: normalizeString(query.month),
  }
}

function buildPagination(total: number, page: number, pageSize: number): Pagination {
  const totalPages = Math.max(Math.ceil(total / pageSize), 1)
  const safePage = Math.min(Math.max(page, 1), totalPages)

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}

function buildFacets(locale: ApiLocale, events: EventRecord[]) {
  return {
    city: buildFacetOptions(events.map((event) => resolveLocalizedText(locale, event.city))),
    status: buildFacetOptions(events.map((event) => event.status)),
    visibility: buildFacetOptions(events.map((event) => event.visibility)),
    month: buildFacetOptions(events.map((event) => event.date.slice(0, 7))),
  }
}

function buildFacetOptions(values: string[]) {
  const counts = new Map<string, number>()
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1))

  return [...counts.entries()].map(([value, count]) => ({
    value,
    label: value,
    count,
  }))
}

function countRegistrations(data: Database, eventId: string, status: EventRegistrationRecord['status']) {
  return data.event_registrations.filter((item) => item.eventId === eventId && item.status === status).length
}

function hasActivePaidMembership(data: Database, userId: string) {
  const membership = data.user_memberships.find((item) => item.userId === userId && item.status === 'active')
  return Boolean(membership && membership.tier !== 'free')
}

function normalizePositiveInteger(value: unknown, fallback: number) {
  const firstValue = Array.isArray(value) ? value[0] : value
  const parsed = Number(firstValue)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function normalizeString(value: unknown) {
  const firstValue = Array.isArray(value) ? value[0] : value
  return typeof firstValue === 'string' && firstValue.trim() ? firstValue.trim() : undefined
}

function normalizeVisibility(value: unknown) {
  const normalized = normalizeString(value)
  return normalized === 'public' || normalized === 'registered' || normalized === 'member'
    ? normalized
    : undefined
}

function nextEventRegistrationId(data: Database) {
  return `er-${String(data.event_registrations.length + 1).padStart(3, '0')}`
}
