<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1180px] px-5 py-10 lg:px-8">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          Debug Tool
        </view>
        <view class="mt-2 text-[28px] font-semibold leading-tight text-semantic-text-primary">
          Event Detail 状态预览
        </view>
        <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
          用隔离的 debug 预览接口查看 guest / free / member 下的数据返回与实际页面组件展示。
        </view>

        <view class="mt-6 flex flex-wrap items-end gap-3">
          <view>
            <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Event ID</view>
            <input
              v-model="eventIdInput"
              class="h-[40px] min-w-[180px] border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] text-semantic-text-primary"
            />
          </view>

          <view class="flex flex-wrap gap-2">
            <AppButton
              v-for="item in previewModes"
              :key="item.value"
              :variant="mode === item.value ? 'primary' : 'secondary'"
              size="sm"
              @click="changeMode(item.value)"
            >
              {{ item.label }}
            </AppButton>
          </view>

          <AppButton variant="secondary" size="sm" @click="load">
            读取活动
          </AppButton>

          <AppButton
            :variant="showDataSummary ? 'primary' : 'secondary'"
            size="sm"
            @click="showDataSummary = !showDataSummary"
          >
            {{ showDataSummary ? '隐藏数据摘要' : '显示数据摘要' }}
          </AppButton>
        </view>
      </view>

      <view v-if="pageData.hero && pageData.registration" class="mt-6 space-y-6">
        <EventDetailHero
          :eyebrow="eventDetailT('hero.eyebrow')"
          :fields="pageData.fieldLabels"
          :event="pageData.hero"
          :registration="pageData.registration"
          @action="handlePreviewAction"
        />

        <view v-if="showDataSummary" class="grid gap-3 md:grid-cols-3">
          <view
            v-for="item in summaryCards"
            :key="item.title"
            class="border border-semantic-border-default bg-semantic-surface-card px-5 py-4"
          >
            <view class="text-[12px] uppercase tracking-[2.4px] text-semantic-text-eyebrow">
              {{ item.title }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">
              {{ item.subtitle }}
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-2">
          <EventDetailAgenda
            :eyebrow="eventDetailT('sections.agenda')"
            :title="eventDetailT('sections.agenda')"
            :items="pageData.agendaItems"
          />
          <EventDetailNotes
            :eyebrow="eventDetailT('sections.notes')"
            :title="eventDetailT('sections.notes')"
            :items="pageData.noteItems"
          />
        </view>
      </view>

      <view
        v-else-if="!loading"
        class="mt-6 border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
      >
        暂无可预览活动。
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EventDetailAgenda from '@/components/events/EventDetailAgenda.vue'
import EventDetailHero from '@/components/events/EventDetailHero.vue'
import EventDetailNotes from '@/components/events/EventDetailNotes.vue'
import {
  cancelEventPreview,
  getEventPreview,
  registerEventPreview,
  type EventPreviewDetail,
  type EventPreviewMode,
} from '@/api/debug'
import type {FormatLocale} from '@/api/events'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {toEventDetailPageData} from '@/mappers/event-detail'
import {openLoginPage, openMembershipPage} from '@/utils/navigation'

const previewModes: Array<{ label: string, value: EventPreviewMode }> = [
  {label: 'Guest', value: 'guest'},
  {label: 'Free', value: 'free'},
  {label: 'Member', value: 'member'},
]

const {t: eventDetailT, locale} = usePageI18n('eventDetail')
const eventIdInput = ref('e-001')
const mode = ref<EventPreviewMode>('guest')
const eventDetail = ref<EventPreviewDetail | null>(null)
const loading = ref(false)
const actionLoading = ref(false)
const showDataSummary = ref(true)

const pageData = computed(() => toEventDetailPageData({
  event: eventDetail.value,
  locale: locale.value as FormatLocale,
  t: eventDetailT,
  actionLoading: actionLoading.value,
}))
const debugUserId = computed(() => {
  if (mode.value === 'member') return 'u-001'
  if (mode.value === 'free') return 'u-debug-free'
  return ''
})
const summaryCards = computed(() => {
  if (!eventDetail.value) return []

  return [
    {
      title: 'Identity',
      subtitle: `${mode.value} / ${debugUserId.value || 'guest'}`,
    },
    {
      title: 'Registration',
      subtitle: eventDetail.value.registration.registrationId
        ? `${eventDetail.value.registration.status} / ${eventDetail.value.registration.registrationId}`
        : eventDetail.value.registration.status,
    },
    {
      title: 'Address',
      subtitle: eventDetail.value.addressVisible
        ? eventDetail.value.address ?? '-'
        : eventDetail.value.addressLockReason ?? '-',
    },
    {
      title: 'Seats',
      subtitle: `remaining ${eventDetail.value.remainingSeats} / registered ${eventDetail.value.registeredCount} / waitlist ${eventDetail.value.waitlistCount}`,
    },
    {
      title: 'Access',
      subtitle: eventDetail.value.memberOnly ? 'member only' : 'regular',
    },
    {
      title: 'Event',
      subtitle: `${eventDetail.value.id} / ${eventDetail.value.date} ${eventDetail.value.startTime}-${eventDetail.value.endTime}`,
    },
  ]
})

onMounted(() => {
  void load()
})

function changeMode(nextMode: EventPreviewMode) {
  mode.value = nextMode
  void load()
}

async function load() {
  loading.value = true
  try {
    eventDetail.value = await getEventPreview(buildPreviewQuery())
  } finally {
    loading.value = false
  }
}

async function submitRegistration() {
  actionLoading.value = true
  try {
    await registerEventPreview(buildPreviewQuery())
    await load()
  } finally {
    actionLoading.value = false
  }
}

async function cancelRegistration() {
  actionLoading.value = true
  try {
    await cancelEventPreview(buildPreviewQuery())
    await load()
  } finally {
    actionLoading.value = false
  }
}

function handlePreviewAction(key: string) {
  if (key === 'login') {
    openLoginPage()
    return
  }

  if (key === 'membership') {
    openMembershipPage()
    return
  }

  if (key === 'cancel') {
    void cancelRegistration()
    return
  }

  void submitRegistration()
}

function buildPreviewQuery() {
  return {
    eventId: eventIdInput.value,
    mode: mode.value,
  }
}
</script>
