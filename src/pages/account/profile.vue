<template>
  <AccountPageShell
    active-page="profile"
    hero-tone="home"
    :eyebrow="t('hero.eyebrow')"
    :title="t('hero.title')"
    :subtitle="t('hero.subtitle')"
    :stats="heroStats"
  >
    <template #intro>
      <AccountPerspectiveGrid :items="perspectiveItems" />
    </template>

    <view v-if="profile" class="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <view class="grid gap-6">
        <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('basics.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('basics.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="item in basicRows"
              :key="item.label"
              class="flex items-start justify-between gap-6 border-t border-border-soft pt-4"
            >
              <text class="text-[13px] uppercase tracking-[2px] text-text-subtle">
                {{ item.label }}
              </text>
              <text class="max-w-[300px] text-right text-[15px] leading-7 text-text-heading">
                {{ item.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('boundaries.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('boundaries.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in boundaryPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-text-body"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-border-base bg-surface-card px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('narrative.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('narrative.title') }}
          </view>
          <view class="mt-5 text-[16px] leading-8 text-text-body">
            {{ localize(profile.summary) }}
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
            <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
              {{ t('highlights.eyebrow') }}
            </view>
            <view class="mt-3 text-[28px] font-semibold text-text-heading">
              {{ t('highlights.title') }}
            </view>

            <view class="mt-6 grid gap-4">
              <view
                v-for="item in profile.highlights"
                :key="localize(item)"
                class="flex items-start gap-3 text-[15px] leading-7 text-text-body"
              >
                <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                <text>{{ localize(item) }}</text>
              </view>
            </view>
          </view>

          <view class="border border-border-inverse bg-surface-inverse-panel px-7 py-7 shadow-card">
            <view class="text-[11px] uppercase tracking-[3px] text-brand-accent-foreground">
              {{ t('highlights.eyebrow') }}
            </view>
            <view class="mt-3 text-[28px] font-semibold text-text-inverse">
              {{ t('highlights.tagsTitle') }}
            </view>

            <view class="mt-6 flex flex-wrap gap-3">
              <view
                v-for="item in profile.tags"
                :key="localize(item)"
                class="rounded-full border border-border-inverse-hover bg-white/5 px-4 py-2 text-[13px] text-text-inverse-soft"
              >
                {{ localize(item) }}
              </view>
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
import { useAccountData } from '@/composables/use-account-data'
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('myProfile')
const { t: accountT } = usePageI18n('account')
const {
  account,
  profile,
  advisorContactSetting,
  visibleFieldsSetting,
  localize,
  formatLanguages,
} = useAccountData()

const heroStats = computed(() => [
  {
    label: t('stats.completion'),
    value: `${account.completion}%`,
    caption: profile?.name ?? '',
  },
  {
    label: t('stats.visibility'),
    value: profile?.familyVisible ? accountT('snapshot.enabled') : accountT('snapshot.disabled'),
    caption: advisorContactSetting.value?.enabled ? accountT('snapshot.enabled') : accountT('snapshot.disabled'),
  },
  {
    label: t('stats.highlights'),
    value: String(profile?.highlights.length ?? 0),
    caption: profile ? formatLanguages(profile.languages) : '',
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
    badge: profile?.familyVisible ? accountT('snapshot.enabled') : accountT('snapshot.disabled'),
    tone: 'accent' as const,
  },
])

const basicRows = computed(() => {
  if (!profile) return []

  return [
    { label: t('basics.city'), value: localize(profile.city) },
    { label: t('basics.education'), value: localize(profile.education) },
    { label: t('basics.occupation'), value: localize(profile.occupation) },
    { label: t('basics.intent'), value: localize(profile.intent) },
    { label: t('basics.residence'), value: localize(profile.residencePlan) },
    { label: t('basics.languages'), value: formatLanguages(profile.languages) },
  ]
})

const boundaryPoints = computed(() => [
  profile?.familyVisible ? t('boundaries.visibilityOn') : t('boundaries.visibilityOff'),
  profile?.allowFamilyContact ? t('boundaries.familyContactOn') : t('boundaries.familyContactOff'),
  visibleFieldsSetting.value?.enabled ? t('boundaries.fieldsOpen') : t('boundaries.fieldsClosed'),
])
</script>
