<template>
  <view class="mt-3 border border-divider border-t-0 bg-[rgba(250,247,241,0.92)] px-4 py-4 lg:px-5 lg:py-5">
    <view class="mb-4 text-[13px] tracking-[2px] text-text-secondary">
      {{ title }}
    </view>

    <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ industryLabel }}</view>
        <picker
            mode="selector"
            :range="industryOptions"
            range-key="label"
            :value="getSelectedIndex(industryOptions, filters.industry)"
            @change="handleSelect('industry', industryOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(industryOptions, filters.industry) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ occupationLabel }}</view>
        <picker
            mode="selector"
            :range="occupationOptions"
            range-key="label"
            :value="getSelectedIndex(occupationOptions, filters.occupation)"
            @change="handleSelect('occupation', occupationOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(occupationOptions, filters.occupation) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ languageLabel }}</view>
        <picker
            mode="selector"
            :range="languageOptions"
            range-key="label"
            :value="getSelectedIndex(languageOptions, filters.language)"
            @change="handleSelect('language', languageOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(languageOptions, filters.language) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ verifiedLabel }}</view>
        <picker
            mode="selector"
            :range="verifiedOptions"
            range-key="label"
            :value="getSelectedIndex(verifiedOptions, filters.verified)"
            @change="handleSelect('verified', verifiedOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(verifiedOptions, filters.verified) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ maritalStatusLabel }}</view>
        <picker
            mode="selector"
            :range="maritalStatusOptions"
            range-key="label"
            :value="getSelectedIndex(maritalStatusOptions, filters.maritalStatus)"
            @change="handleSelect('maritalStatus', maritalStatusOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(maritalStatusOptions, filters.maritalStatus) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item">
        <view class="profile-filter-label">{{ childrenLabel }}</view>
        <picker
            mode="selector"
            :range="childrenOptions"
            range-key="label"
            :value="getSelectedIndex(childrenOptions, filters.hasChildren)"
            @change="handleSelect('hasChildren', childrenOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(childrenOptions, filters.hasChildren) }}
          </view>
        </picker>
      </view>

      <view class="profile-filter-item md:col-span-2 xl:col-span-1">
        <view class="profile-filter-label">{{ longDistanceLabel }}</view>
        <picker
            mode="selector"
            :range="longDistanceOptions"
            range-key="label"
            :value="getSelectedIndex(longDistanceOptions, filters.acceptLongDistance)"
            @change="handleSelect('acceptLongDistance', longDistanceOptions, $event)"
        >
          <view class="profile-filter-value">
            {{ getSelectedLabel(longDistanceOptions, filters.acceptLongDistance) }}
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DirectoryOption, ProfilesDirectoryFilters } from './profiles.types'

defineProps<{
  title: string
  industryLabel: string
  occupationLabel: string
  languageLabel: string
  verifiedLabel: string
  maritalStatusLabel: string
  childrenLabel: string
  longDistanceLabel: string

  filters: ProfilesDirectoryFilters
  industryOptions: DirectoryOption[]
  occupationOptions: DirectoryOption[]
  languageOptions: DirectoryOption[]
  verifiedOptions: DirectoryOption[]
  maritalStatusOptions: DirectoryOption[]
  childrenOptions: DirectoryOption[]
  longDistanceOptions: DirectoryOption[]
}>()

const emit = defineEmits<{
  (e: 'update:filters', value: Partial<ProfilesDirectoryFilters>): void
}>()

function getSelectedIndex(options: DirectoryOption[], value: string) {
  const index = options.findIndex(item => item.value === value)
  return index >= 0 ? index : 0
}

function getSelectedLabel(options: DirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || options[0]?.label || ''
}

function handleSelect(
    key: keyof ProfilesDirectoryFilters,
    options: DirectoryOption[],
    event: any,
) {
  const index = Number(event?.detail?.value ?? 0)
  const option = options[index]

  emit('update:filters', {
    [key]: option?.value ?? '',
  })
}
</script>

<style scoped>
.profile-filter-item {
  display: flex;
  min-height: 78rpx;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ddd6c8;
  background: #fffdf9;
  padding: 18rpx 22rpx;
}

.profile-filter-label {
  font-size: 12px;
  letter-spacing: 1.5px;
  color: #8b7e6d;
}

.profile-filter-value {
  margin-top: 10rpx;
  font-size: 15px;
  line-height: 1.5;
  color: #1f2d3d;
}
</style>