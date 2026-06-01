<template>
  <AppPageLayout>
    <EventsHero
      :eyebrow="t('hero.eyebrow')"
      :title="t('hero.title')"
      :subtitle="t('hero.subtitle')"
      :next-event-label="t('hero.nextEvent')"
      :fields="pageData.fieldLabels"
      :next-event="pageData.nextEventCard"
      @open="openEventDetail"
    />

    <view v-if="loading" class="mx-auto max-w-[960px] px-5 py-12 text-[13px] text-semantic-text-muted">
      {{ t('loading') }}
    </view>

    <EmptyStatePanel
      v-else-if="error"
      size="page"
      :title="t('error.title')"
      :subtitle="t('error.description')"
      :primary-text="t('error.retry')"
      @primary="refresh"
    />

    <template v-else-if="pageData.scheduleEventCards.length > 0">
      <EventsFeaturedGrid
        :eyebrow="t('featured.eyebrow')"
        :title="t('featured.title')"
        :subtitle="t('featured.subtitle')"
        :stats="pageData.statCards"
        :fields="pageData.fieldLabels"
        :events="pageData.featuredEventCards"
        @open="openEventDetail"
      />

      <EventsScheduleList
        :eyebrow="t('schedule.eyebrow')"
        :title="t('schedule.title')"
        :note="t('schedule.note')"
        :events="pageData.scheduleEventCards"
        @open="openEventDetail"
      />
    </template>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <EmptyStatePanel :title="t('empty.title')" :subtitle="t('empty.description')" />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useEventsDirectory } from '@/hooks/events'
import { openEventDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('events')
const { loading, error, pageData, refresh } = useEventsDirectory(t, locale)
</script>
