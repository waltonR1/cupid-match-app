<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.self"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <DirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
      />

      <SelfFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :expand-text="t('filters.expand')"
        :collapse-text="t('filters.collapse')"
        :gender-label="t('filters.gender')"
        :age-label="t('filters.age')"
        :city-label="t('filters.city')"
        :height-label="t('filters.height')"
        :education-label="t('filters.education')"
        :intent-label="t('filters.intent')"
        :industry-label="t('filters.industry')"
        :occupation-label="t('fields.job')"
        :language-label="t('filters.languages')"
        :verified-label="t('filters.verified')"
        :marital-status-label="t('filters.maritalStatus')"
        :children-label="t('filters.children')"
        :long-distance-label="t('filters.longDistance')"
        :filters="filters"
        :gender-options="genderOptions"
        :age-options="ageOptions"
        :city-options="cityOptions"
        :height-options="heightOptions"
        :education-options="educationOptions"
        :intent-options="intentOptions"
        :industry-options="industryOptions"
        :occupation-options="occupationOptions"
        :language-options="languageOptions"
        :verified-options="verifiedOptions"
        :marital-status-options="maritalStatusOptions"
        :children-options="childrenOptions"
        :long-distance-options="longDistanceOptions"
        :active-filters="activeFilterChips"
        @update:filters="handleUpdateFilters"
        @remove-filter="handleRemoveFilter"
        @reset="handleResetFilters"
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
          <DirectoryCardFrame
            :data="createProfileCardViewModel(item)"
            clickable
            @select="handleProfileOpen(item.id)"
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
import { computed } from 'vue'
import DirectoryCardFrame from '@/components/discovery/shared/directory/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/discovery/shared/directory/directory-card.types'
import DirectoryGridShell from '@/components/discovery/shared/directory/DirectoryGridShell.vue'
import DirectoryIntro from '@/components/discovery/shared/directory/DirectoryIntro.vue'
import DirectoryPagination from '@/components/discovery/shared/directory/DirectoryPagination.vue'
import DirectoryResultToolbar from '@/components/discovery/shared/directory/DirectoryResultToolbar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SelfFilterToolbar from '@/components/discovery/self/SelfFilterToolbar.vue'
import type { SelfDirectoryFilters } from '@/components/discovery/self/self.types'
import { useSelfDirectory } from '@/components/discovery/self/useSelfDirectory'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { NAV_LIST } from '@/constants/nav'
import { getLocalizedProfileCardData, type MockProfile } from '@/mock/business'
import { navigateByNavKey } from '@/utils/navigation'
import { openSelfDetail, openRegisterPage } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('self')
const navList = NAV_LIST

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
  genderOptions,
  cityOptions,
  heightOptions,
  educationOptions,
  intentOptions,
  industryOptions,
  occupationOptions,
  languageOptions,
  verifiedOptions,
  maritalStatusOptions,
  childrenOptions,
  longDistanceOptions,
  sortOptions,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useSelfDirectory()

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

function createProfileCardViewModel(profile: MockProfile): DirectoryCardViewModel {
  const cardData = getLocalizedProfileCardData(locale.value, profile)
  const goalText = cardData.goalCode === 'marriage'
    ? t('card.goalMarriage')
    : cardData.goalCode === 'exclusive'
      ? t('card.goalExclusive')
      : cardData.goalCode === 'cross_border'
        ? t('card.goalCrossBorder')
        : t('card.goalSerious')

  const labelText = cardData.status === 'review'
    ? t('card.labelReview')
    : cardData.status === 'vip'
      ? t('card.labelPriority')
      : t('card.labelSelected')

  return {
    avatar: cardData.avatar,
    name: cardData.name,
    gender: profile.gender,
    meta: cardData.meta,
    badge: goalText,
    summary: cardData.summary,
    facts: [
      { label: t('fields.city'), value: cardData.facts.city },
      { label: t('fields.education'), value: cardData.facts.education },
      { label: t('fields.languages'), value: cardData.facts.languages },
    ],
    tags: cardData.tags,
    footer: labelText,
  }
}

function handleUpdateFilters(nextFilters: Partial<SelfDirectoryFilters>) {
  updateFilters(nextFilters)
}

function handleResetFilters() {
  resetFilters()
}

function handleRemoveFilter(key: keyof SelfDirectoryFilters) {
  removeFilter(key)
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

function handleRegisterClick() {
  openRegisterPage()
}

function handleProfileOpen(id: string) {
  openSelfDetail(id)
}
</script>
