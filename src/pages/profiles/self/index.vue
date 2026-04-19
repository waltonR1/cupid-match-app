<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
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
            :data="buildCardViewModel(item)"
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
import SelfFilterToolbar from '@/components/profiles/self/SelfFilterToolbar.vue'
import DirectoryCardFrame from '@/components/profiles/shared/directory/DirectoryCardFrame.vue'
import DirectoryGridShell from '@/components/profiles/shared/directory/DirectoryGridShell.vue'
import DirectoryIntro from '@/components/profiles/shared/directory/DirectoryIntro.vue'
import DirectoryPagination from '@/components/profiles/shared/directory/DirectoryPagination.vue'
import DirectoryResultToolbar from '@/components/profiles/shared/directory/DirectoryResultToolbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useSelfDirectory } from '@/composables/profiles'
import {
  getLocalizedProfileCardData,
  getProfileLanguageLabel,
  localized,
  pickLocalized,
  type LocalizedText,
  type Profile,
} from '@/api/modules/profiles'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { DirectoryCardViewModel } from '@/types/directory-card'
import type { ActiveDirectoryFilterChip, DirectoryOption, SelfDirectoryFilters, SelfSortKey } from '@/types/self-directory'
import { openRegisterPage, openSelfDetail, navigateByNavKey } from '@/utils/navigation'

const { t, locale } = usePageI18n('self')
const navList = NAV_LIST

const {
  filters,
  sortKey,
  page,
  pageSize,
  sourceItems,
  total,
  pagedItems,
  pageStart,
  pageEnd,
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
const allLabel = computed(() => localized('全部', 'Tous', 'All')[locale.value])
const ageOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('25岁以下', 'Moins de 25 ans', 'Under 25')[locale.value], value: 'under25' },
  { label: localized('25-29岁', '25-29 ans', '25-29')[locale.value], value: '25to29' },
  { label: localized('30-34岁', '30-34 ans', '30-34')[locale.value], value: '30to34' },
  { label: localized('35-39岁', '35-39 ans', '35-39')[locale.value], value: '35to39' },
  { label: localized('40岁以上', '40 ans et plus', '40+')[locale.value], value: '40plus' },
])
const genderOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: t('filters.genderMale'), value: 'male' },
  { label: t('filters.genderFemale'), value: 'female' },
])
const heightOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: '165cm-', value: 'under165' },
  { label: '165-169cm', value: '165to169' },
  { label: '170-174cm', value: '170to174' },
  { label: '175-179cm', value: '175to179' },
  { label: '180cm+', value: '180plus' },
])
const educationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('本科', 'Licence', 'Bachelor')[locale.value], value: 'bachelor' },
  { label: localized('硕士', 'Master', 'Master')[locale.value], value: 'master' },
  { label: localized('博士', 'Doctorat', 'PhD')[locale.value], value: 'phd' },
])
const cityOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.city),
])
const intentOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...sourceItems.value
    .map(profile => ({
      label: localize(profile.intent),
      value: profile.intentCode,
    }))
    .filter(dedupeOption),
])
const industryOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.industry),
])
const occupationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.occupation),
])
const languageOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...Array.from(new Set(sourceItems.value.flatMap(profile => profile.languages)))
    .sort((left, right) => getProfileLanguageLabel(locale.value, left).localeCompare(getProfileLanguageLabel(locale.value, right)))
    .map(value => ({
      label: getProfileLanguageLabel(locale.value, value),
      value,
    })),
])
const verifiedOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('已认证', 'Verifie', 'Verified')[locale.value], value: 'verified' },
  { label: localized('未认证', 'Non verifie', 'Unverified')[locale.value], value: 'unverified' },
])
const maritalStatusOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('未婚', 'Celibataire', 'Single')[locale.value], value: 'single' },
  { label: localized('离异', 'Divorce', 'Divorced')[locale.value], value: 'divorced' },
  { label: localized('丧偶', 'Veuf / veuve', 'Widowed')[locale.value], value: 'widowed' },
])
const childrenOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('有孩子', 'Avec enfants', 'Has children')[locale.value], value: 'yes' },
  { label: localized('无孩子', 'Sans enfant', 'No children')[locale.value], value: 'no' },
])
const longDistanceOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('接受异地', 'Ouvert a distance', 'Open to long-distance')[locale.value], value: 'yes' },
  { label: localized('不接受异地', 'Pas de distance', 'No long-distance')[locale.value], value: 'no' },
])
const sortOptions = computed<DirectoryOption[]>(() => [
  { label: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value], value: 'recentActive' },
  { label: localized('优先资料', 'Profils prioritaires', 'Priority profiles')[locale.value], value: 'priorityFirst' },
  { label: localized('年龄从低到高', 'Age croissant', 'Age: low to high')[locale.value], value: 'ageAsc' },
  { label: localized('年龄从高到低', 'Age decroissant', 'Age: high to low')[locale.value], value: 'ageDesc' },
])
const activeFilterChips = computed<ActiveDirectoryFilterChip[]>(() => {
  const chips = [
    buildActiveChip('gender', t('filters.gender'), genderOptions.value, filters.value.gender),
    buildActiveChip('ageRange', t('filters.age'), ageOptions.value, filters.value.ageRange),
    buildActiveChip('city', t('filters.city'), cityOptions.value, filters.value.city),
    buildActiveChip('heightRange', t('filters.height'), heightOptions.value, filters.value.heightRange),
    buildActiveChip('education', t('filters.education'), educationOptions.value, filters.value.education),
    buildActiveChip('intentCode', t('filters.intent'), intentOptions.value, filters.value.intentCode),
    buildActiveChip('industry', t('filters.industry'), industryOptions.value, filters.value.industry),
    buildActiveChip('occupation', t('fields.job'), occupationOptions.value, filters.value.occupation),
    buildActiveChip('language', t('filters.languages'), languageOptions.value, filters.value.language),
    buildActiveChip('verified', t('filters.verified'), verifiedOptions.value, filters.value.verified),
    buildActiveChip('maritalStatus', t('filters.maritalStatus'), maritalStatusOptions.value, filters.value.maritalStatus),
    buildActiveChip('hasChildren', t('filters.children'), childrenOptions.value, filters.value.hasChildren),
    buildActiveChip('acceptLongDistance', t('filters.longDistance'), longDistanceOptions.value, filters.value.acceptLongDistance),
  ]

  return chips.filter((item): item is ActiveDirectoryFilterChip => Boolean(item))
})

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

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function buildBaseAllOption(label: string): DirectoryOption {
  return {
    label,
    value: '',
  }
}

function resolveOptionLabel(options: DirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || value
}

function buildActiveChip(
  key: keyof SelfDirectoryFilters,
  label: string,
  options: DirectoryOption[],
  value: string,
): ActiveDirectoryFilterChip | undefined {
  if (!value) return undefined

  return {
    key,
    label,
    value: resolveOptionLabel(options, value),
  }
}

function buildLocalizedOptions(profiles: Profile[], getter: (profile: Profile) => LocalizedText) {
  const options = profiles
    .map(profile => ({
      label: localize(getter(profile)),
      value: getter(profile).en,
    }))
    .filter(dedupeOption)

  return options.sort((left, right) => left.label.localeCompare(right.label))
}

function dedupeOption<T extends DirectoryOption>(item: T, index: number, items: T[]) {
  if (!item.value || !item.label) return false
  return items.findIndex(option => option.value === item.value) === index
}

function buildCardViewModel(profile: Profile): DirectoryCardViewModel {
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
</script>
