<template>
  <AccountPageShell
    active-page="favorites"
    hero-tone="home"
    :eyebrow="t('hero.eyebrow')"
    :title="t('hero.title')"
    :subtitle="t('hero.subtitle')"
    :stats="heroStats"
  >
    <template #intro>
      <AccountPerspectiveGrid :items="perspectiveItems" />
    </template>

    <view class="grid gap-6 xl:grid-cols-2">
      <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
        <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
          {{ t('sections.privateEyebrow') }}
        </view>
        <view class="mt-3 text-[28px] font-semibold text-text-heading">
          {{ t('sections.privateTitle') }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-text-body">
          {{ t('sections.privateSubtitle') }}
        </view>

        <view v-if="privateFavorites.length" class="mt-6 grid gap-4">
          <view
            v-for="item in privateFavorites"
            :key="item.profile.id"
            class="border border-border-soft bg-surface-card px-5 py-5 shadow-card"
          >
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
                  {{ t('sections.privateBadge') }}
                </view>
                <view class="mt-3 text-[24px] font-semibold text-text-heading">
                  {{ item.profile.name }}
                </view>
                <view class="mt-2 text-[15px] text-text-body-soft">
                  {{ localize(item.profile.city) }} · {{ item.profile.age }}
                </view>
              </view>

              <view class="rounded-full border border-border-soft bg-page-soft px-3 py-1 text-[11px] uppercase tracking-[2px] text-text-body-soft">
                {{ formatDate(item.favorite.savedAt) }}
              </view>
            </view>

            <view class="mt-4 text-[15px] leading-7 text-text-body">
              {{ localize(item.favorite.note) }}
            </view>

            <view class="mt-5 flex flex-wrap gap-3">
              <view
                v-for="tag in item.profile.tags.slice(0, 3)"
                :key="localize(tag)"
                class="rounded-full border border-border-soft bg-surface-base px-4 py-2 text-[13px] text-text-body-soft"
              >
                {{ localize(tag) }}
              </view>
            </view>

            <view
              class="mt-5 inline-flex cursor-pointer items-center justify-center border border-border-base bg-transparent px-4 py-3 text-[13px] font-medium text-text-heading transition-all duration-200 hover:border-border-accent hover:bg-surface-base"
              @click="openUserProfile(item.profile.id)"
            >
              {{ t('sections.openUser') }}
            </view>
          </view>
        </view>

        <view v-else class="mt-6 border border-dashed border-border-soft bg-surface-card px-5 py-6 text-[15px] leading-7 text-text-body">
          <view class="text-[20px] font-semibold text-text-heading">
            {{ t('sections.emptyTitle') }}
          </view>
          <view class="mt-2">
            {{ t('sections.emptyDescription') }}
          </view>
        </view>
      </view>

      <view class="border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card">
        <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
          {{ t('sections.sharedEyebrow') }}
        </view>
        <view class="mt-3 text-[28px] font-semibold text-text-heading">
          {{ t('sections.sharedTitle') }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-text-body">
          {{ t('sections.sharedSubtitle') }}
        </view>

        <view v-if="familyVisibleFavorites.length" class="mt-6 grid gap-4">
          <view
            v-for="item in familyVisibleFavorites"
            :key="item.profile.id"
            class="border border-border-accent/40 bg-surface-base px-5 py-5 shadow-card"
          >
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[11px] uppercase tracking-[3px] text-brand-accent-strong">
                  {{ t('sections.familyBadge') }}
                </view>
                <view class="mt-3 text-[24px] font-semibold text-text-heading">
                  {{ item.profile.name }}
                </view>
                <view class="mt-2 text-[15px] text-text-body-soft">
                  {{ localize(item.profile.city) }} · {{ item.profile.age }}
                </view>
              </view>

              <view class="rounded-full border border-border-accent bg-button-accent/10 px-3 py-1 text-[11px] uppercase tracking-[2px] text-brand-accent-strong">
                {{ formatDate(item.favorite.savedAt) }}
              </view>
            </view>

            <view class="mt-4 text-[15px] leading-7 text-text-body">
              {{ localize(item.favorite.note) }}
            </view>

            <view class="mt-5 flex flex-wrap gap-3">
              <view
                v-for="tag in item.profile.tags.slice(0, 3)"
                :key="localize(tag)"
                class="rounded-full border border-border-accent/35 bg-surface-card-soft px-4 py-2 text-[13px] text-text-body-soft"
              >
                {{ localize(tag) }}
              </view>
            </view>

            <view
              class="mt-5 inline-flex cursor-pointer items-center justify-center border border-border-accent bg-button-accent px-4 py-3 text-[13px] font-medium text-button-neutral-ink transition-all duration-200 hover:bg-button-accent-hover"
              @click="openFamilyProfile(item.profile.id)"
            >
              {{ t('sections.openFamily') }}
            </view>
          </view>
        </view>

        <view v-else class="mt-6 border border-dashed border-border-accent/35 bg-surface-base px-5 py-6 text-[15px] leading-7 text-text-body">
          <view class="text-[20px] font-semibold text-text-heading">
            {{ t('sections.emptyTitle') }}
          </view>
          <view class="mt-2">
            {{ t('sections.emptyDescription') }}
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
import { openFamilyProfileDetail, openProfileDetail } from '@/utils/demo-navigation'

const { t } = usePageI18n('favorites')
const { favorites, familyVisibleFavorites, privateFavorites, localize, formatDate } = useAccountData()

const heroStats = computed(() => [
  { label: t('stats.saved'), value: String(favorites.length) },
  { label: t('stats.shared'), value: String(familyVisibleFavorites.value.length) },
  { label: t('stats.private'), value: String(privateFavorites.value.length) },
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
    badge: String(familyVisibleFavorites.value.length),
    tone: 'accent' as const,
  },
])

function openUserProfile(id: string) {
  openProfileDetail(id)
}

function openFamilyProfile(id: string) {
  openFamilyProfileDetail(id)
}
</script>
