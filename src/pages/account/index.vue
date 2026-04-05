<template>
  <AccountPageShell
    active-page="overview"
    hero-tone="home"
    :eyebrow="t('hero.eyebrow')"
    :title="t('hero.title')"
    :subtitle="t('hero.subtitle')"
    :stats="heroStats"
  >
    <template #intro>
      <AccountPerspectiveGrid :items="perspectiveItems" />
    </template>

    <view class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <view class="grid gap-4 md:grid-cols-2">
        <view
          v-for="item in actionCards"
          :key="item.title"
          class="group cursor-pointer border border-border-base bg-surface-base px-6 py-6 shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:border-border-accent hover:bg-surface-card"
          :class="item.tone === 'accent' ? 'border-border-accent bg-surface-card-soft' : ''"
          @click="item.action"
        >
          <view class="flex items-center justify-between gap-4">
            <text class="text-[11px] uppercase tracking-[3px]" :class="item.tone === 'accent' ? 'text-brand-accent-strong' : 'text-brand-support'">
              {{ item.eyebrow }}
            </text>
            <view
              class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
              :class="item.tone === 'accent'
                ? 'border-border-accent bg-button-accent/15 text-brand-accent-strong'
                : 'border-border-soft bg-surface-card text-text-body-soft'"
            >
              {{ item.kicker }}
            </view>
          </view>

          <view class="mt-5 text-[24px] font-semibold text-text-heading">
            {{ item.title }}
          </view>

          <view class="mt-3 text-[15px] leading-7 text-text-body">
            {{ item.desc }}
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
          <view class="flex items-start justify-between gap-4">
            <view>
              <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
                {{ t('snapshot.eyebrow') }}
              </view>
              <view class="mt-3 text-[28px] font-semibold text-text-heading">
                {{ t('snapshot.title') }}
              </view>
            </view>

            <view class="rounded-full border border-border-accent bg-button-accent/10 px-3 py-1 text-[11px] uppercase tracking-[2px] text-brand-accent-strong">
              {{ membershipLabel(account.membership) }}
            </view>
          </view>

          <view class="mt-4 text-[15px] leading-7 text-text-body">
            {{ localize(account.bio) }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="item in snapshotRows"
              :key="item.label"
              class="flex items-start justify-between gap-6 border-t border-border-soft pt-4"
            >
              <text class="text-[13px] uppercase tracking-[2px] text-text-subtle">
                {{ item.label }}
              </text>
              <text class="max-w-[320px] text-right text-[15px] leading-7 text-text-heading">
                {{ item.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('nextSteps.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('nextSteps.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in nextStepPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-text-body"
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
import { usePageI18n } from '@/i18n/use-page-i18n'
import {
  openFavoritesPage,
  openMessagesPage,
  openMyEventsPage,
  openMyProfilePage,
  openPrivacyPage,
  openRegisterPage,
} from '@/utils/demo-navigation'

const { t } = usePageI18n('account')
const {
  account,
  profile,
  latestEvent,
  unreadCount,
  familyAssistSetting,
  userEvents,
  localize,
  formatDate,
  membershipLabel,
} = useAccountData()

const heroStats = computed(() => [
  {
    label: t('stats.completion'),
    value: `${account.completion}%`,
    caption: profile?.name ?? t('snapshot.none'),
  },
  {
    label: t('stats.events'),
    value: String(userEvents.length),
    caption: latestEvent.value ? localize(latestEvent.value.event.title) : t('snapshot.none'),
  },
  {
    label: t('stats.unread'),
    value: String(unreadCount.value),
    caption: familyAssistSetting.value?.enabled ? t('snapshot.enabled') : t('snapshot.disabled'),
  },
])

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
    badge: familyAssistSetting.value?.enabled ? t('snapshot.enabled') : t('snapshot.disabled'),
    tone: 'accent' as const,
  },
])

const actionCards = computed(() => [
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: t('nav.profile'),
    title: t('quickActions.profile.title'),
    desc: t('quickActions.profile.desc'),
    action: openMyProfilePage,
    tone: 'base',
  },
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: t('nav.events'),
    title: t('quickActions.events.title'),
    desc: t('quickActions.events.desc'),
    action: openMyEventsPage,
    tone: 'base',
  },
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: t('nav.favorites'),
    title: t('quickActions.favorites.title'),
    desc: t('quickActions.favorites.desc'),
    action: openFavoritesPage,
    tone: 'base',
  },
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: t('nav.messages'),
    title: t('quickActions.messages.title'),
    desc: t('quickActions.messages.desc'),
    action: openMessagesPage,
    tone: 'base',
  },
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: t('nav.privacy'),
    title: t('quickActions.privacy.title'),
    desc: t('quickActions.privacy.desc'),
    action: openPrivacyPage,
    tone: 'base',
  },
  {
    eyebrow: t('quickActions.eyebrow'),
    kicker: membershipLabel(account.membership),
    title: t('quickActions.upgrade.title'),
    desc: t('quickActions.upgrade.desc'),
    action: () => openRegisterPage('diamond'),
    tone: 'accent',
  },
])

const snapshotRows = computed(() => [
  {
    label: t('snapshot.joined'),
    value: formatDate(account.joinedAt),
  },
  {
    label: t('snapshot.membership'),
    value: membershipLabel(account.membership),
  },
  {
    label: t('snapshot.currentProfile'),
    value: profile?.name ?? t('snapshot.none'),
  },
  {
    label: t('snapshot.latestEvent'),
    value: latestEvent.value ? localize(latestEvent.value.event.title) : t('snapshot.none'),
  },
  {
    label: t('snapshot.familyAssist'),
    value: familyAssistSetting.value?.enabled ? t('snapshot.enabled') : t('snapshot.disabled'),
  },
  {
    label: t('snapshot.unread'),
    value: String(unreadCount.value),
  },
])

const nextStepPoints = computed(() => [
  t('nextSteps.point1'),
  t('nextSteps.point2'),
  t('nextSteps.point3'),
])
</script>
