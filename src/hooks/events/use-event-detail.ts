import { computed, ref, watch, type Ref } from 'vue'
import {
  getEventDetail,
  type EventDTO,
  type EventDetailResponseDTO,
  type EventRelatedProfileDTO,
  type EventStatusDTO,
  type FormatLocale,
} from '@/api/events/events'
import { formatEventDetailDate } from '@/utils/locale-format'

type Translate = (key: string) => string

export function useEventDetail(eventId: Ref<string>, t: Translate, locale: { value: FormatLocale }) {
  const loading = ref(false)
  const error = ref<unknown>(null)
  const payload = ref<EventDetailResponseDTO | null>(null)
  let requestToken = 0

  watch([eventId, () => locale.value], () => {
    void load()
  }, { immediate: true })

  async function load() {
    const id = eventId.value
    if (!id) {
      payload.value = null
      return
    }

    const currentToken = ++requestToken
    loading.value = true
    error.value = null

    try {
      const response = await getEventDetail(id)
      if (currentToken !== requestToken) return
      payload.value = response
    } catch (requestError) {
      if (currentToken !== requestToken) return
      error.value = requestError
      payload.value = null
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  const pageData = computed(() => {
    const event = payload.value?.event
    const eventCard = event ? toEventOverviewItem(event, locale.value, t) : undefined
    const eventAction = buildEventAction(eventCard?.status, t)
    const detailFieldLabels = {
      date: t('fields.date'),
      city: t('fields.city'),
      venue: t('fields.venue'),
      format: t('fields.format'),
      audience: t('fields.audience'),
      seats: t('fields.seats'),
      status: t('fields.status'),
    }
    const noteItems = [
      { title: t('rules.step1.title'), desc: t('rules.step1.desc') },
      { title: t('rules.step2.title'), desc: t('rules.step2.desc') },
      { title: t('rules.step3.title'), desc: t('rules.step3.desc') },
      { title: t('rules.step4.title'), desc: t('rules.step4.desc') },
    ]

    if (!payload.value || !event) {
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
      agenda: payload.value.event.agenda.map((item) => ({
        time: item.time,
        title: item.title,
        desc: item.desc,
      })),
      noteItems,
      relatedProfileItems: payload.value.relatedProfiles.map((profile) => ({
        id: profile.id,
        displayName: profile.displayName,
        meta: [String(profile.age), profile.city, profile.intent].join(' | '),
        reason: buildRelatedReason(profile, payload.value!.event.city, t),
        summary: profile.summary,
      })),
    }
  })

  return {
    loading,
    error,
    pageData,
    refresh: load,
  }
}

function toEventOverviewItem(event: EventDTO, locale: FormatLocale, t: Translate) {
  return {
    id: event.id,
    title: event.title,
    summary: event.summary,
    date: formatEventDetailDate(locale, event.date),
    city: event.city,
    venue: event.venue,
    format: event.format,
    audience: event.audience,
    seats: `${event.registered} / ${event.seats}`,
    status: event.status,
    statusLabel: t(`status.${event.status}`),
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

function buildRelatedReason(profile: EventRelatedProfileDTO, eventCity: string, t: Translate) {
  if (profile.city === eventCity) return t('relatedReason.sameCity')
  if (profile.status === 'vip') return t('relatedReason.priority')
  if (profile.isVerified) return t('relatedReason.verified')
  return t('relatedReason.curated')
}
