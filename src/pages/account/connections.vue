<template>
  <AccountShell
    active-page="connections"
    :account-data="accountData"
    :header-eyebrow="t('connections.eyebrow')"
    :header-title="t('connections.title')"
    :header-description="t('connections.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="t('connections.eyebrow')"
          :title="t('connections.sections.pool')"
        />

        <view class="mt-6 flex flex-wrap gap-3">
          <view
            v-for="filter in pageData.filterItems"
            :key="filter.label"
            class="rounded-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] text-semantic-text-secondary"
          >
            {{ filter.label }} 路 {{ filter.value }}
          </view>
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in pageData.items"
            :key="item.id"
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5 shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft"
            @click="openProfile(item.id, item.familyVisible)"
          >
            <view class="flex items-start gap-4">
              <AppAvatar :value="''" :fallback="item.displayName" />

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view class="min-w-0">
                    <view class="text-[24px] font-semibold text-semantic-text-primary">
                      {{ item.displayName }}
                    </view>
                    <view class="mt-2 text-[15px] text-semantic-text-secondary">
                      {{ item.city }} 路 {{ item.ageText }}
                    </view>
                  </view>

                  <view
                    class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                    :class="item.familyVisible
                      ? 'border-component-account-badge-meta-border bg-component-account-badge-meta-background text-component-account-badge-meta-text'
                      : 'border-semantic-border-soft bg-semantic-surface-card text-semantic-text-secondary'"
                  >
                    {{ item.familyVisible ? t('common.familyVisible') : t('common.privateOnly') }}
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-semantic-text-primary">
                  {{ item.note }}
                </view>

                <view class="mt-5 flex flex-wrap gap-3">
                  <view
                    v-for="tag in item.tags"
                    :key="tag"
                    class="rounded-full border border-semantic-border-soft bg-semantic-surface-card px-4 py-2 text-[13px] text-semantic-text-secondary"
                  >
                    {{ tag }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('connections.eyebrow')"
            :title="t('connections.sections.reason')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in pageData.reasonPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('connections.eyebrow')"
            :title="t('connections.sections.summary')"
          />

          <view class="mt-6 grid gap-4 sm:grid-cols-2">
            <view
              v-for="item in pageData.summaryItems"
              :key="item.label"
              class="border border-semantic-border-soft bg-semantic-surface-card px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import AppAvatar from '@/components/common/AppAvatar.vue'
import { useAccountOverview } from '@/hooks/account'
import { buildAccountConnectionsPageViewModel } from '@/mappers/account/account.mapper'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openFamilyProfileDetail, openSelfDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const pageData = computed(() => buildAccountConnectionsPageViewModel(accountData, locale.value, t))

function openProfile(id: string, familyVisible: boolean) {
  if (familyVisible) {
    openFamilyProfileDetail(id)
    return
  }

  openSelfDetail(id)
}
</script>
