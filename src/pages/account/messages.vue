<template>
  <AccountPageShell
    active-page="messages"
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
      <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
        <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
          {{ t('list.eyebrow') }}
        </view>
        <view class="mt-3 text-[28px] font-semibold text-text-heading">
          {{ t('list.title') }}
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in threads"
            :key="item.thread.id"
            class="cursor-pointer border border-border-soft bg-surface-card px-5 py-5 shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:border-border-accent"
            @click="handleProfileOpen(item.profile.id)"
          >
            <view class="flex items-start gap-4">
              <view class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-inverse-panel text-[18px] font-semibold text-text-inverse">
                {{ item.profile.avatar }}
              </view>

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view>
                    <view class="text-[24px] font-semibold text-text-heading">
                      {{ item.profile.name }}
                    </view>
                    <view class="mt-2 text-[15px] text-text-body-soft">
                      {{ localize(item.profile.city) }} · {{ item.profile.age }}
                    </view>
                  </view>

                  <view class="flex flex-wrap items-center justify-end gap-2">
                    <view
                      v-if="item.profile.familyVisible"
                      class="rounded-full border border-border-accent bg-button-accent/10 px-3 py-1 text-[11px] uppercase tracking-[2px] text-brand-accent-strong"
                    >
                      {{ t('list.familyBadge') }}
                    </view>
                    <view
                      v-if="item.thread.unread > 0"
                      class="rounded-full border border-border-accent bg-button-accent px-3 py-1 text-[11px] uppercase tracking-[2px] text-button-neutral-ink"
                    >
                      {{ t('list.unreadLabel') }} {{ item.thread.unread }}
                    </view>
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-text-body">
                  {{ localize(item.thread.lastMessage) }}
                </view>

                <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-4">
                  <text class="text-[13px] uppercase tracking-[2px] text-text-subtle">
                    {{ formatDateTime(item.thread.updatedAt) }}
                  </text>
                  <text class="text-[14px] font-medium text-text-heading">
                    {{ t('list.open') }}
                  </text>
                </view>
              </view>
            </view>
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
            {{ t('boundary.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-inverse">
            {{ t('boundary.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in boundaryPoints"
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
import { openProfileDetail } from '@/utils/demo-navigation'

const { t } = usePageI18n('messages')
const { threads, unreadCount, familyVisibleThreads, localize, formatDateTime } = useAccountData()

const heroStats = computed(() => [
  { label: t('stats.threads'), value: String(threads.length) },
  { label: t('stats.unread'), value: String(unreadCount.value) },
  { label: t('stats.familyVisible'), value: String(familyVisibleThreads.value.length) },
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
    tone: 'inverse' as const,
  },
])

const supportPoints = computed(() => [
  t('support.point1'),
  t('support.point2'),
  t('support.point3'),
])

const boundaryPoints = computed(() => [
  t('boundary.point1'),
  t('boundary.point2'),
  t('boundary.point3'),
])

function handleProfileOpen(id: string) {
  openProfileDetail(id)
}
</script>
