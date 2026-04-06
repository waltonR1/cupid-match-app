<template>
  <AccountPageShell
    active-page="events"
    hero-tone="events"
    :eyebrow="t('hero.eyebrow')"
    :title="t('hero.title')"
    :subtitle="t('hero.subtitle')"
    :stats="heroStats"
  >
    <template #intro>
      <AccountPerspectiveGrid :items="perspectiveItems" />
    </template>

    <view class="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <view class="grid gap-5">
        <view
          v-for="item in userEvents"
          :key="item.registration.id"
          class="cursor-pointer border px-7 py-7 shadow-card transition-all duration-200 hover:-translate-y-[2px]"
          :class="cardTone(item.registration.status).card"
          @click="handleEventOpen(item.event.id)"
        >
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view>
              <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
                {{ formatDate(item.event.date) }}
              </view>
              <view class="mt-2 text-[15px] text-text-body-soft">
                {{ localize(item.event.city) }}
              </view>
            </view>

            <view
              class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
              :class="cardTone(item.registration.status).badge"
            >
              {{ registrationStatus(item.registration.status) }}
            </view>
          </view>

          <view class="mt-5 text-[28px] font-semibold text-text-heading">
            {{ localize(item.event.title) }}
          </view>

          <view class="mt-4 text-[15px] leading-7 text-text-body">
            {{ localize(item.registration.note) }}
          </view>

          <view class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-4">
            <text class="text-[13px] uppercase tracking-[2px] text-text-subtle">
              {{ t('list.seats') }} · {{ item.event.registered }} / {{ item.event.seats }}
            </text>
            <text class="text-[14px] font-medium text-text-heading">
              {{ t('list.action') }}
            </text>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('support.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('support.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in supportPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-text-body"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-border-inverse bg-surface-inverse-panel px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-accent-foreground">
            {{ t('family.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-inverse">
            {{ t('family.title') }}
          </view>

          <view v-if="latestEvent" class="mt-4 rounded-full border border-border-inverse-hover bg-white/5 px-4 py-2 text-[13px] text-text-inverse-soft">
            {{ localize(latestEvent.event.title) }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in familyPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-text-inverse-soft"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountPageShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountPageShell from '@/components/account/AccountPageShell.vue'
import AccountPerspectiveGrid from '@/components/account/AccountPerspectiveGrid.vue'
import { useAccountData } from '@/components/account/use-account-data'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openEventDetail } from '@/utils/demo-navigation'

const { t } = usePageI18n('myEvents')
const { userEvents, latestEvent, localize, formatDate } = useAccountData()

const heroStats = computed(() => {
  const confirmed = userEvents.filter(item => item.registration.status === 'confirmed').length
  const waitlist = userEvents.filter(item => item.registration.status === 'waitlist').length
  const completed = userEvents.filter(item => item.registration.status === 'completed').length

  return [
    { label: t('stats.confirmed'), value: String(confirmed) },
    { label: t('stats.waitlist'), value: String(waitlist) },
    { label: t('stats.completed'), value: String(completed) },
  ]
})

const perspectiveItems = computed(() => [
  {
    eyebrow: t('perspective.user.eyebrow'),
    title: t('perspective.user.title'),
    description: t('perspective.user.description'),
    points: [
      t('perspective.user.point1'),
      t('perspective.user.point2'),
      t('perspective.user.point3'),
    ],
    tone: 'base' as const,
  },
  {
    eyebrow: t('perspective.family.eyebrow'),
    title: t('perspective.family.title'),
    description: t('perspective.family.description'),
    points: [
      t('perspective.family.point1'),
      t('perspective.family.point2'),
      t('perspective.family.point3'),
    ],
    tone: 'inverse' as const,
  },
])

const supportPoints = computed(() => [
  t('support.point1'),
  t('support.point2'),
  t('support.point3'),
])

const familyPoints = computed(() => [
  t('family.point1'),
  t('family.point2'),
  t('family.point3'),
])

function registrationStatus(status: 'confirmed' | 'waitlist' | 'completed') {
  return t(`status.${status}`)
}

function cardTone(status: 'confirmed' | 'waitlist' | 'completed') {
  if (status === 'confirmed') {
    return {
      card: 'border-border-accent bg-surface-card-soft',
      badge: 'border-border-accent bg-button-accent text-button-neutral-ink',
    }
  }

  if (status === 'waitlist') {
    return {
      card: 'border-border-base bg-surface-base',
      badge: 'border-border-accent/30 bg-brand-primary-soft text-brand-secondary',
    }
  }

  return {
    card: 'border-border-soft bg-surface-card',
    badge: 'border-border-soft bg-page-soft text-text-body-soft',
  }
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}
</script>
