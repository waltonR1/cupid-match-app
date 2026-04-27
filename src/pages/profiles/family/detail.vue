<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1240px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <view
        class="mb-6 inline-flex cursor-pointer items-center gap-2 border border-semantic-border-default bg-semantic-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-semantic-text-muted transition-colors duration-200 hover:text-semantic-text-link"
        @click="handleBack"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75 2.5L4.25 6L7.75 9.5"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <text>{{ t('actions.backToFamily') }}</text>
      </view>

      <view v-if="heroData" class="space-y-6">
        <ProfileDetailHero :data="heroData" />

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <view class="space-y-6">
            <ProfileDetailFactGrid
              :title="t('sections.overview')"
              :items="overviewFacts"
            />

            <view class="grid gap-6 lg:grid-cols-2">
              <ProfileDetailFactSection
                :title="t('sections.relationship')"
                :items="relationshipFacts"
                surface="soft"
              >
                <view class="mt-6 border border-semantic-border-divider bg-semantic-surface-card px-5 py-5">
                  <view class="text-[12px] tracking-[1px] text-semantic-text-muted">
                    {{ t('fields.intent') }}
                  </view>
                  <view class="mt-3 text-[22px] leading-8 text-semantic-text-primary">
                    {{ intentText }}
                  </view>

                  <view class="mt-5 text-[12px] tracking-[1px] text-semantic-text-muted">
                    {{ t('fields.maritalPlan') }}
                  </view>
                  <view class="mt-3 text-[16px] leading-8 text-semantic-text-secondary">
                    {{ maritalPlanText }}
                  </view>
                </view>
              </ProfileDetailFactSection>

              <ProfileDetailFactSection
                :title="t('sections.lifestyle')"
                :items="lifestyleFacts"
              />
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <view class="border border-semantic-border-default bg-semantic-surface-soft px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">
                {{ t('sections.accessPolicy') }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-semantic-text-muted">
                {{ t('hero.accessNote') }}
              </view>
            </view>

            <ProfileDetailFactSection
              :title="t('sections.curationFocus')"
              :items="spotlightFacts"
            />

            <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">
                {{ t('sections.highlights') }}
              </view>

              <view class="mt-6 grid gap-3">
                <view
                  v-for="item in highlightTexts"
                  :key="item"
                  class="border border-semantic-border-divider bg-semantic-surface-soft px-4 py-4 text-[16px] leading-7 text-semantic-text-secondary"
                >
                  {{ item }}
                </view>
              </view>
            </view>

            <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">
                {{ t('sections.tags') }}
              </view>

              <view class="mt-4 flex flex-wrap gap-2">
                <view
                  v-for="item in tagTexts"
                  :key="item"
                  class="rounded-full border border-semantic-border-default bg-semantic-surface-panel px-3 py-1.5 text-[12px] text-semantic-text-eyebrow"
                >
                  {{ item }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <EmptyStatePanel
        v-else
        :title="t('sections.notFoundTitle')"
        :subtitle="t('sections.notFoundSubtitle')"
        :primary-text="t('actions.backToFamily')"
        primary-variant="outline"
        variant="compact"
        @primary="handleBack"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import ProfileDetailFactGrid from '@/components/profiles/detail/ProfileDetailFactGrid.vue'
import ProfileDetailFactSection from '@/components/profiles/detail/ProfileDetailFactSection.vue'
import ProfileDetailHero from '@/components/profiles/detail/ProfileDetailHero.vue'
import { useFamilyProfileDetailPage } from '@/hooks/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t, locale } = usePageI18n('familyDetail')
const profileId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

const {
  heroData,
  overviewFacts,
  relationshipFacts,
  lifestyleFacts,
  spotlightFacts,
  intentText,
  maritalPlanText,
  highlightTexts,
  tagTexts,
} = useFamilyProfileDetailPage(profileId, t, locale)

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  uni.redirectTo({
    url: '/pages/profiles/family/index',
  })
}
</script>
