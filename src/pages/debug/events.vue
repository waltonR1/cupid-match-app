<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1180px] px-5 py-10 lg:px-8">
      <!-- Event Management -->
      <DebugPageHeader
        title="活动管理"
        description="查看全部活动（含 draft），切换活动状态。"
      >
        <AppButton variant="secondary" size="sm" @click="loadEvents">
          刷新
        </AppButton>
      </DebugPageHeader>

      <view class="mt-4 grid gap-3">
        <view
          v-for="item in events"
          :key="item.id"
          class="grid gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 text-[13px] shadow-panel lg:grid-cols-[minmax(260px,1fr)_90px_90px_90px_minmax(320px,auto)] lg:items-center"
        >
          <view>
            <view class="font-medium">{{ item.title }}</view>
            <view class="mt-1 text-semantic-text-muted">{{ item.id }} / {{ item.slug }} / {{ item.date }}</view>
          </view>
          <view>{{ item.visibility }}</view>
          <view :class="statusClass(item.status)">{{ item.status }}</view>
          <view>{{ item.confirmedCount }}/{{ item.capacity }}</view>
          <view class="flex flex-wrap gap-2">
            <AppButton
              v-for="s in statusOptions"
              :key="s"
              :variant="item.status === s ? 'primary' : 'secondary'"
              size="sm"
              :disabled="item.status === s || submittingId === item.id"
              @click="changeStatus(item.id, s)"
            >
              {{ s }}
            </AppButton>
          </view>
        </view>
      </view>

      <view class="mt-10">
        <DebugPageHeader
          title="Event Detail 状态预览"
          description="用隔离的 debug 预览接口查看 guest / free / member 下的数据返回与实际页面组件展示。"
        >
          <view class="flex flex-wrap items-end gap-3">
            <view>
              <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Event ID</view>
              <input
                v-model="eventIdInput"
                class="box-border min-h-[44px] w-full min-w-[220px] border border-semantic-border-default bg-semantic-surface-soft px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
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
          </view>
        </DebugPageHeader>
      </view>

      <view v-if="pageData.hero && pageData.registration" class="mt-6 space-y-6">
        <EventDetailHero
          :eyebrow="eventDetailT('hero.eyebrow')"
          :fields="pageData.fieldLabels"
          :event="pageData.hero"
          :registration="pageData.registration"
          @action="handlePreviewAction"
        />
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
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import DebugPageHeader from '@/components/debug/DebugPageHeader.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EventDetailAgenda from '@/components/events/EventDetailAgenda.vue'
import EventDetailHero from '@/components/events/EventDetailHero.vue'
import EventDetailNotes from '@/components/events/EventDetailNotes.vue'
import {
  cancelEventPreview,
  getEventPreview,
  listEventDebugItems,
  registerEventPreview,
  updateEventDebugStatus,
  type EventDebugItem,
  type EventDebugStatus,
  type EventPreviewDetail,
  type EventPreviewMode,
} from '@/api/debug'
import type {FormatLocale} from '@/api/events'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {toEventDetailPageData} from '@/mappers/event-detail'
import {openLoginPage, openMembershipPage} from '@/utils/navigation'

const events = ref<EventDebugItem[]>([])
const submittingId = ref<string | null>(null)
const statusOptions: EventDebugStatus[] = ['draft', 'open', 'waitlist', 'closed', 'completed']

function statusClass(status: EventDebugStatus) {
  return {
    draft: 'text-semantic-text-muted',
    open: 'text-semantic-state-success',
    waitlist: 'text-semantic-state-warning',
    closed: 'text-semantic-state-danger',
    completed: 'text-semantic-text-link',
  }[status]
}

async function loadEvents() {
  events.value = await listEventDebugItems()
}

async function changeStatus(eventId: string, status: EventDebugStatus) {
  submittingId.value = eventId
  try {
    await updateEventDebugStatus(eventId, {status})
    void loadEvents()
  } finally {
    submittingId.value = null
  }
}

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

const pageData = computed(() => toEventDetailPageData({
  event: eventDetail.value,
  locale: locale.value as FormatLocale,
  t: eventDetailT,
  actionLoading: actionLoading.value,
}))

onMounted(() => {
  void loadEvents()
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
