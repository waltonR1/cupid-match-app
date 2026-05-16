<template>
  <AccountShell :account-data="accountData" active-page="profiles">
    <view v-if="pageData" class="grid gap-6">
      <view
        class="inline-flex w-fit cursor-pointer items-center gap-2 text-[14px] text-semantic-text-secondary transition-colors hover:text-semantic-text-primary"
        @click="goBack"
      >
        <text>&lt;</text>
        <text>{{ t('profiles.detail.back') }}</text>
      </view>

      <AccountSubPageHeader
        :label="t('profiles.title')"
        :title="pageData.displayName"
        :description="t('profiles.detail.subtitle')"
      />

      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="flex flex-wrap items-center gap-4">
          <image :src="pageData.avatarUrl" class="h-16 w-16 rounded-full object-cover" />
          <view>
            <view class="text-[20px] font-semibold">{{ pageData.displayName }}</view>
            <view class="mt-1 text-[14px] text-semantic-text-secondary">{{ pageData.city }}</view>
          </view>
          <view class="flex flex-wrap gap-2">
            <view
              v-for="badge in pageData.ownershipBadges"
              :key="badge"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1.5 text-[12px] text-semantic-text-secondary"
            >
              {{ badge }}
            </view>
          </view>
        </view>

        <view class="mt-6 grid border-t border-semantic-border-soft pt-5 sm:grid-cols-2 xl:grid-cols-4">
          <view
            v-for="entry in pageData.statusItems"
            :key="entry.label"
            class="border-b border-semantic-border-soft py-4 sm:border-r sm:px-4 xl:border-b-0 first:sm:pl-0 last:sm:border-r-0"
          >
            <view class="text-[12px] text-semantic-text-card-label">{{ entry.label }}</view>
            <view class="mt-2 text-[14px] text-semantic-text-primary">{{ entry.value }}</view>
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <view class="grid gap-6">
          <view
            v-for="section in pageData.sections"
            :key="section.key"
            class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
          >
            <view class="flex items-center justify-between gap-4">
              <view class="text-[16px] font-semibold">{{ section.title }}</view>
              <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-card-label">
                {{ t('profiles.detail.readOnly') }}
              </view>
            </view>
            <view class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                v-for="entry in section.items"
                :key="entry.label"
                class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start"
              >
                <view class="text-[13px] text-semantic-text-secondary">{{ entry.label }}</view>
                <view class="min-h-[24px] text-[15px]">{{ entry.value }}</view>
              </view>
            </view>
          </view>
        </view>

        <aside class="grid h-fit gap-6 xl:sticky xl:top-6">
          <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.visibility') }}</view>
            <view class="mt-4 grid gap-3">
              <view
                v-for="item in pageData.visibilityItems"
                :key="`${item.profileId}-${item.fieldCode}`"
                class="border-t border-semantic-border-soft pt-3"
              >
                <view class="text-[13px] text-semantic-text-secondary">{{ item.label }}</view>
                <view class="mt-1 text-[14px]">{{ item.visibilityText }}</view>
              </view>
            </view>
          </view>
        </aside>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import { useAccountOverview, useAccountProfileDetail } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openMyProfilePage } from '@/utils/navigation'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const profileId = ref('')
const { pageData } = useAccountProfileDetail(() => profileId.value, t, () => locale.value)

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

function goBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  openMyProfilePage()
}
</script>
