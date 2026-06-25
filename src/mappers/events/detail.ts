import type { EventDetail, EventRegistrationResponse, FormatLocale } from '@/api/events'
import type { Translate } from '@/i18n/types'
import type { EventAgendaItem, EventDetailHeroViewModel, EventNoteItem, EventRegistrationViewModel } from '@/types/events/detail'
import { formatEventDetailDate } from '@/utils/locale-format'
import { toEventOverviewItem, type OptionLabel } from './directory'

export function toEventDetailPageData(params: {
  event: EventDetail | null
  locale: FormatLocale
  t: Translate
  actionLoading: boolean
  optionLabel?: OptionLabel
}) {
  const event = params.event
  const optionLabel = params.optionLabel ?? fallbackOptionLabel

  if (!event) {
    return {
      fieldLabels: buildEventDetailFieldLabels(params.t),
      hero: null,
      facts: [],
      noteItems: [],
      agendaItems: [],
      registration: null,
    }
  }

  return {
    fieldLabels: buildEventDetailFieldLabels(params.t),
    hero: toEventDetailHero(event, params.locale, params.t, optionLabel),
    facts: buildEventFacts(event, params.t, optionLabel),
    noteItems: buildEventNoteItems(event, params.t),
    agendaItems: event.agendaItems.map(toAgendaItem),
    registration: buildRegistrationViewModel(
      event.registration.status,
      event.consumesMembershipQuota,
      event.eventEntitlement.quotaRemaining,
      params.t,
      params.actionLoading,
    ),
  }
}

export function mergeEventRegistration(event: EventDetail, response: EventRegistrationResponse): EventDetail {
  return {
    ...event,
    registeredCount: response.registeredCount,
    waitlistCount: response.waitlistCount,
    remainingSeats: response.remainingSeats,
    registration: response.registration,
    eventEntitlement: response.eventEntitlement,
  }
}

function toEventDetailHero(
  event: EventDetail,
  locale: FormatLocale,
  t: Translate,
  optionLabel: OptionLabel,
): EventDetailHeroViewModel {
  return {
    ...toEventOverviewItem(event, locale, t, optionLabel),
    date: formatEventDetailDate(locale, event.date),
    addressText: event.addressVisible ? event.address : undefined,
    addressLocked: !event.addressVisible,
    addressLockHint: event.addressVisible ? undefined : buildAddressLockHint(event.addressLockReason, t, optionLabel),
    languageText: formatLanguageLabels(event.languageCodes, optionLabel),
  }
}

function buildEventFacts(event: EventDetail, t: Translate, optionLabel: OptionLabel) {
  return [
    { key: 'format', label: t('fields.format'), value: event.format },
    { key: 'audience', label: t('fields.audience'), value: event.audience },
    { key: 'focus', label: t('fields.focus'), value: event.relationshipFocus.join(' / ') },
    { key: 'languages', label: t('fields.languages'), value: formatLanguageLabels(event.languageCodes, optionLabel) },
  ]
}

function buildEventNoteItems(event: EventDetail, t: Translate): EventNoteItem[] {
  return [
    {
      title: t('fields.curatorNote'),
      description: event.curatorNote,
    },
  ]
}

function buildRegistrationViewModel(
  status: EventRegistrationViewModel['status'],
  consumesMembershipQuota: boolean,
  quotaRemaining: number,
  t: Translate,
  loading: boolean,
): EventRegistrationViewModel {
  const action = buildRegistrationAction(status, t, loading)

  return {
    status,
    title: t('registration.' + status + '.title'),
    description: consumesMembershipQuota && status !== 'guest'
      ? t('registration.' + status + '.description') + ' ' + t('quota.remaining', {count: quotaRemaining})
      : t('registration.' + status + '.description'),
    action,
  }
}

function buildRegistrationAction(status: EventRegistrationViewModel['status'], t: Translate, loading: boolean) {
  if (status === 'available') {
    return { key: 'register', label: loading ? t('actions.loading') : t('actions.register'), disabled: loading, loading }
  }

  if (status === 'requested' || status === 'waitlist' || status === 'confirmed') {
    return { key: 'cancel', label: loading ? t('actions.loading') : t('actions.cancel'), disabled: loading, loading }
  }

  if (status === 'guest') {
    return { key: 'login', label: t('actions.login'), disabled: false }
  }

  if (status === 'member_required') {
    return { key: 'membership', label: t('actions.membership'), disabled: false }
  }

  if (status === 'event_quota_exhausted') {
    return { key: 'membership', label: t('actions.membership'), disabled: false }
  }

  return undefined
}

function toAgendaItem(item: EventDetail['agendaItems'][number]): EventAgendaItem {
  return {
    id: item.id,
    time: item.time,
    title: item.title,
    description: item.description,
  }
}

function buildAddressLockHint(reason: EventDetail['addressLockReason'], t: Translate, optionLabel: OptionLabel) {
  if (!reason) return t('address.locked')
  return optionLabel('event.addressLockReason', reason)
}

function formatLanguageLabels(values: string[], optionLabel: OptionLabel): string {
  if (values.length === 0) return '-'
  return values.map(value => optionLabel('profile.languages', value.toUpperCase())).join(' / ')
}

function fallbackOptionLabel(_group: string, value: string): string {
  return value
}

function buildEventDetailFieldLabels(t: Translate) {
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
    curatorNote: t('fields.curatorNote'),
    status: t('fields.status'),
  }
}
