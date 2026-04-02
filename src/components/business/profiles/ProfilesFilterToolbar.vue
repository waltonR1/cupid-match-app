<template>
  <view class="profile-filter-panel">
    <view class="flex flex-col gap-4">
      <view class="flex flex-wrap items-center gap-3">
        <view class="text-[13px] tracking-[3px] text-[#7f7466]">
          {{ title }}
        </view>

        <view
            class="interactive-view ml-auto border border-[#ddd6c8] bg-[#fffdf9] px-4 py-2 text-[13px] text-[#5d6a78] transition-all duration-200"
            @click="$emit('reset')"
        >
          {{ resetText }}
        </view>
      </view>

      <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <view class="profile-filter-item interactive-view">
          <view class="profile-filter-label">{{ ageLabel }}</view>
          <picker
              mode="selector"
              :range="ageOptions"
              range-key="label"
              :value="getSelectedIndex(ageOptions, filters.ageRange)"
              @change="handleSelect('ageRange', ageOptions, $event)"
          >
            <view class="profile-filter-value">
              {{ getSelectedLabel(ageOptions, filters.ageRange) }}
            </view>
          </picker>
        </view>

        <view class="profile-filter-item interactive-view">
          <view class="profile-filter-label">{{ cityLabel }}</view>
          <picker
              mode="selector"
              :range="cityOptions"
              range-key="label"
              :value="getSelectedIndex(cityOptions, filters.city)"
              @change="handleSelect('city', cityOptions, $event)"
          >
            <view class="profile-filter-value">
              {{ getSelectedLabel(cityOptions, filters.city) }}
            </view>
          </picker>
        </view>

        <view class="profile-filter-item interactive-view">
          <view class="profile-filter-label">{{ heightLabel }}</view>
          <picker
              mode="selector"
              :range="heightOptions"
              range-key="label"
              :value="getSelectedIndex(heightOptions, filters.heightRange)"
              @change="handleSelect('heightRange', heightOptions, $event)"
          >
            <view class="profile-filter-value">
              {{ getSelectedLabel(heightOptions, filters.heightRange) }}
            </view>
          </picker>
        </view>

        <view class="profile-filter-item interactive-view">
          <view class="profile-filter-label">{{ educationLabel }}</view>
          <picker
              mode="selector"
              :range="educationOptions"
              range-key="label"
              :value="getSelectedIndex(educationOptions, filters.education)"
              @change="handleSelect('education', educationOptions, $event)"
          >
            <view class="profile-filter-value">
              {{ getSelectedLabel(educationOptions, filters.education) }}
            </view>
          </picker>
        </view>

        <view class="profile-filter-item interactive-view">
          <view class="profile-filter-label">{{ intentLabel }}</view>
          <picker
              mode="selector"
              :range="intentOptions"
              range-key="label"
              :value="getSelectedIndex(intentOptions, filters.intentCode)"
              @change="handleSelect('intentCode', intentOptions, $event)"
          >
            <view class="profile-filter-value">
              {{ getSelectedLabel(intentOptions, filters.intentCode) }}
            </view>
          </picker>
        </view>

        <view
            class="profile-filter-item profile-filter-toggle interactive-view"
            @click="$emit('toggle-advanced')"
        >
          <view class="profile-filter-label">{{ moreFiltersLabel }}</view>
          <view class="profile-filter-value profile-filter-value-strong">
            {{ advancedOpen ? collapseText : expandText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DirectoryOption, ProfilesDirectoryFilters } from './profiles.types'

defineProps<{
  title: string
  resetText: string
  ageLabel: string
  cityLabel: string
  heightLabel: string
  educationLabel: string
  intentLabel: string
  moreFiltersLabel: string
  expandText: string
  collapseText: string
  filters: ProfilesDirectoryFilters
  ageOptions: DirectoryOption[]
  cityOptions: DirectoryOption[]
  heightOptions: DirectoryOption[]
  educationOptions: DirectoryOption[]
  intentOptions: DirectoryOption[]
  advancedOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:filters', value: Partial<ProfilesDirectoryFilters>): void
  (e: 'toggle-advanced'): void
  (e: 'reset'): void
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
.profile-filter-panel {
  border: 1px solid #ddd6c8;
  background: #faf7f1;
  padding: 18px 20px 20px;
}

.profile-filter-item {
  display: flex;
  min-height: 82rpx;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ddd0c0;
  background: linear-gradient(180deg, #f6f1e8 0%, #f3ede3 100%);
  padding: 18rpx 22rpx;
  transition: all 0.22s ease;
}

.profile-filter-item:hover {
  border-color: #cbb48a;
  background: #fbf7ef;
  box-shadow: 0 10px 18px rgba(24, 38, 58, 0.03);
}

.profile-filter-label {
  font-size: 12px;
  letter-spacing: 1.8px;
  color: #8b7e6d;
}

.profile-filter-value {
  margin-top: 10rpx;
  font-size: 15px;
  line-height: 1.5;
  color: #1f2d3d;
}

.profile-filter-toggle {
  cursor: pointer;
}

.profile-filter-value-strong {
  color: #7b6241;
}
</style>