<template>
  <AccountShell
    active-page="membership"
    :account-data="accountData"
    :header-eyebrow="t('membership.eyebrow')"
    :header-title="t('membership.title')"
    :header-description="t('membership.subtitle')"
  >
    <EmptyStatePanel
      size="page"
      :title="t('placeholder.title')"
      :subtitle="t('placeholder.membership')"
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
