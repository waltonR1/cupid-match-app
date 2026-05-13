<template>
  <AccountShell
    active-page="verification"
    :account-data="accountData"
    :header-eyebrow="t('verification.eyebrow')"
    :header-title="t('verification.title')"
    :header-description="t('verification.subtitle')"
  >
    <EmptyStatePanel
      size="page"
      :title="t('placeholder.title')"
      :subtitle="t('placeholder.verification')"
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
