<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.family"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <DirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
        :stats="statCards"
      />

      <FamilyFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :age-label="t('filters.age')"
        :city-label="t('filters.city')"
        :education-label="t('filters.education')"
        :intent-label="t('filters.intent')"
        :family-mode-label="t('filters.familyMode')"
        :more-filters-label="t('toolbar.filtersLabel')"
        :expand-text="t('toolbar.filterToggleOpen')"
        :collapse-text="t('toolbar.filterToggleClose')"
        :filters="filters"
        :age-options="ageOptions"
        :city-options="cityOptions"
        :education-options="educationOptions"
        :intent-options="intentOptions"
        :family-mode-options="familyModeOptions"
        :active-filters="activeFilterChips"
        :advanced-open="advancedOpen"
        @update:filters="handleUpdateFilters"
        @remove-filter="handleRemoveFilter"
        @toggle-advanced="advancedOpen = !advancedOpen"
        @reset="handleResetFilters"
      />

      <FamilyAdvancedFilters
        v-if="advancedOpen"
        :title="t('directory.subtitle')"
        :occupation-label="t('filters.occupation')"
        :industry-label="t('filters.industry')"
        :marital-status-label="t('filters.maritalStatus')"
        :children-label="t('filters.children')"
        :long-distance-label="t('filters.longDistance')"
        :filters="filters"
        :occupation-options="occupationOptions"
        :industry-options="industryOptions"
        :marital-status-options="maritalStatusOptions"
        :children-options="childrenOptions"
        :long-distance-options="longDistanceOptions"
        @update:filters="handleUpdateFilters"
      />

      <DirectoryResultToolbar
        :result-prefix="t('directory.resultPrefix')"
        :result-suffix="t('directory.resultSuffix')"
        :page-text="t('directory.pagePrefix')"
        :sort-label="t('toolbar.sortLabel')"
        :total="total"
        :start="pageStart"
        :end="pageEnd"
        :sort-key="sortKey"
        :sort-options="sortOptions"
        @update:sort-key="handleUpdateSort"
      />

      <DirectoryGridShell
        :items="pagedItems"
        :empty-text="t('directory.empty')"
        :empty-action-text="t('filters.clear')"
        :show-empty-action="activeFilterChips.length > 0"
        @reset="handleResetFilters"
      >
        <template #default="{ item }">
          <FamilyDirectoryCard
            :profile="item"
            :locale="locale"
            :city-label="t('fields.city')"
            :education-label="t('fields.education')"
            :residence-label="t('fields.residencePlan')"
            @open="handleProfileOpen"
          />
        </template>
      </DirectoryGridShell>

      <DirectoryPagination
        :page="page"
        :page-size="pageSize"
        :total="total"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        @change="handleChangePage"
      />
    </view>

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DirectoryGridShell from '@/components/common/DirectoryGridShell.vue'
import DirectoryIntro from '@/components/common/DirectoryIntro.vue'
import DirectoryPagination from '@/components/common/DirectoryPagination.vue'
import DirectoryResultToolbar from '@/components/common/DirectoryResultToolbar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FamilyAdvancedFilters from '@/components/family/FamilyAdvancedFilters.vue'
import FamilyDirectoryCard from '@/components/family/FamilyDirectoryCard.vue'
import FamilyFilterToolbar from '@/components/family/FamilyFilterToolbar.vue'
import type { FamilyDirectoryFilters } from '@/components/family/family.types'
import { useFamilyDirectory } from '@/components/family/useFamilyDirectory'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { mockProfiles } from '@/mock/business'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('family')
const advancedOpen = ref(false)

const {
  filters,
  sortKey,
  page,
  pageSize,
  total,
  pagedItems,
  pageStart,
  pageEnd,
  activeFilterChips,
  ageOptions,
  cityOptions,
  educationOptions,
  intentOptions,
  familyModeOptions,
  occupationOptions,
  industryOptions,
  maritalStatusOptions,
  childrenOptions,
  longDistanceOptions,
  sortOptions,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useFamilyDirectory()

const familyProfiles = computed(() => mockProfiles.filter(profile => profile.familyVisible))

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

const statCards = computed(() => {
  const priorityCount = familyProfiles.value.filter(profile => profile.familyPriority).length
  const contactReadyCount = familyProfiles.value.filter(profile => profile.allowFamilyContact).length

  return [
    { label: t('stats.visibleProfiles'), value: String(familyProfiles.value.length) },
    { label: t('stats.priorityProfiles'), value: String(priorityCount) },
    { label: t('stats.contactReady'), value: String(contactReadyCount) },
  ]
})

function handleUpdateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
  updateFilters(nextFilters)
}

function handleRemoveFilter(key: keyof FamilyDirectoryFilters) {
  removeFilter(key)
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

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleProfileOpen(id: string) {
  openProfileDetail(id, 'family')
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>
