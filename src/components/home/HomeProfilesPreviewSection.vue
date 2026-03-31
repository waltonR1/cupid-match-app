<template>
  <view class="bg-[#f3ede3]">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">
              {{ t('profilesPreview.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-[#1f1a1c] lg:text-[56px]">
            <text>{{ t('profilesPreview.title') }}</text>
            <text class="text-[#d71934]"> · {{ t('profilesPreview.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-[#8c6b49] lg:text-[19px]">
          {{ t('profilesPreview.subtitle') }}
        </view>
      </view>

      <!-- 资料卡 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <view
            v-for="profile in profiles"
            :key="profile.name"
            class="flex min-h-[420px] flex-col border border-[#e2d7c9] bg-[#faf7f1] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,24,18,0.08)]"
        >
          <!-- 顶部 -->
          <view class="flex items-start justify-between gap-4">
            <view class="flex items-center gap-4">
              <view
                  class="flex h-14 w-14 items-center justify-center rounded-full border border-[#dccfbe] bg-[#f3eadf] text-[20px] font-semibold text-[#203854]"
              >
                {{ t(profile.initials) }}
              </view>

              <view>
                <view class="text-[22px] font-semibold text-[#1f1a1c]">
                  {{ t(profile.name) }}
                </view>
                <view class="mt-1 text-[14px] text-[#7c6853]">
                  {{ t(profile.meta) }}
                </view>
              </view>
            </view>

            <view class="rounded-full bg-[#f6ecdf] px-3 py-1 text-[12px] text-[#b07d45]">
              {{ t(profile.goal) }}
            </view>
          </view>

          <!-- 简介 -->
          <view class="mt-6 text-[15px] leading-7 text-[#5f5144]">
            {{ t(profile.summary) }}
          </view>

          <!-- 维度 -->
          <view class="mt-6 grid gap-3">
            <view
                v-for="item in profile.facts"
                :key="item.label"
                class="flex items-start justify-between gap-4 border-b border-[#eee4d7] pb-3 text-[14px]"
            >
              <text class="text-[#8b7864]">{{ t(item.label) }}</text>
              <text class="text-right text-[#1f1a1c]">{{ t(item.value) }}</text>
            </view>
          </view>

          <!-- 标签 -->
          <view class="mt-6 flex flex-wrap gap-2">
            <view
                v-for="tag in profile.tags"
                :key="tag"
                class="rounded-full border border-[#e1d6c8] bg-white px-3 py-1 text-[12px] text-[#7a6450]"
            >
              {{ t(tag) }}
            </view>
          </view>

          <!-- 底部 -->
          <view class="mt-auto pt-8 text-[13px] italic tracking-[2px] text-[#c34a62]">
            {{ t(profile.label) }}
          </view>
        </view>
      </view>

      <!-- CTA -->
      <view class="mt-12 flex justify-center">
        <view
            class="inline-flex items-center justify-center cursor-pointer rounded-lg border border-[#1f1a1c]/40 bg-transparent px-8 py-3 text-[15px] tracking-[1px] text-[#1f1a1c] transition-all duration-300 hover:border-[#1f1a1c] hover:bg-[#1f1a1c] hover:text-white"
            @click="goProfiles"
        >
          {{ t('profilesPreview.cta') }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

interface ProfileFact {
  label: string
  value: string
}

interface ProfilePreviewItem {
  initials: string
  name: string
  meta: string
  goal: string
  summary: string
  facts: ProfileFact[]
  tags: string[]
  label: string
}

const { t } = usePageI18n('home')

const profiles: ProfilePreviewItem[] = [
  {
    initials: 'profilesPreview.item1.initials',
    name: 'profilesPreview.item1.name',
    meta: 'profilesPreview.item1.meta',
    goal: 'profilesPreview.item1.goal',
    summary: 'profilesPreview.item1.summary',
    facts: [
      {
        label: 'profilesPreview.fields.city',
        value: 'profilesPreview.item1.city',
      },
      {
        label: 'profilesPreview.fields.education',
        value: 'profilesPreview.item1.education',
      },
      {
        label: 'profilesPreview.fields.languages',
        value: 'profilesPreview.item1.languages',
      },
    ],
    tags: [
      'profilesPreview.item1.tag1',
      'profilesPreview.item1.tag2',
      'profilesPreview.item1.tag3',
    ],
    label: 'profilesPreview.item1.label',
  },
  {
    initials: 'profilesPreview.item2.initials',
    name: 'profilesPreview.item2.name',
    meta: 'profilesPreview.item2.meta',
    goal: 'profilesPreview.item2.goal',
    summary: 'profilesPreview.item2.summary',
    facts: [
      {
        label: 'profilesPreview.fields.city',
        value: 'profilesPreview.item2.city',
      },
      {
        label: 'profilesPreview.fields.education',
        value: 'profilesPreview.item2.education',
      },
      {
        label: 'profilesPreview.fields.languages',
        value: 'profilesPreview.item2.languages',
      },
    ],
    tags: [
      'profilesPreview.item2.tag1',
      'profilesPreview.item2.tag2',
      'profilesPreview.item2.tag3',
    ],
    label: 'profilesPreview.item2.label',
  },
  {
    initials: 'profilesPreview.item3.initials',
    name: 'profilesPreview.item3.name',
    meta: 'profilesPreview.item3.meta',
    goal: 'profilesPreview.item3.goal',
    summary: 'profilesPreview.item3.summary',
    facts: [
      {
        label: 'profilesPreview.fields.city',
        value: 'profilesPreview.item3.city',
      },
      {
        label: 'profilesPreview.fields.education',
        value: 'profilesPreview.item3.education',
      },
      {
        label: 'profilesPreview.fields.languages',
        value: 'profilesPreview.item3.languages',
      },
    ],
    tags: [
      'profilesPreview.item3.tag1',
      'profilesPreview.item3.tag2',
      'profilesPreview.item3.tag3',
    ],
    label: 'profilesPreview.item3.label',
  },
]

function goProfiles() {
  uni.navigateTo({ url: '/pages/profiles/index' })
}
</script>