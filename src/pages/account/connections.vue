<template>
  <AccountShell
    active-page="connections"
    :header-eyebrow="t('connections.eyebrow')"
    :header-title="t('connections.title')"
    :header-description="t('connections.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
      <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="t('connections.eyebrow')"
          :title="t('connections.sections.pool')"
        />

        <view class="mt-6 flex flex-wrap gap-3">
          <view
            v-for="filter in filterItems"
            :key="filter.label"
            class="rounded-full border border-next-semantic-border-soft bg-next-semantic-surface-panel px-4 py-2 text-[13px] text-next-semantic-text-secondary"
          >
            {{ filter.label }} · {{ filter.value }}
          </view>
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in favorites"
            :key="item.profile.id"
            class="cursor-pointer border border-next-semantic-border-soft bg-next-semantic-surface-panel px-5 py-5 shadow-next-shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-next-semantic-border-card-hover hover:bg-next-semantic-surface-soft"
            @click="openProfile(item.profile.id, item.profile.familyVisible)"
          >
            <view class="flex items-start gap-4">
              <view class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-next-semantic-border-default bg-next-semantic-surface-soft text-[18px] font-semibold text-next-semantic-text-primary">
                {{ item.profile.avatar }}
              </view>

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view class="min-w-0">
                    <view class="text-[24px] font-semibold text-next-semantic-text-primary">
                      {{ item.profile.name }}
                    </view>
                    <view class="mt-2 text-[15px] text-next-semantic-text-secondary">
                      {{ localize(item.profile.city) }} · {{ item.profile.age }}
                    </view>
                  </view>

                  <view
                    class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                    :class="item.profile.familyVisible
                      ? 'border-next-component-account-badge-meta-border bg-next-component-account-badge-meta-background text-next-component-account-badge-meta-text'
                      : 'border-next-semantic-border-soft bg-next-semantic-surface-card text-next-semantic-text-secondary'"
                  >
                    {{ item.profile.familyVisible ? t('common.familyVisible') : t('common.privateOnly') }}
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-next-semantic-text-primary">
                  {{ localize(item.favorite.note) }}
                </view>

                <view class="mt-5 flex flex-wrap gap-3">
                  <view
                    v-for="tag in item.profile.tags.slice(0, 3)"
                    :key="localize(tag)"
                    class="rounded-full border border-next-semantic-border-soft bg-next-semantic-surface-card px-4 py-2 text-[13px] text-next-semantic-text-secondary"
                  >
                    {{ localize(tag) }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('connections.eyebrow')"
            :title="t('connections.sections.reason')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in reasonPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('connections.eyebrow')"
            :title="t('connections.sections.summary')"
          />

          <view class="mt-6 grid gap-4 sm:grid-cols-2">
            <view
              v-for="item in summaryItems"
              :key="item.label"
              class="border border-next-semantic-border-soft bg-next-semantic-surface-card px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-next-semantic-text-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-next-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import { useAccountData } from '@/components/account/use-account-data'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openFamilyProfileDetail, openSelfDetail } from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const {
  favorites,
  familyVisibleFavorites,
  privateFavorites,
  localize,
} = useAccountData()

const filterItems = computed(() => [
  { label: t('connections.filters.likedMe'), value: String(familyVisibleFavorites.value.length) },
  { label: t('connections.filters.liked'), value: String(favorites.length) },
  { label: t('connections.filters.mutual'), value: String(Math.min(privateFavorites.value.length, familyVisibleFavorites.value.length)) },
  { label: t('connections.filters.family'), value: String(familyVisibleFavorites.value.length) },
])

const summaryItems = computed(() => [
  {
    label: t('common.privateOnly'),
    value: String(privateFavorites.value.length),
  },
  {
    label: t('common.familyVisible'),
    value: String(familyVisibleFavorites.value.length),
  },
])

const reasonPoints = computed(() => [
  t('connections.reasons.complete'),
  t('connections.reasons.family'),
  t('connections.reasons.active'),
])

function openProfile(id: string, familyVisible: boolean) {
  if (familyVisible) {
    openFamilyProfileDetail(id)
    return
  }

  openSelfDetail(id)
}
</script>
