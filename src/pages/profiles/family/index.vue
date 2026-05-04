<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <ProfileDirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
      />

      <ProfileFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :expand-text="t('filters.expand')"
        :collapse-text="t('filters.collapse')"
        :items="pageData.filters"
        :active-filters="pageData.activeFilters"
        @update:filter="handleUpdateFilter"
        @remove-filter="handleRemoveFilter"
        @reset="handleResetFilters"
      />

      <ProfileResultToolbar
        :summary="resultSummary"
        :sort="resultSort"
        @update:sort-key="handleUpdateSort"
      />

      <view class="mt-5">
        <view v-if="pageData.items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <ProfileCardFrame
            v-for="item in pageData.items"
            :key="item.id"
            :data="item.card"
            @select="openFamilyProfileDetail(item.id)"
          />
        </view>

        <EmptyStatePanel
          v-else
          :title="t('directory.empty')"
          :primary-text="pageData.activeFilters.length > 0 ? t('filters.clear') : ''"
          primary-variant="outline"
          variant="compact"
          @primary="handleResetFilters"
        />
      </view>

      <ProfileDirectoryPagination
        :page="pageData.page"
        :page-size="pageData.pageSize"
        :total="pageData.total"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        @change="handleChangePage"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import ProfileFilterToolbar from '@/components/profiles/directory/ProfileFilterToolbar.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import ProfileDirectoryIntro from '@/components/profiles/directory/ProfileDirectoryIntro.vue'
import ProfileDirectoryPagination from '@/components/profiles/directory/ProfileDirectoryPagination.vue'
import ProfileResultToolbar from '@/components/profiles/directory/ProfileResultToolbar.vue'
import { useFamilyProfileDirectory } from '@/hooks/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { FamilyDirectoryFilters, FamilySortKey } from '@/types/profiles/directory'
import type { DirectoryResultSummary, DirectorySortControl } from '@/types/profiles/view'
import { openFamilyProfileDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('family')
const {
  pageData,
  sortKey,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useFamilyProfileDirectory(t, locale)

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

const resultSummary = computed<DirectoryResultSummary>(() => {
  const total = pageData.value.total
  const start = total ? (pageData.value.page - 1) * pageData.value.pageSize + 1 : 0
  const end = total ? Math.min(pageData.value.page * pageData.value.pageSize, total) : 0

  return {
    prefix: t('directory.resultPrefix'),
    suffix: t('directory.resultSuffix'),
    pageText: t('directory.pagePrefix'),
    total,
    start,
    end,
  }
})

const resultSort = computed<DirectorySortControl<FamilySortKey>>(() => ({
  label: t('toolbar.sortLabel'),
  key: sortKey.value,
  options: [
    { label: t('sort.priorityFirst'), value: 'priorityFirst' },
    { label: t('sort.recentActive'), value: 'recentActive' },
    { label: t('sort.ageAsc'), value: 'ageAsc' },
    { label: t('sort.ageDesc'), value: 'ageDesc' },
  ],
}))

function handleUpdateFilter(payload: { key: string, value: string }) {
  updateFilters({ [payload.key]: payload.value })
}

function handleRemoveFilter(key: string) {
  removeFilter(key as keyof FamilyDirectoryFilters)
}

function handleResetFilters() {
  resetFilters()
}

function handleUpdateSort(nextSortKey: string) {
  updateSort(nextSortKey)
}

function handleChangePage(nextPage: number) {
  changePage(nextPage)
}
</script>
