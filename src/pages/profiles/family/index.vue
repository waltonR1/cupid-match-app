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
        :summary="pageData.resultSummary"
        :sort="pageData.resultSort"
        @update:sort-key="handleUpdateSort"
      />

      <ProfileResultsGrid
        :items="pageData.items"
        :empty-text="t('directory.empty')"
        :empty-action-text="t('filters.clear')"
        :show-empty-action="pageData.activeFilters.length > 0"
        @reset="handleResetFilters"
      >
        <template #default="{ item }">
          <ProfileCardFrame
            :data="item.card"
            @select="openFamilyProfileDetail(item.id)"
          />
        </template>
      </ProfileResultsGrid>

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
import ProfileFilterToolbar from '@/components/profiles/directory/ProfileFilterToolbar.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import ProfileResultsGrid from '@/components/profiles/directory/ProfileResultsGrid.vue'
import ProfileDirectoryIntro from '@/components/profiles/directory/ProfileDirectoryIntro.vue'
import ProfileDirectoryPagination from '@/components/profiles/directory/ProfileDirectoryPagination.vue'
import ProfileResultToolbar from '@/components/profiles/directory/ProfileResultToolbar.vue'
import { useFamilyProfileDirectoryPage } from '@/hooks/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { FamilyDirectoryFilters } from '@/types/profiles/directory'
import { openFamilyProfileDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('family')
const {
  pageData,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useFamilyProfileDirectoryPage(t, locale)

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

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
