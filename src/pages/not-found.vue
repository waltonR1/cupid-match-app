<template>
  <AppPageLayout>
    <view class="mx-auto flex min-h-[70vh] max-w-[960px] items-center justify-center px-8 py-24">
      <EmptyStatePanel
        code="404"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :primary-text="t('actions.home')"
        :secondary-text="t('actions.account')"
        @primary="goHome"
        @secondary="openAccountPage"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openAccountPage } from '@/utils/navigation'

const { t } = usePageI18n('notFound')

function goHome() {
  uni.reLaunch({
    url: '/pages/index',
  })
}

</script>
