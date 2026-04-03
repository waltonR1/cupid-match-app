<template>
  <view class="min-h-screen bg-page-soft text-text-heading">
    <AppHeader
      :nav-list="navList"
      :active-nav="activeNavKey"
      @nav-click="$emit('nav-click', $event)"
      @register-click="$emit('register-click')"
    />

    <view class="mx-auto max-w-[1240px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <view
        class="mb-6 inline-flex cursor-pointer items-center gap-2 border border-border-base bg-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-text-body-soft transition-colors duration-200 hover:text-brand-brown"
        @click="$emit('back')"
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
        <text>{{ backText }}</text>
      </view>

      <view v-if="heroData" class="space-y-6">
        <DetailHeroPanel :data="heroData" />

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <view class="space-y-6">
            <DetailSectionPanel :title="overviewTitle">
              <DetailFactGrid :items="overviewFacts" />
            </DetailSectionPanel>

            <view class="grid gap-6 lg:grid-cols-2">
              <DetailSectionPanel :title="relationshipTitle" surface="soft">
                <view class="border border-border-light bg-surface-card px-5 py-5">
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ intentLabel }}
                  </view>
                  <view class="mt-3 text-[22px] leading-8 text-text-heading">
                    {{ intentText }}
                  </view>

                  <view class="mt-5 text-[12px] tracking-[1px] text-text-muted">
                    {{ maritalPlanLabel }}
                  </view>
                  <view class="mt-3 text-[16px] leading-8 text-text-body">
                    {{ maritalPlanText }}
                  </view>
                </view>

                <view class="mt-6">
                  <DetailFactList :items="relationshipFacts" />
                </view>
              </DetailSectionPanel>

              <DetailSectionPanel :title="lifestyleTitle">
                <DetailFactList :items="lifestyleFacts" />
              </DetailSectionPanel>
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <DetailSectionPanel :title="accessPolicyTitle" surface="soft" spacing="compact">
              <view class="text-[16px] leading-8 text-text-body-soft">
                {{ accessNote }}
              </view>
            </DetailSectionPanel>

            <DetailSectionPanel :title="curationFocusTitle">
              <DetailFactList :items="spotlightFacts" />
            </DetailSectionPanel>

            <DetailSectionPanel :title="highlightsTitle">
              <view class="grid gap-3">
                <view
                  v-for="item in highlightTexts"
                  :key="item"
                  class="border border-border-light bg-surface-card-soft px-4 py-4 text-[16px] leading-7 text-text-body"
                >
                  {{ item }}
                </view>
              </view>
            </DetailSectionPanel>

            <DetailSectionPanel :title="tagsTitle" spacing="compact">
              <DetailTagList :items="tagTexts" />
            </DetailSectionPanel>
          </view>
        </view>
      </view>

      <EmptyStatePanel
        v-else
        :title="notFoundTitle"
        :subtitle="notFoundSubtitle"
        :primary-text="backText"
        primary-variant="outline"
        variant="compact"
        @primary="$emit('back')"
      />
    </view>

    <AppFooter
      :nav-list="navList"
      @nav-click="$emit('nav-click', $event)"
    />
  </view>
</template>

<script setup lang="ts">
import type { NavItem } from '@/constants/nav'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import DetailFactGrid from './DetailFactGrid.vue'
import DetailFactList from './DetailFactList.vue'
import DetailHeroPanel from './DetailHeroPanel.vue'
import DetailSectionPanel from './DetailSectionPanel.vue'
import DetailTagList from './DetailTagList.vue'
import type { DetailFactItem, DetailHeroData } from './detail.types'

defineProps<{
  navList: NavItem[]
  activeNavKey: string
  backText: string
  heroData: DetailHeroData | null
  overviewFacts: DetailFactItem[]
  relationshipFacts: DetailFactItem[]
  lifestyleFacts: DetailFactItem[]
  spotlightFacts: DetailFactItem[]
  highlightTexts: string[]
  tagTexts: string[]
  overviewTitle: string
  relationshipTitle: string
  lifestyleTitle: string
  accessPolicyTitle: string
  curationFocusTitle: string
  highlightsTitle: string
  tagsTitle: string
  intentLabel: string
  intentText: string
  maritalPlanLabel: string
  maritalPlanText: string
  accessNote: string
  notFoundTitle: string
  notFoundSubtitle: string
}>()

defineEmits<{
  (e: 'back'): void
  (e: 'nav-click', key: string): void
  (e: 'register-click'): void
}>()
</script>
