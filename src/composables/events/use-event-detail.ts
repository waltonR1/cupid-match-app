import { computed, ref, watch, type Ref } from 'vue'
import {
  getEventDetail,
  listEventRelatedProfiles,
  type CupidEvent,
  type EventRelatedProfile,
  pickLocalized,
  type LocalizedText,
} from '@/api/modules/events'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type {
  EventAgendaItem,
  EventDetailFieldLabels,
  EventNoteItem,
  EventOverviewItem,
  EventRelatedProfileItem,
} from '@/types/events'

export function useEventDetail(eventId: Ref<string>) {
  const { t, locale } = usePageI18n('eventDetail')
  const event = ref<CupidEvent | null>(null)
  const relatedProfiles = ref<EventRelatedProfile[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)
  let requestId = 0

  const detailFieldLabels = computed<EventDetailFieldLabels>(() => ({
    status: t('fields.status'),
    date: t('fields.date'),
    city: t('fields.city'),
    venue: t('fields.venue'),
    format: t('fields.format'),
    audience: t('fields.audience'),
    seats: t('fields.seats'),
  }))
  const eventCard = computed<EventOverviewItem | undefined>(() => {
    if (!event.value) return undefined
    return buildEventOverviewItem(event.value)
  })
  const agenda = computed<EventAgendaItem[]>(() => {
    if (!event.value) return []

    return event.value.agenda.map(item => ({
      time: item.time,
      title: localize(item.title),
      desc: localize(item.desc),
    }))
  })
  const noteItems = computed<EventNoteItem[]>(() => [
    { title: t('rules.step1.title'), desc: t('rules.step1.desc') },
    { title: t('rules.step2.title'), desc: t('rules.step2.desc') },
    { title: t('rules.step3.title'), desc: t('rules.step3.desc') },
    { title: t('rules.step4.title'), desc: t('rules.step4.desc') },
  ])
  const relatedProfileItems = computed<EventRelatedProfileItem[]>(() => {
    if (!event.value) return []

    const cityKey = event.value.city.en
    return relatedProfiles.value.map(profile => ({
      id: profile.id,
      name: profile.name,
      meta: formatRelatedProfileMeta(profile),
      reason: buildRelatedReason(profile, cityKey),
      summary: localize(profile.summary),
    }))
  })

  async function loadEventDetail() {
    const id = eventId.value
    const currentRequestId = ++requestId

    if (!id) {
      event.value = null
      relatedProfiles.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const [eventResponse, relatedProfilesResponse] = await Promise.all([
        getEventDetail(id),
        listEventRelatedProfiles(id),
      ])

      if (currentRequestId !== requestId) return

      event.value = eventResponse.data
      relatedProfiles.value = relatedProfilesResponse.data
    } catch (requestError) {
      if (currentRequestId !== requestId) return

      event.value = null
      relatedProfiles.value = []
      error.value = requestError
      console.warn('Failed to load event detail.', requestError)
    } finally {
      if (currentRequestId === requestId) {
        loading.value = false
      }
    }
  }

  watch(
    eventId,
    () => {
      void loadEventDetail()
    },
    { immediate: true },
  )

  function localize(text: LocalizedText) {
    return pickLocalized(locale.value, text)
  }

  function eventStatusLabel(status: EventOverviewItem['status']) {
    return t(`status.${status}`)
  }

  function formatDetailDate(date: string) {
    const map = {
      zh: new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      fr: new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
      en: new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    } as const

    return map[locale.value]
  }

  function buildEventOverviewItem(item: CupidEvent): EventOverviewItem {
    return {
      id: item.id,
      title: localize(item.title),
      summary: localize(item.summary),
      date: formatDetailDate(item.date),
      city: localize(item.city),
      venue: localize(item.venue),
      format: localize(item.format),
      audience: localize(item.audience),
      seats: `${item.registered} / ${item.seats}`,
      status: item.status,
      statusLabel: eventStatusLabel(item.status),
    }
  }

  function formatRelatedProfileMeta(profile: EventRelatedProfile) {
    const city = localize(profile.city)
    const intent = localize(profile.intent)

    if (locale.value === 'zh') return `${profile.age}岁 | ${city} | ${intent}`
    if (locale.value === 'fr') return `${profile.age} ans | ${city} | ${intent}`
    return `${profile.age} | ${city} | ${intent}`
  }

  function buildRelatedReason(profile: EventRelatedProfile, cityKey: string) {
    if (profile.city.en === cityKey) return t('relatedReason.sameCity')
    if (profile.status === 'vip') return t('relatedReason.priority')
    if (profile.isVerified) return t('relatedReason.verified')
    return t('relatedReason.curated')
  }

  return {
    event,
    relatedProfiles,
    detailFieldLabels,
    eventCard,
    agenda,
    noteItems,
    relatedProfileItems,
    loading,
    error,
    refresh: loadEventDetail,
  }
}
