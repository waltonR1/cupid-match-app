<template>
  <AccountShell
    active-page="profile"
    :account-data="accountData"
    :header-eyebrow="t('profile.eyebrow')"
    :header-title="t('profile.title')"
    :header-description="t('profile.subtitle')"
  >
    <EmptyStatePanel
      size="page"
      :title="t('placeholder.title')"
      :subtitle="t('placeholder.profile')"
    />
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountOverview } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
</script>
