<template>
  <AccountShell
    active-page="safety"
    :account-data="accountData"
    :header-eyebrow="t('safety.eyebrow')"
    :header-title="t('safety.title')"
    :header-description="t('safety.subtitle')"
  >
    <EmptyStatePanel
      size="page"
      :title="t('placeholder.title')"
      :subtitle="t('placeholder.safety')"
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
