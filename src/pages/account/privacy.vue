<template>
  <AccountPageShell
    active-page="privacy"
    hero-tone="membership"
    :eyebrow="t('hero.eyebrow')"
    :title="t('hero.title')"
    :subtitle="t('hero.subtitle')"
    :stats="heroStats"
  >
    <template #intro>
      <AccountPerspectiveGrid :items="perspectiveItems" />
    </template>

    <view class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <view class="border border-border-base bg-surface-base px-7 py-7 shadow-card">
        <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
          {{ t('sections.userEyebrow') }}
        </view>
        <view class="mt-3 text-[28px] font-semibold text-text-heading">
          {{ t('sections.userTitle') }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-text-body">
          {{ t('sections.userSubtitle') }}
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in userSettings"
            :key="item.id"
            class="border border-border-soft bg-surface-card px-5 py-5 shadow-card"
          >
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[24px] font-semibold text-text-heading">
                  {{ localize(item.title) }}
                </view>
                <view class="mt-3 text-[15px] leading-7 text-text-body">
                  {{ localize(item.desc) }}
                </view>
              </view>

              <view
                class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                :class="statusTone(item.enabled)"
              >
                {{ item.enabled ? t('sections.statusEnabled') : t('sections.statusDisabled') }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-support">
            {{ t('sections.familyEyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ t('sections.familyTitle') }}
          </view>
          <view class="mt-3 text-[15px] leading-7 text-text-body">
            {{ t('sections.familySubtitle') }}
          </view>

          <view
            v-if="familyAssistSetting"
            class="mt-6 border border-border-accent/40 bg-surface-base px-5 py-5 shadow-card"
          >
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[24px] font-semibold text-text-heading">
                  {{ localize(familyAssistSetting.title) }}
                </view>
                <view class="mt-3 text-[15px] leading-7 text-text-body">
                  {{ localize(familyAssistSetting.desc) }}
                </view>
              </view>

              <view
                class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                :class="statusTone(familyAssistSetting.enabled)"
              >
                {{ familyAssistSetting.enabled ? t('sections.statusEnabled') : t('sections.statusDisabled') }}
              </view>
            </view>
          </view>
        </view>

        <view class="border border-border-inverse bg-surface-inverse-panel px-7 py-7 shadow-card">
          <view class="text-[11px] uppercase tracking-[3px] text-brand-accent-foreground">
            {{ t('notes.eyebrow') }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-inverse">
            {{ t('notes.title') }}
          </view>

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in notePoints"
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
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('privacy')
const {
  privacySettings,
  familyAssistSetting,
  advisorContactSetting,
  visibleFieldsSetting,
  localize,
} = useAccountData()

const heroStats = computed(() => {
  const enabled = privacySettings.filter(item => item.enabled).length
  const disabled = privacySettings.length - enabled

  return [
    { label: t('stats.enabled'), value: String(enabled) },
    { label: t('stats.disabled'), value: String(disabled) },
    {
      label: t('stats.familyAssist'),
      value: familyAssistSetting.value?.enabled ? t('sections.statusEnabled') : t('sections.statusDisabled'),
    },
  ]
})

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
    badge: familyAssistSetting.value?.enabled ? t('sections.statusEnabled') : t('sections.statusDisabled'),
    tone: 'accent' as const,
  },
])

const userSettings = computed(() =>
  [advisorContactSetting.value, visibleFieldsSetting.value].filter((item): item is NonNullable<typeof item> => Boolean(item))
)

const notePoints = computed(() => [
  t('notes.point1'),
  t('notes.point2'),
  t('notes.point3'),
])

function statusTone(enabled: boolean) {
  if (enabled) {
    return 'border-border-accent bg-button-accent text-button-neutral-ink'
  }

  return 'border-border-soft bg-page-soft text-text-body-soft'
}
</script>
