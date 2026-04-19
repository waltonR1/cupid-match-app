<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <DirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
      />

      <FamilyFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :expand-text="t('filters.expand')"
        :collapse-text="t('filters.collapse')"
        :gender-label="t('filters.gender')"
        :age-label="t('filters.age')"
        :city-label="t('filters.city')"
        :education-label="t('filters.education')"
        :intent-label="t('filters.intent')"
        :family-mode-label="t('filters.familyMode')"
        :occupation-label="t('filters.occupation')"
        :industry-label="t('filters.industry')"
        :marital-status-label="t('filters.maritalStatus')"
        :children-label="t('filters.children')"
        :long-distance-label="t('filters.longDistance')"
        :filters="filters"
        :gender-options="genderOptions"
        :age-options="ageOptions"
        :city-options="cityOptions"
        :education-options="educationOptions"
        :intent-options="intentOptions"
        :family-mode-options="familyModeOptions"
        :occupation-options="occupationOptions"
        :industry-options="industryOptions"
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
            summary-class="line-clamp-3"
            @select="openFamilyProfileDetail(item.id)"
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
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import FamilyFilterToolbar from '@/components/profiles/family/FamilyFilterToolbar.vue'
import DirectoryCardFrame from '@/components/profiles/shared/directory/DirectoryCardFrame.vue'
import DirectoryGridShell from '@/components/profiles/shared/directory/DirectoryGridShell.vue'
import DirectoryIntro from '@/components/profiles/shared/directory/DirectoryIntro.vue'
import DirectoryPagination from '@/components/profiles/shared/directory/DirectoryPagination.vue'
import DirectoryResultToolbar from '@/components/profiles/shared/directory/DirectoryResultToolbar.vue'
import { useFamilyDirectory } from '@/composables/profiles'
import {
  localized,
  pickLocalized,
  type LocalizedText,
  type Profile,
} from '@/api/modules/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { DirectoryCardViewModel } from '@/types/directory-card'
import type { ActiveDirectoryFilterChip, DirectoryOption, FamilyDirectoryFilters } from '@/types/family-directory'
import { openFamilyProfileDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('family')

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
} = useFamilyDirectory()

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
const cityOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.city),
])
const educationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('本科', 'Licence', 'Bachelor')[locale.value], value: 'bachelor' },
  { label: localized('硕士', 'Master', 'Master')[locale.value], value: 'master' },
  { label: localized('博士', 'Doctorat', 'PhD')[locale.value], value: 'phd' },
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
const familyModeOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('仅背景可见', 'Contexte seulement', 'Context only')[locale.value], value: 'context_only' },
  { label: localized('可辅助沟通', 'Pret pour echange famille', 'Contact-ready')[locale.value], value: 'contact_ready' },
  { label: localized('优先家长评估', 'Priorite famille', 'Priority review')[locale.value], value: 'priority' },
])
const occupationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.occupation),
])
const industryOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedOptions(sourceItems.value, profile => profile.industry),
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
  { label: localized('更偏同城', 'Plutot meme ville', 'Prefers same city')[locale.value], value: 'no' },
])
const sortOptions = computed<DirectoryOption[]>(() => [
  { label: localized('优先家长评估', 'Priorite famille', 'Priority review')[locale.value], value: 'priorityFirst' },
  { label: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value], value: 'recentActive' },
  { label: localized('年龄从低到高', 'Age croissant', 'Age: low to high')[locale.value], value: 'ageAsc' },
  { label: localized('年龄从高到低', 'Age decroissant', 'Age: high to low')[locale.value], value: 'ageDesc' },
])
const activeFilterChips = computed<ActiveDirectoryFilterChip[]>(() => {
  const chips = [
    buildActiveChip('gender', t('filters.gender'), genderOptions.value, filters.value.gender),
    buildActiveChip('ageRange', t('filters.age'), ageOptions.value, filters.value.ageRange),
    buildActiveChip('city', t('filters.city'), cityOptions.value, filters.value.city),
    buildActiveChip('education', t('filters.education'), educationOptions.value, filters.value.education),
    buildActiveChip('intentCode', t('filters.intent'), intentOptions.value, filters.value.intentCode),
    buildActiveChip('familyMode', t('filters.familyMode'), familyModeOptions.value, filters.value.familyMode),
    buildActiveChip('occupation', t('filters.occupation'), occupationOptions.value, filters.value.occupation),
    buildActiveChip('industry', t('filters.industry'), industryOptions.value, filters.value.industry),
    buildActiveChip('maritalStatus', t('filters.maritalStatus'), maritalStatusOptions.value, filters.value.maritalStatus),
    buildActiveChip('hasChildren', t('filters.children'), childrenOptions.value, filters.value.hasChildren),
    buildActiveChip('acceptLongDistance', t('filters.longDistance'), longDistanceOptions.value, filters.value.acceptLongDistance),
  ]

  return chips.filter((item): item is ActiveDirectoryFilterChip => Boolean(item))
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
  key: keyof FamilyDirectoryFilters,
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
  const occupation = localize(profile.occupation)
  const meta = locale.value === 'zh'
    ? `${profile.age}岁 / ${occupation}`
    : locale.value === 'fr'
      ? `${profile.age} ans / ${occupation}`
      : `${profile.age} / ${occupation}`

  const familyMode = profile.familyPriority
    ? t('modes.priority')
    : profile.allowFamilyContact
      ? t('modes.contactReady')
      : t('modes.contextOnly')

  const maritalStatus = profile.maritalStatus === 'divorced'
    ? t('tags.maritalDivorced')
    : profile.maritalStatus === 'widowed'
      ? t('tags.maritalWidowed')
      : t('tags.maritalSingle')

  const familyContext = profile.acceptLongDistance
    ? t('tags.longDistanceYes')
    : profile.hasChildren
      ? t('tags.childrenYes')
      : t('tags.childrenNo')

  const decisionLabel = profile.status === 'review'
    ? t('card.labelReview')
    : profile.familyPriority
      ? t('card.labelPriority')
      : profile.allowFamilyContact
        ? t('card.labelContactReady')
        : t('card.labelObserve')

  return {
    avatar: profile.avatar,
    name: profile.name,
    gender: profile.gender,
    meta,
    badge: familyMode,
    summary: localize(profile.maritalPlan),
    facts: [
      { label: t('fields.city'), value: localize(profile.city) },
      { label: t('fields.education'), value: localize(profile.education) },
      { label: t('fields.residencePlan'), value: localize(profile.residencePlan) },
    ],
    tags: [
      localize(profile.intent),
      maritalStatus,
      familyContext,
    ],
    footer: decisionLabel,
  }
}
</script>
