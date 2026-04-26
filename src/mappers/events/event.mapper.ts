import { formatEventDate, formatEventDetailDate, type FormatLocale } from '@/utils/locale-format'
import type { EventAgendaItem, EventDetailFieldLabels, EventFieldLabels, EventNoteItem, EventOverviewItem, EventRelatedProfileItem, EventStatItem } from '@/types/events/view'
import type { HomeEventsPreviewViewModel } from '@/types/home/view'
import type { EventDetailPageVM, EventsIndexPageVM } from '@/types/vm/events'
import type { EventDTO, EventDetailResponseDTO, EventRelatedProfileDTO, EventStatusDTO, LocalizedTextDTO } from '@/api/events/events.client'

type Translate = (key: string) => string

export function buildHomeEventsPreviewViewModel(
  events: EventDTO[],
  locale: FormatLocale,
  t: Translate,
): HomeEventsPreviewViewModel {
  return {
    fieldLabels: buildOverviewFieldLabels(t),
    events: events
      .filter(item => item.status !== 'closed')
      .slice(0, 3)
      .map(item => buildEventOverviewItem(item, locale, t)),
  }
}

export function buildEventsIndexPageViewModel(
  events: EventDTO[],
  locale: FormatLocale,
  t: Translate,
): EventsIndexPageVM {
  const sortedEvents = [...events].sort((left, right) => left.date.localeCompare(right.date))
  const fieldLabels = buildEventFieldLabels(t)
  const heroFields = {
    date: fieldLabels.date,
    city: fieldLabels.city,
    venue: fieldLabels.venue,
    format: fieldLabels.format,
    seats: fieldLabels.seats,
  }
  const scheduleEventCards = sortedEvents.map(item => buildEventOverviewItem(item, locale, t))
  const featuredEventCards = sortedEvents
    .filter(item => item.status !== 'closed')
    .slice(0, 3)
    .map(item => buildEventOverviewItem(item, locale, t))

  const openCount = sortedEvents.filter(item => item.status === 'open').length
  const waitlistCount = sortedEvents.filter(item => item.status === 'waitlist').length
  const cityCount = new Set(sortedEvents.map(item => localizeEventText(locale, item.city))).size

  return {
    fieldLabels,
    heroFields,
    nextEventCard: sortedEvents[0] ? buildEventOverviewItem(sortedEvents[0], locale, t) : undefined,
    featuredEventCards,
    scheduleEventCards,
    statCards: [
      { label: t('stats.totalEvents'), value: String(sortedEvents.length) },
      { label: t('stats.openEvents'), value: String(openCount) },
      { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
      { label: t('stats.cities'), value: String(cityCount) },
    ],
  }
}

export function buildEventDetailPageViewModel(
  payload: EventDetailResponseDTO | null,
  locale: FormatLocale,
  t: Translate,
): EventDetailPageVM {
  const detailFieldLabels = buildEventDetailFieldLabels(t)
  const event = payload?.event
  const eventCard = event ? buildEventOverviewItem(event, locale, t, true) : undefined
  const eventAction = buildEventAction(eventCard?.status, t)
  const noteItems = buildEventNoteItems(t)

  if (!payload || !event) {
    return {
      detailFieldLabels,
      eventCard,
      eventAction,
      agenda: [],
      noteItems,
      relatedProfileItems: [],
    }
  }

  return {
    detailFieldLabels,
    eventCard,
    eventAction,
    agenda: payload.event.agenda.map(item => ({
      time: item.time,
      title: localizeEventText(locale, item.title),
      desc: localizeEventText(locale, item.desc),
    })),
    noteItems,
    relatedProfileItems: payload.relatedProfiles.map(profile => buildRelatedProfileItem(profile, payload.event.city.en, locale, t)),
  }
}

function buildEventOverviewItem(
  event: EventDTO,
  locale: FormatLocale,
  t: Translate,
  detailDate = false,
): EventOverviewItem {
  return {
    id: event.id,
    title: localizeEventText(locale, event.title),
    summary: localizeEventText(locale, event.summary),
    date: detailDate ? formatEventDetailDate(locale, event.date) : formatEventDate(locale, event.date),
    city: localizeEventText(locale, event.city),
    venue: localizeEventText(locale, event.venue),
    format: localizeEventText(locale, event.format),
    audience: localizeEventText(locale, event.audience),
    seats: `${event.registered} / ${event.seats}`,
    status: event.status,
    statusLabel: t(`status.${event.status}`),
  }
}

function buildRelatedProfileItem(
  profile: EventRelatedProfileDTO,
  cityKey: string,
  locale: FormatLocale,
  t: Translate,
): EventRelatedProfileItem {
  return {
    id: profile.id,
    displayName: profile.displayName,
    meta: [String(profile.age), localizeEventText(locale, profile.city), localizeEventText(locale, profile.intent)].join(' | '),
    reason: buildRelatedReason(profile, cityKey, t),
    summary: localizeEventText(locale, profile.summary),
  }
}

function buildEventFieldLabels(t: Translate): EventFieldLabels {
  return {
    date: t('fields.date'),
    city: t('fields.city'),
    venue: t('fields.venue'),
    format: t('fields.format'),
    audience: t('fields.audience'),
    seats: t('fields.seats'),
  }
}

function buildOverviewFieldLabels(t: Translate): Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'> {
  return {
    city: t('fields.city'),
    venue: t('fields.venue'),
    format: t('fields.format'),
    audience: t('fields.audience'),
    seats: t('fields.seats'),
  }
}

function buildEventDetailFieldLabels(t: Translate): EventDetailFieldLabels {
  return {
    ...buildEventFieldLabels(t),
    status: t('fields.status'),
  }
}

function buildEventAction(status: EventStatusDTO | undefined, t: Translate) {
  if (status === 'waitlist') {
    return {
      text: t('actions.joinWaitlist'),
      hint: t('actions.waitlistHint'),
      disabled: false,
    }
  }

  if (status === 'closed') {
    return {
      text: t('actions.full'),
      hint: t('actions.fullHint'),
      disabled: true,
    }
  }

  return {
    text: t('actions.register'),
    hint: t('actions.registerHint'),
    disabled: false,
  }
}

function buildEventNoteItems(t: Translate): EventNoteItem[] {
  return [
    { title: t('rules.step1.title'), desc: t('rules.step1.desc') },
    { title: t('rules.step2.title'), desc: t('rules.step2.desc') },
    { title: t('rules.step3.title'), desc: t('rules.step3.desc') },
    { title: t('rules.step4.title'), desc: t('rules.step4.desc') },
  ]
}

function buildRelatedReason(profile: EventRelatedProfileDTO, cityKey: string, t: Translate) {
  if (profile.city.en === cityKey) return t('relatedReason.sameCity')
  if (profile.status === 'vip') return t('relatedReason.priority')
  if (profile.isVerified) return t('relatedReason.verified')
  return t('relatedReason.curated')
}

function localizeEventText(locale: FormatLocale, text: LocalizedTextDTO) {
  return text[locale] || text.en || ''
}
