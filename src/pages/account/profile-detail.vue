<template>
  <AccountShell active-page="profiles">
    <view v-if="pageData" class="grid gap-6">
      <view
          class="inline-flex w-fit cursor-pointer items-center gap-2 text-[14px] text-semantic-text-secondary transition-colors hover:text-semantic-text-primary"
          @click="goBack"
      >
        <text>&lt;</text>
        <text>{{ t('profiles.detail.back') }}</text>
      </view>

      <AccountSubPageHeader
          :description="t('profiles.detail.subtitle')"
          :label="t('profiles.title')"
          :title="pageData.profileTitle || resolveProfileTitleText()"
      />

      <view class="flex flex-wrap items-center gap-2 text-[13px] text-semantic-text-secondary">
        <view>{{ t('profiles.detail.editLocale') }}</view>
        <view
            v-for="item in locales"
            :key="item"
            :class="editLocale === item
            ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
            : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary hover:text-semantic-text-primary'"
            class="cursor-pointer border px-3 py-1.5 transition-colors"
            @click="requestEditLocaleChange(item)"
        >
          {{ optionLabel('languages', item.toUpperCase()) }}
        </view>
      </view>
      <view
          v-if="localeSwitchPromptOpen"
          class="flex flex-wrap items-center justify-between gap-4 border border-semantic-border-emphasis bg-semantic-surface-card px-4 py-3 text-[14px] shadow-panel"
      >
        <view class="text-semantic-text-secondary">
          {{ t('profiles.detail.switchLocaleNotice') }}
        </view>
        <view class="flex flex-wrap gap-2">
          <view
              class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-semantic-text-primary"
              @click="saveAndSwitchLocale"
          >
            {{ t('profiles.actions.saveBeforeSwitch') }}
          </view>
          <view
              class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-semantic-text-secondary"
              @click="discardAndSwitchLocale"
          >
            {{ t('profiles.actions.discardBeforeSwitch') }}
          </view>
          <view
              class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-semantic-text-secondary"
              @click="cancelLocaleSwitch"
          >
            {{ t('common.cancel') }}
          </view>
        </view>
      </view>

      <view class="flex flex-wrap gap-3">
        <view
            class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-3 text-[14px]"
            @click="toggleEditing"
        >
          {{ editing ? t('profiles.actions.cancelEdit') : t('profiles.actions.edit') }}
        </view>
        <view
            v-if="editing"
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px]"
            @click="saveDraft"
        >
          {{ t('profiles.actions.save') }}
        </view>
        <view
            v-if="canSubmitProfileReview"
            class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-3 text-[14px]"
            @click="submitProfileReview"
        >
          {{ profileReviewSubmitting ? t('profiles.actions.submittingReview') : profileSubmitReviewLabel }}
        </view>
        <view
            v-if="!createMode"
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px]"
            @click="archiveProfile"
        >
          {{ t('profiles.actions.archive') }}
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="flex flex-wrap items-center gap-4">
          <image :src="pageData.avatarUrl" class="h-16 w-16 rounded-full object-cover"/>
          <view>
            <view class="text-[20px] font-semibold">{{ pageData.profileTitle || resolveProfileTitleText() }}</view>
            <view class="mt-1 text-[14px] text-semantic-text-secondary">{{ profileCityLabel }}</view>
          </view>
          <view class="flex flex-wrap gap-2">
            <view
                v-for="badge in pageData.ownershipBadgeKeys"
                :key="badge"
                class="border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1.5 text-[12px] text-semantic-text-secondary"
            >
              {{ t(badge) }}
            </view>
          </view>
        </view>

        <view class="mt-6 grid border-t border-semantic-border-soft pt-5 sm:grid-cols-3">
          <view
              v-for="entry in pageData.statusItems"
              :key="entry.labelKey"
              class="border-b border-semantic-border-soft py-4 sm:border-r sm:px-4 xl:border-b-0 first:sm:pl-0 last:sm:border-r-0"
          >
            <view class="text-[12px] text-semantic-text-card-label">{{ t(entry.labelKey) }}</view>
            <view class="mt-2 text-[14px] text-semantic-text-primary">{{ formatStatusValue(entry) }}</view>
          </view>
        </view>

        <view class="mt-6 border-t border-semantic-border-soft pt-5">
          <view class="text-[16px] font-semibold">{{ t('profiles.detail.sections.ownership') }}</view>
          <view class="mt-4 grid gap-4 md:grid-cols-3">
            <view>
              <view class="text-[13px] text-semantic-text-secondary">
                {{ t('profiles.detail.fields.relationshipToProfile') }}
              </view>
              <view v-if="editing" class="mt-2 max-w-[280px]">
                <view class="relative">
                  <view
                      class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                      @click="toggleSelect('relationshipToProfile')"
                  >
                    <text>{{ selectedRelationshipLabel }}</text>
                    <text class="text-semantic-text-muted">{{
                        openSelectKey === 'relationshipToProfile' ? '^' : 'v'
                      }}
                    </text>
                  </view>
                  <view
                      v-if="openSelectKey === 'relationshipToProfile'"
                      class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                  >
                    <view
                        v-for="option in relationshipOptions"
                        :key="option.value"
                        :class="option.value === draftOwnership.relationshipToProfile
                        ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                        : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                        class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                        @click="selectRelationship(option.value)"
                    >
                      {{ option.label }}
                    </view>
                  </view>
                </view>
              </view>
              <view v-else class="mt-2 text-[15px]">{{ selectedRelationshipLabel }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <view class="grid gap-6">
          <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.detail.sections.photos') }}</view>
            <view class="mt-5 grid gap-4">
              <view
                  v-for="photo in visiblePhotoDrafts"
                  :key="photo.clientId"
                  class="grid gap-4 border border-semantic-border-soft bg-semantic-surface-panel p-4 md:grid-cols-[120px_minmax(0,1fr)]"
              >
                <image
                    :src="photo.url"
                    class="h-[120px] w-full cursor-pointer object-cover transition-opacity hover:opacity-90"
                    mode="aspectFill"
                    @click="openPhotoPreview(photo.url)"
                />
                <view class="grid gap-3">
                  <view v-if="!editing" class="text-[14px] text-semantic-text-secondary">
                    {{ photoStatusLabel(photo.status) }}
                  </view>
                  <view v-else class="grid gap-3">
                    <view class="text-[13px] text-semantic-text-muted">
                      {{ photoStatusLabel(photo.status) }}
                    </view>
                    <view
                        class="w-fit cursor-pointer border border-semantic-border-soft bg-semantic-surface-card px-3 py-2 text-[13px]"
                        @click="chooseDraftPhoto(photo.clientId)">
                      {{ t('profiles.detail.choosePhoto') }}
                    </view>
                  </view>
                  <view v-if="editing" class="flex flex-wrap gap-2">
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]"
                          @click="markPrimaryPhoto(photo.clientId)">
                      {{ photo.isPrimary ? t('profiles.detail.photoPrimary') : t('profiles.detail.setPrimary') }}
                    </view>
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]"
                          @click="removePhotoDraft(photo.clientId)">
                      {{ t('profiles.actions.remove') }}
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="editing" class="grid gap-3 border border-semantic-border-soft bg-semantic-surface-panel p-4">
                <view
                    class="w-fit cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2.5 text-[14px]"
                    @click="addDraftPhoto">
                  {{ t('profiles.detail.addPhoto') }}
                </view>
              </view>
            </view>
          </view>

          <view
              v-for="section in pageData.profileSections"
              :key="section.key"
              class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
          >
            <view class="flex items-center justify-between gap-4">
              <view class="text-[16px] font-semibold">{{ t(section.titleKey) }}</view>
            </view>
            <view class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                  v-for="entry in section.items"
                  :key="entry.labelKey"
                  class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start"
              >
                <view class="text-[13px] text-semantic-text-secondary">
                  {{ t(entry.labelKey) }}
                  <text v-if="entry.required" class="text-semantic-state-danger">*</text>
                </view>
                <view v-if="!editing || !entry.fieldKey" class="min-h-[24px] text-[15px]">
                  <view v-if="entry.editor === 'list'" class="flex flex-wrap gap-2">
                    <view
                        v-for="item in displayListItems(entry)"
                        :key="item"
                        class="border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
                    >
                      {{ item }}
                    </view>
                  </view>
                  <template v-else>{{ formatDisplayValue(entry) }}</template>
                </view>
                <view v-else-if="entry.editor === 'boolean'" class="flex flex-wrap gap-2">
                  <view
                      v-for="option in booleanOptions"
                      :key="String(option.value)"
                      :class="readBooleanDraft(entry.fieldKey) === option.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
                      : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'"
                      class="cursor-pointer border px-3 py-2 text-[14px]"
                      @click="writeBooleanDraft(entry.fieldKey, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <view v-else-if="entry.editor === 'enum'" class="max-w-[360px]">
                  <view class="relative">
                    <view
                        class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                        @click="toggleSelect(entry.fieldKey)"
                    >
                      <text>{{ selectedEnumLabel(entry.fieldKey) }}</text>
                      <text class="text-semantic-text-muted">{{ openSelectKey === entry.fieldKey ? '^' : 'v' }}</text>
                    </view>
                    <view
                        v-if="openSelectKey === entry.fieldKey"
                        class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                    >
                      <view
                          v-for="option in (entry.fieldKey === 'city' ? cityOptions : enumOptions(entry.fieldKey))"
                          :key="option.value"
                          :class="option.value === readDraft(entry.fieldKey)
                          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                          class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                          @click="selectEnum(entry.fieldKey, option.value)"
                      >
                        {{ option.label }}
                      </view>
                    </view>
                  <input
                      v-if="enumRequiresExtraText(entry.fieldKey)"
                      :placeholder="t('profiles.detail.tagPlaceholder')"
                      :value="readDraft(extraTextDraftKey(entry.fieldKey))"
                      class="mt-3 box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                      @input="writeDraft(extraTextDraftKey(entry.fieldKey), getInputValue($event))"
                  />
                  </view>
                </view>
                <view v-else-if="entry.editor === 'list' && entry.fieldKey === 'relationshipValues'"
                      class="flex flex-wrap gap-2">
                  <view
                      v-for="option in relationshipValueOptions"
                      :key="option.value"
                      :class="selectionChipClass(readListDraft(entry.fieldKey).includes(option.value))"
                      class="cursor-pointer rounded-full border px-3 py-1.5 text-[13px] transition-colors"
                      @click="toggleListDraft(entry.fieldKey, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <view v-else-if="entry.editor === 'list' && entry.fieldKey === 'languages'" class="grid gap-3">
                  <view class="flex flex-wrap gap-2">
                    <view
                        v-for="item in readListDraft(entry.fieldKey)"
                        :key="item"
                        class="flex items-center gap-2 border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
                    >
                      <text>{{ displayTagDraft(entry.fieldKey, item) }}</text>
                      <text class="cursor-pointer text-semantic-text-muted"
                            @click="removeListDraft(entry.fieldKey, item)">x
                      </text>
                    </view>
                  </view>
                  <view class="flex flex-wrap gap-2">
                    <view class="relative min-w-[220px] flex-1">
                      <view
                          class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                          @click="toggleListSelect(entry.fieldKey)"
                      >
                        <text :class="listSelectedOption[entry.fieldKey] ? 'text-semantic-text-primary' : 'text-semantic-text-muted'">
                          {{ selectedListOptionLabel(entry.fieldKey) || t('profiles.detail.selectPlaceholder') }}
                        </text>
                        <text class="text-semantic-text-muted">{{ listOpenSelectKey === entry.fieldKey ? '^' : 'v' }}</text>
                      </view>
                      <view
                          v-if="listOpenSelectKey === entry.fieldKey"
                          class="absolute left-0 top-[calc(100%+6px)] z-30 max-h-[280px] w-full overflow-y-auto border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                      >
                        <view
                            v-for="option in availableListOptions(entry.fieldKey)"
                            :key="option.value"
                            :class="listSelectedOption[entry.fieldKey] === option.value
                            ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                            : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                            class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                            @click="selectListOption(entry.fieldKey, option.value)"
                        >
                          {{ option.label }}
                        </view>
                        <view
                            v-if="availableListOptions(entry.fieldKey).length === 0"
                            class="px-3 py-2 text-[14px] text-semantic-text-muted"
                        >
                          {{ t('profiles.detail.noMoreOptions') }}
                        </view>
                      </view>
                    </view>
                    <view
                        class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[14px]"
                        @click="addSelectedListOption(entry.fieldKey)"
                    >
                      {{ t('profiles.actions.add') }}
                    </view>
                  </view>
                </view>
                <view v-else-if="entry.editor === 'list'" class="grid gap-3">
                  <view class="flex flex-wrap gap-2">
                    <view
                        v-for="item in readListDraft(entry.fieldKey)"
                        :key="item"
                        class="flex items-center gap-2 border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
                    >
                      <text>{{ displayTagDraft(entry.fieldKey, item) }}</text>
                      <text class="cursor-pointer text-semantic-text-muted"
                            @click="removeListDraft(entry.fieldKey, item)">x
                      </text>
                    </view>
                  </view>
                  <view class="flex flex-wrap gap-2">
                    <input
                        :placeholder="t('profiles.detail.tagPlaceholder')"
                        :value="readTagInput(entry.fieldKey)"
                        class="box-border min-h-[40px] min-w-[220px] flex-1 border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
                        @input="writeTagInput(entry.fieldKey, getInputValue($event))"
                    />
                    <view
                        class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[14px]"
                        @click="addListDraft(entry.fieldKey)"
                    >
                      {{ t('profiles.actions.add') }}
                    </view>
                  </view>
                </view>
                <view v-else-if="entry.editor === 'ageRange'" class="grid gap-3 sm:grid-cols-2">
                  <input
                      :value="readDraft('preferredAgeMin')"
                      class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                      type="number"
                      @input="writeDraft('preferredAgeMin', getInputValue($event))"
                  />
                  <input
                      :value="readDraft('preferredAgeMax')"
                      class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                      type="number"
                      @input="writeDraft('preferredAgeMax', getInputValue($event))"
                  />
                </view>
                <view v-else-if="entry.fieldKey === 'birthYear'" class="max-w-[280px]">
                  <view class="relative">
                    <view
                        class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                        @click="toggleSelect('birthYear')"
                    >
                      <text>{{ numericPickerLabel('birthYear') }}</text>
                      <text class="text-semantic-text-muted">{{ openSelectKey === 'birthYear' ? '^' : 'v' }}</text>
                    </view>
                    <view
                        v-if="openSelectKey === 'birthYear'"
                        class="absolute left-0 top-[calc(100%+6px)] z-30 max-h-[280px] w-full overflow-auto border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                    >
                      <view
                          v-for="option in birthYearOptions"
                          :key="option.value"
                          :class="option.value === readDraft('birthYear')
                          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                          class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                          @click="selectNumeric('birthYear', option.value)"
                      >
                        {{ option.label }}
                      </view>
                    </view>
                  </view>
                </view>
                <view v-else-if="entry.fieldKey === 'height'" class="flex max-w-[280px] items-center border border-semantic-border-default bg-semantic-surface-soft transition-colors hover:border-semantic-border-interactive-hover">
                  <input
                      type="number"
                      :value="readDraft('height')"
                      class="box-border min-h-[44px] w-full bg-transparent px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                      min="120"
                      max="230"
                      placeholder="170"
                      @input="writeDraft('height', getInputValue($event))"
                  />
                  <text class="shrink-0 pr-3 text-[14px] text-semantic-text-muted">cm</text>
                </view>
                <input
                    v-else
                    :type="entry.editor === 'number' ? 'number' : 'text'"
                    :value="readDraft(entry.fieldKey)"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                    @input="writeDraft(entry.fieldKey, getInputValue($event))"
                />
              </view>
            </view>
          </view>

          <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t(pageData.contactSection.titleKey) }}</view>
            <view class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                  v-for="entry in pageData.contactSection.items"
                  :key="entry.labelKey"
                  class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start"
              >
                <view class="text-[13px] text-semantic-text-secondary">{{ t(entry.labelKey) }}</view>
                <view v-if="!editing || !entry.fieldKey" class="min-h-[24px] text-[15px]">
                  {{ formatDisplayValue(entry) }}
                </view>
                <view v-else-if="entry.editor === 'enum'" class="max-w-[360px]">
                  <view class="relative">
                    <view
                        class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                        @click="toggleSelect(entry.fieldKey)"
                    >
                      <text>{{ selectedEnumLabel(entry.fieldKey) }}</text>
                      <text class="text-semantic-text-muted">{{ openSelectKey === entry.fieldKey ? '^' : 'v' }}</text>
                    </view>
                    <view
                        v-if="openSelectKey === entry.fieldKey"
                        class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                    >
                      <view
                          v-for="option in (entry.fieldKey === 'city' ? cityOptions : enumOptions(entry.fieldKey))"
                          :key="option.value"
                          :class="option.value === readDraft(entry.fieldKey)
                          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                          class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                          @click="selectEnum(entry.fieldKey, option.value)"
                      >
                        {{ option.label }}
                      </view>
                    </view>
                  </view>
                </view>
                <input
                    v-else
                    :value="readDraft(entry.fieldKey)"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                    @input="writeDraft(entry.fieldKey, getInputValue($event))"
                />
              </view>
            </view>
          </view>
        </view>

        <aside class="grid h-fit gap-6 xl:sticky xl:top-6">
          <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.verificationPanel.title') }}</view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.verificationPanel.description') }}
            </view>
            <view class="mt-4 grid gap-3">
              <view
                  v-for="item in pageData.verificationItems"
                  :key="item.key"
                  class="flex items-center justify-between gap-3 border-t border-semantic-border-soft pt-3"
              >
                <view class="text-[14px] text-semantic-text-secondary">{{ t(item.labelKey) }}</view>
                <view
                    :class="verificationToneClass(item.tone)"
                    class="cursor-pointer border px-2.5 py-1 text-[12px] transition-colors hover:bg-semantic-surface-soft"
                    @click="openVerificationPanel(item.key)"
                >
                  {{ verificationStatusLabel(item) }}
                </view>
              </view>
            </view>
          </view>

          <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.privacyPreferences.title') }}</view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.privacyPreferences.description') }}
            </view>
            <view class="mt-4 grid gap-3">
              <view
                  v-for="item in pageData.privacyPreferenceItems"
                  :key="item.key"
                  class="flex items-center justify-between gap-3 border-t border-semantic-border-soft pt-3"
              >
                <view>
                  <view class="text-[14px]">{{ t(item.labelKey) }}</view>
                  <view class="mt-1 text-[12px] text-semantic-text-secondary">{{ t(item.statusKey) }}</view>
                </view>
                <view
                    :class="item.hidden
                    ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
                    : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'"
                    class="cursor-pointer border px-3 py-1.5 text-[12px]"
                    @click="togglePrivacyPreference(item.key, !item.hidden)"
                >
                  {{ item.hidden ? t('profiles.privacyPreferences.hidden') : t('profiles.privacyPreferences.default') }}
                </view>
              </view>
            </view>
          </view>
        </aside>
      </view>
    </view>

    <view
        v-if="photoPreviewUrl"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
        @click="closePhotoPreview"
    >
      <image
          :src="photoPreviewUrl"
          class="h-full w-full"
          mode="aspectFit"
          @load="handlePhotoPreviewLoad"
          @click.stop="handlePhotoPreviewImageClick"
      />
      <view
          aria-label="Close"
          class="fixed right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center text-[28px] leading-none text-white/30 transition-opacity duration-200 hover:text-white/60"
          @click.stop="closePhotoPreview"
      >
        ×
      </view>
    </view>

    <view
        v-if="verificationPanelKey"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8"
        @click="closeVerificationPanel"
    >
      <view
          class="max-h-full w-full max-w-[520px] overflow-y-auto border border-semantic-border-default bg-semantic-surface-card p-5 shadow-panel"
          @click.stop
      >
        <view class="flex items-start justify-between gap-4">
          <view>
            <view class="text-[16px] font-semibold">{{ selectedVerificationTitle }}</view>
            <view class="mt-1 text-[12px] text-semantic-text-muted">
              {{ t('profiles.verificationPanel.title') }}
            </view>
          </view>
          <view
                aria-label="Close"
                class="flex h-8 w-8 cursor-pointer items-center justify-center border border-semantic-border-soft text-[18px] leading-none text-semantic-text-secondary transition-colors hover:bg-semantic-surface-soft hover:text-semantic-text-primary"
                @click="closeVerificationPanel">
            ×
          </view>
        </view>

        <view class="mt-4 grid gap-3">
          <template v-if="verificationPanelKey === 'review'">
            <view class="text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.verificationPanel.platformHint') }}
            </view>
          </template>
          <template v-else-if="selectedVerificationStatus === 'verified'">
            <view class="text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.verificationPanel.verifiedHint') }}
            </view>
            <view v-if="verificationPanelKey === 'identity'" class="grid gap-2 text-[13px]">
              <view>{{ t('profiles.verification.legalName') }}: {{ maskedIdentityName || '-' }}</view>
              <view>{{ t('profiles.verification.dateOfBirth') }}: {{ maskedIdentityDate || '-' }}</view>
            </view>
          </template>
          <template v-else-if="selectedVerificationStatus === 'pending'">
            <view class="text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.verificationPanel.pendingHint') }}
            </view>
            <view v-if="selectedVerificationMaterial" class="grid gap-2 text-[13px]">
              <view>{{ t('profiles.verificationPanel.materialName') }}: {{ selectedVerificationMaterial.materialName || selectedVerificationMaterial.legalName || '-' }}</view>
              <view>{{ t('profiles.verificationPanel.submittedAt') }}: {{ selectedVerificationMaterial.submittedAt ? formatLocalizedDateTime(locale, selectedVerificationMaterial.submittedAt) : '-' }}</view>
            </view>
          </template>
          <template v-else>
            <view class="text-[13px] leading-6 text-semantic-text-secondary">
              {{ selectedVerificationStatus === 'rejected' ? t('profiles.verificationPanel.rejectedHint') : t('profiles.verificationPanel.submitHint') }}
            </view>
            <view v-if="verificationPanelKey === 'identity'">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verification.legalName') }}</view>
              <input
                  v-model="verificationDraft.legalName"
                  class="mt-2 box-border min-h-[42px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
              />
            </view>
            <view v-if="verificationPanelKey === 'identity'">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verification.dateOfBirth') }}</view>
              <input
                  v-model="verificationDraft.dateOfBirth"
                  class="mt-2 box-border min-h-[42px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
                  placeholder="YYYY-MM-DD"
              />
            </view>
            <view v-if="verificationPanelKey !== 'identity'">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verificationPanel.materialName') }}</view>
              <input
                  v-model="verificationDraft.materialName"
                  class="mt-2 box-border min-h-[42px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
              />
            </view>
            <view>
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verificationPanel.materialUrl') }}</view>
              <view class="mt-2 flex flex-wrap items-center gap-2">
                <view class="min-h-[42px] flex-1 border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary">
                  {{ verificationDraft.materialFilename || t('profiles.verificationPanel.noMaterialSelected') }}
                </view>
                <view
                    class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-card px-3 py-2 text-[14px] text-semantic-text-primary"
                    @click="chooseAndUploadVerificationMaterial"
                >
                  {{ verificationUploading ? t('profiles.verificationPanel.uploadingMaterial') : t('profiles.verificationPanel.uploadMaterial') }}
                </view>
              </view>
              <view class="mt-1 text-[12px] leading-5 text-semantic-text-muted">{{ t('profiles.verificationPanel.allowedMaterialTypes') }}</view>
            </view>
            <view>
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verificationPanel.reviewNote') }}</view>
              <textarea
                  v-model="verificationDraft.reviewNote"
                  class="mt-2 box-border min-h-[92px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
              />
            </view>
            <view
                class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-center text-[14px] text-semantic-text-primary"
                @click="submitVerification"
            >
              {{ verificationSubmitting ? t('profiles.verificationPanel.submitting') : t('profiles.verificationPanel.submit') }}
            </view>
          </template>
        </view>
      </view>
    </view>

    <ConfirmDialog
        :cancel-label="t('common.cancel')"
        :confirm-label="confirmActionLabel"
        :description="confirmDescription"
        :destructive="true"
        :loading="confirmLoading"
        :open="confirmOpen"
        :title="confirmTitle"
        @cancel="confirmOpen = false"
        @confirm="handleConfirm"
    />
    <Toast
        :message="toast.message.value"
        :type="toast.type.value"
        :visible="toast.visible.value"
        @close="toast.hide"
    />
  </AccountShell>
</template>

<script lang="ts" setup>
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {computed, ref, watch} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import Toast from '@/components/common/Toast.vue'
import {useToast} from '@/hooks/common/use-toast'
import {useAccountProfileDetail} from '@/hooks/account'
import {useOptionsStore} from '@/stores/modules/options'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {
  ALLOWED_PHOTO_EXTENSIONS,
  ALLOWED_VERIFICATION_MATERIAL_EXTENSIONS,
  MAX_PHOTO_COUNT,
  MAX_PHOTO_SIZE,
  MAX_VERIFICATION_MATERIAL_SIZE,
} from '@/config/upload'
import {openMyProfilePage} from '@/utils/navigation'
import {formatLocalizedDateTime} from '@/utils/locale-format'
import type {
  AccountProfileDetailPageData,
  AccountProfilePhotoDraft,
  AccountProfileVerificationMaterialType,
  AccountProfileVerificationPanelKey,
} from '@/types/account/profile-detail'

useRequireAuth()
const toast = useToast()
const {t, locale, locales} = usePageI18n('accountCenter')
const optionsStore = useOptionsStore()
const profileId = ref('')
const createMode = ref(false)
const editLocale = computed(() => locale.value)
const {
  payload,
  pageData,
  saveDetail,
  savePrivacyPreferences,
  submitReview,
  submitVerificationMaterial,
  refresh,
  archive,
  uploadProfileImage,
  uploadVerificationMaterial,
} = useAccountProfileDetail(() => profileId.value, () => editLocale.value, () => createMode.value)
const editing = ref(false)
const draft = ref<Record<string, string>>({})
const photoDrafts = ref<AccountProfilePhotoDraft[]>([])
const photoPreviewUrl = ref('')
const photoPreviewSize = ref({width: 0, height: 0})
const draftOwnership = ref({
  relationshipToProfile: '' as 'self' | 'father' | 'mother' | 'relative' | '',
})
const openSelectKey = ref<string | null>(null)
const listOpenSelectKey = ref<string | null>(null)
const listSelectedOption = ref<Record<string, string>>({})
const tagInputs = ref<Record<string, string>>({})
const pendingEditLocale = ref<typeof editLocale.value | null>(null)
const localeSwitchPromptOpen = ref(false)
const profileReviewSubmitting = ref(false)
const verificationPanelKey = ref<AccountProfileVerificationPanelKey | null>(null)
const verificationSubmitting = ref(false)
const verificationUploading = ref(false)
const verificationDraft = ref({
  legalName: '',
  dateOfBirth: '',
  materialName: '',
  materialUrl: '',
  materialLocalPath: '',
  materialFilename: '',
  reviewNote: '',
})
const allowedVerificationMaterialPattern = /\.(pdf|jpe?g|png|webp)(?:[?#].*)?$/i

// confirm dialog
const confirmOpen = ref(false)
const confirmTitle = ref('')
const confirmDescription = ref('')
const confirmActionLabel = ref('')
const confirmLoading = ref(false)
let confirmAction: (() => Promise<void>) | null = null

function openConfirm(title: string, description: string, label: string, action: () => Promise<void>) {
  confirmTitle.value = title
  confirmDescription.value = description
  confirmActionLabel.value = label
  confirmAction = action
  confirmOpen.value = true
}

async function handleConfirm() {
  if (!confirmAction) return
  confirmLoading.value = true
  try {
    await confirmAction()
  } finally {
    confirmLoading.value = false;
    confirmOpen.value = false
  }
}

const visiblePhotoDrafts = computed(() => photoDrafts.value
    .filter((photo) => !photo.delete)
    .sort((a, b) => a.sortOrder - b.sortOrder))
const canSubmitProfileReview = computed(() => {
  if (createMode.value || !profileId.value || !payload.value) return false
  return payload.value.profileStatus === 'draft' || payload.value.profileStatus === 'hidden'
})
const profileSubmitReviewLabel = computed(() => {
  return payload.value?.profileStatus === 'hidden'
      ? t('profiles.actions.republish')
      : t('profiles.actions.publishNow')
})
const profileCityLabel = computed(() => {
  const value = pageData.value?.city || ''
  if (!value) return '-'
  return enumOptions('city').find((option) => option.value === value)?.label || value
})
const maskedIdentityName = computed(() => maskName(payload.value?.verification.legalName))
const maskedIdentityDate = computed(() => maskDate(payload.value?.verification.dateOfBirth))
const selectedVerificationTitle = computed(() => {
  const item = pageData.value?.verificationItems.find((entry) => entry.key === verificationPanelKey.value)
  return item ? t(item.labelKey) : ''
})
const selectedVerificationStatus = computed(() => {
  if (!payload.value || !verificationPanelKey.value) return 'unverified'
  const verification = payload.value.verification
  if (verificationPanelKey.value === 'identity') return verification.identityStatus
  if (verificationPanelKey.value === 'education') return verification.educationStatus
  if (verificationPanelKey.value === 'income') return verification.incomeStatus
  if (verificationPanelKey.value === 'marital') return verification.maritalStatus
  return 'unverified'
})
const selectedVerificationMaterial = computed(() => {
  if (!payload.value || !verificationPanelKey.value) return null
  return payload.value.verificationMaterials?.find((item) => item.materialType === verificationPanelKey.value) ?? null
})

const hasSelfProfile = ref(false)

onLoad((query) => {
  createMode.value = query?.mode === 'create'
  if (createMode.value) {
    editing.value = true
    if (query && typeof query.rel === 'string' && ['self', 'father', 'mother', 'relative'].includes(query.rel)) {
      draftOwnership.value.relationshipToProfile = query.rel as typeof draftOwnership.value.relationshipToProfile
    }
    hasSelfProfile.value = query?.hasSelf === '1'
    return
  }
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

watch(payload, (value) => {
  if (!value) return
  hydrateDraft(value)
}, {immediate: true})

watch(editLocale, (value) => {
  void optionsStore.ensureOptions(value)
}, {immediate: true})

watch(() => draft.value.country, (newCountry, oldCountry) => {
  if (newCountry === oldCountry) return
  if (!newCountry) return
  const city = draft.value.city as string
  if (city && !city.startsWith(newCountry + ':')) {
    draft.value.city = ''
  }
})

function hydrateDraft(value: NonNullable<typeof payload.value>) {
  draft.value = {
    profileName: value.profileName,
    gender: value.gender,
    birthYear: String(value.birthYear),
    height: String(value.height),
    city: value.cityCode || '',
    country: value.countryCode || '',
    nationality: value.nationalityCode || '',
    languages: value.languages.map((v) => v.toUpperCase()).join(' / '),
    degreeLevel: value.degreeLevel,
    education: value.educationCode || '',
    industry: value.industryCode || '',
    careerDirection: value.careerDirection ?? '',
    maritalStatus: value.maritalStatus,
    hasChildren: String(value.hasChildren),
    childrenPlan: value.childrenPlan,
    acceptsLongDistance: String(value.acceptsLongDistance),
    datingIntentionCode: value.datingIntentionCode,
    relationshipGoal: value.relationshipGoalCode || '',
    residencePlan: value.residencePlanCode || '',
    relocation: value.relocation,
    relationshipValues: value.relationshipValues.join(' / '),
    preferredAgeMin: String(value.preferredAgeMin),
    preferredAgeMax: String(value.preferredAgeMax),
    preferredLocation: value.preferredLocation,
    preferredEducation: value.preferredEducationCode || '',
    familyLife: value.familyLifeCode || '',
    dealBreakers: value.dealBreakers.join(' / '),
    smoking: value.smoking,
    drinking: value.drinking,
    exercise: value.exerciseCode || '',
    activityLevel: value.activityLevel,
    weekendStyle: value.weekendStyle,
    pets: value.pets,
    personalityTraits: value.personalityTraits.join(' / '),
    interests: value.interests.join(' / '),
    communicationStyle: value.communicationStyle,
    summary: value.summary,
    tags: value.tags.join(' / '),
    familyVisible: String(value.familyVisible),
    legalName: value.verification.legalName ?? '',
    dateOfBirth: value.verification.dateOfBirth ?? '',
    phone: value.contact.phone ?? '',
    email: value.contact.email ?? '',
    wechat: value.contact.wechat ?? '',
    preferredChannel: value.contact.preferredChannel ?? 'email',
    contactVisibility: value.contact.visibility,
    educationExtraText: value.optionExtraTexts?.education ?? '',
    industryExtraText: value.optionExtraTexts?.industry ?? '',
    relationshipGoalExtraText: value.optionExtraTexts?.relationshipGoal ?? '',
    residencePlanExtraText: value.optionExtraTexts?.residencePlan ?? '',
    preferredEducationExtraText: value.optionExtraTexts?.preferredEducation ?? '',
    familyLifeExtraText: value.optionExtraTexts?.familyLife ?? '',
    exerciseExtraText: value.optionExtraTexts?.exercise ?? '',
  }
  photoDrafts.value = value.photos.map((photo, index) => ({
    id: photo.id,
    clientId: photo.id,
    url: photo.url,
    isPrimary: photo.isPrimary,
    sortOrder: photo.sortOrder || index + 1,
    status: photo.status,
  }))
  draftOwnership.value = {
    relationshipToProfile: value.ownership.relationshipToProfile,
  }
  listSelectedOption.value = {}
  tagInputs.value = {}
}

function resolveProfileTitleText() {
  if (!pageData.value) return ''
  if (pageData.value.profileTitleRelation) {
    return `${optionLabel('relationshipToProfile', pageData.value.profileTitleRelation)} ${t(pageData.value.profileTitleKey!)}`
  }
  return t(pageData.value.profileTitleKey!)
}

function formatDisplayValue(entry: AccountProfileDetailPageData['profileSections'][number]['items'][number]) {
  const v = entry.rawValue
  if (v === null || v === undefined) return '-'
  if (entry.editor === 'enum') {
    const value = String(v || '')
    if (value === 'other' && entry.extraText) return entry.extraText
    const label = enumOptions(entry.fieldKey).find((option) => option.value === value)?.label
    return label || value || '-'
  }
  if (entry.editor === 'boolean') return v ? t('common.yes') : t('common.no')
  if (entry.editor === 'list') return displayListItems(entry).join(' / ') || '-'
  if (entry.editor === 'number') return Number(v) > 0 ? entry.fieldKey === 'height' ? `${v} cm` : String(v) : '-'
  return String(v) || '-'
}

function displayListItems(entry: AccountProfileDetailPageData['profileSections'][number]['items'][number]) {
  const values = Array.isArray(entry.rawValue) ? entry.rawValue : []
  if (values.length === 0) return ['-']
  if (entry.fieldKey === 'languages') {
    return values.map((value) => optionLabel('languages', value.toUpperCase()))
  }
  if (entry.fieldKey === 'relationshipValues') {
    return values.map((value) => optionLabel('relationshipValues', value))
  }
  return values.map(String)
}

function formatStatusValue(entry: AccountProfileDetailPageData['statusItems'][number]) {
  const v = entry.rawValue
  if (typeof v !== 'string') return String(v)
  if (entry.labelKey === 'profiles.detail.fields.profileStatus') return optionLabel('profileStatus', v)
  // ISO date from lastActiveAt
  return formatLocalizedDateTime(locale.value, v)
}

function verificationStatusLabel(item: AccountProfileDetailPageData['verificationItems'][number]) {
  const group = item.key === 'review' ? 'reviewStatus' : 'verificationStatus'
  return optionLabel(group, item.valueRaw)
}

function goBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({delta: 1})
    return
  }
  openMyProfilePage()
}

function readDraft(fieldKey: string) {
  return draft.value[fieldKey] ?? ''
}

function writeDraft(fieldKey: string, value: string) {
  draft.value[fieldKey] = value
}

function toggleEditing() {
  if (editing.value) {
    if (payload.value) hydrateDraft(payload.value)
    editing.value = false
    return
  }
  editing.value = true
}

function requestEditLocaleChange(nextLocale: typeof editLocale.value) {
  if (nextLocale === editLocale.value) return
  if (!editing.value) {
    locale.value = nextLocale
    return
  }
  pendingEditLocale.value = nextLocale
  localeSwitchPromptOpen.value = true
}

function cancelLocaleSwitch() {
  pendingEditLocale.value = null
  localeSwitchPromptOpen.value = false
}

function saveAndSwitchLocale() {
  if (!pendingEditLocale.value) return
  void saveDraft().then((saved) => {
    if (!saved || !pendingEditLocale.value) return
    locale.value = pendingEditLocale.value
    cancelLocaleSwitch()
  })
}

function discardAndSwitchLocale() {
  if (!pendingEditLocale.value) return
  if (payload.value) hydrateDraft(payload.value)
  editing.value = false
  locale.value = pendingEditLocale.value
  cancelLocaleSwitch()
}

function readBooleanDraft(fieldKey: string) {
  return draft.value[fieldKey] === 'true'
}

function writeBooleanDraft(fieldKey: string, value: boolean) {
  draft.value[fieldKey] = String(value)
}

function getInputValue(event: Event) {
  return (event as unknown as { detail: { value: string } }).detail.value
}

function validateProfileDraft() {
  const requiredFields = [
    'profileName',
    'gender',
    'birthYear',
    'height',
    'city',
    'country',
    'degreeLevel',
    'education',
    'industry',
    'maritalStatus',
    'datingIntentionCode',
    'relationshipGoal',
    'summary',
  ]
  if (requiredFields.some((key) => !readDraft(key).trim() || readDraft(key) === '0')) {
    return t('profiles.validation.required')
  }
  const minAge = toNumber(readDraft('preferredAgeMin'))
  const maxAge = toNumber(readDraft('preferredAgeMax'))
  if ((minAge > 0 || maxAge > 0) && (!minAge || !maxAge || minAge > maxAge)) {
    return t('profiles.validation.ageRange')
  }
  return ''
}

async function saveDraft() {
  if (!payload.value) return false
  const validationMessage = validateProfileDraft()
  if (validationMessage) {
    toast.show(validationMessage, 'error')
    return false
  }
  const profilePayload = buildProfilePayload()
  const contactPayload = {
    phone: draft.value.phone ?? '',
    email: draft.value.email ?? '',
    wechat: draft.value.wechat ?? '',
    preferredChannel: draft.value.preferredChannel as NonNullable<typeof payload.value.contact.preferredChannel>,
    visibility: draft.value.contactVisibility as typeof payload.value.contact.visibility,
  }
  let detail: Awaited<ReturnType<typeof saveDetail>>
  try {
    detail = await saveDetail({
      profileId: createMode.value ? undefined : profileId.value,
      profileType: draftOwnership.value.relationshipToProfile === 'self' ? 'self' : 'family',
      ownership: draftOwnership.value,
      profile: profilePayload,
      contact: contactPayload,
      photos: await buildPhotoPayload(),
    })
  } catch {
    toast.show(t('profiles.detail.uploadFailed'), 'error')
    return false
  }
  if (detail && createMode.value) {
    createMode.value = false
    profileId.value = detail.profileId
    uni.redirectTo({url: `/pages/account/profile-detail?id=${encodeURIComponent(detail.profileId)}`})
  }
  editing.value = false
  return true
}

function buildProfilePayload() {
  if (!payload.value) throw new Error('Missing account profile payload')
  return {
    profileName: draft.value.profileName,
    gender: draft.value.gender as NonNullable<typeof payload.value>['gender'],
    birthYear: toNumber(draft.value.birthYear),
    height: toNumber(draft.value.height),
    cityCode: draft.value.city,
    countryCode: draft.value.country,
    nationalityCode: draft.value.nationality,
    languages: toList(draft.value.languages),
    degreeLevel: draft.value.degreeLevel as NonNullable<typeof payload.value>['degreeLevel'],
    educationCode: draft.value.education,
    industryCode: draft.value.industry,
    careerDirection: draft.value.careerDirection,
    maritalStatus: draft.value.maritalStatus as NonNullable<typeof payload.value>['maritalStatus'],
    hasChildren: toBoolean(draft.value.hasChildren),
    childrenPlan: draft.value.childrenPlan as NonNullable<typeof payload.value>['childrenPlan'],
    acceptsLongDistance: toBoolean(draft.value.acceptsLongDistance),
    datingIntentionCode: draft.value.datingIntentionCode as NonNullable<typeof payload.value>['datingIntentionCode'],
    relationshipGoalCode: draft.value.relationshipGoal,
    residencePlanCode: draft.value.residencePlan,
    relocation: draft.value.relocation as NonNullable<typeof payload.value>['relocation'],
    relationshipValues: toList(draft.value.relationshipValues) as NonNullable<typeof payload.value>['relationshipValues'],
    preferredAgeMin: toNumber(draft.value.preferredAgeMin),
    preferredAgeMax: toNumber(draft.value.preferredAgeMax),
    preferredLocation: draft.value.preferredLocation as NonNullable<typeof payload.value>['preferredLocation'],
    preferredEducationCode: draft.value.preferredEducation,
    familyLifeCode: draft.value.familyLife,
    dealBreakers: toList(draft.value.dealBreakers),
    smoking: draft.value.smoking as NonNullable<typeof payload.value>['smoking'],
    drinking: draft.value.drinking as NonNullable<typeof payload.value>['drinking'],
    exerciseCode: draft.value.exercise,
    activityLevel: draft.value.activityLevel as NonNullable<typeof payload.value>['activityLevel'],
    weekendStyle: draft.value.weekendStyle as NonNullable<typeof payload.value>['weekendStyle'],
    pets: draft.value.pets as NonNullable<typeof payload.value>['pets'],
    personalityTraits: toList(draft.value.personalityTraits),
    interests: toList(draft.value.interests),
    communicationStyle: draft.value.communicationStyle as NonNullable<typeof payload.value>['communicationStyle'],
    summary: draft.value.summary,
    tags: toList(draft.value.tags),
    familyVisible: toBoolean(draft.value.familyVisible),
    optionExtraTexts: buildOptionExtraTexts(),
  }
}

const relationshipOptions = computed(() => {
  const options = enumOptions('relationshipToProfile') as Array<{ label: string; value: typeof draftOwnership.value.relationshipToProfile }>
  return hasSelfProfile.value ? options.filter((item) => item.value !== 'self') : options
})

const selectedRelationshipLabel = computed(() => {
  return relationshipOptions.value.find((item) => item.value === draftOwnership.value.relationshipToProfile)?.label ?? '-'
})

function selectionChipClass(active: boolean) {
  return active
      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
      : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary hover:text-semantic-text-primary'
}

function toggleSelect(key: string) {
  openSelectKey.value = openSelectKey.value === key ? null : key
}

function selectRelationship(value: typeof draftOwnership.value.relationshipToProfile) {
  draftOwnership.value.relationshipToProfile = value
  openSelectKey.value = null
}

const languageOptions = computed(() => enumOptions('languages'))

const relationshipValueOptions = computed(() => optionsStore.optionsFor(editLocale.value, profileOptionGroup('relationshipValues')))

const currentYear = new Date().getFullYear()

const birthYearOptions = computed(() => {
  const options: Array<{ label: string; value: string }> = []
  for (let y = currentYear - 18; y >= currentYear - 70; y--) {
    options.push({ label: String(y), value: String(y) })
  }
  return options
})

function numericPickerLabel(fieldKey: string) {
  const value = readDraft(fieldKey)
  if (value === '' || value === undefined || Number(value) === 0) return '-'
  return String(value)
}

function selectNumeric(fieldKey: string, value: string) {
  writeDraft(fieldKey, value)
  openSelectKey.value = null
}

function listFieldOptions(fieldKey: string) {
  if (fieldKey === 'languages') return languageOptions.value
  return []
}

function toggleListSelect(fieldKey: string) {
  listOpenSelectKey.value = listOpenSelectKey.value === fieldKey ? null : fieldKey
  if (listOpenSelectKey.value) {
    openSelectKey.value = null
  }
}

function selectListOption(fieldKey: string, value: string) {
  listSelectedOption.value = { ...listSelectedOption.value, [fieldKey]: value }
  listOpenSelectKey.value = null
}

function selectedListOptionLabel(fieldKey: string) {
  const selected = listSelectedOption.value[fieldKey]
  if (!selected) return ''
  return listFieldOptions(fieldKey).find((o) => o.value === selected)?.label ?? selected
}

function addSelectedListOption(fieldKey: string) {
  const selected = (listSelectedOption.value[fieldKey] ?? '').trim()
  if (!selected) return
  const values = readListDraft(fieldKey)
  const normalized = fieldKey === 'languages' ? selected.toUpperCase() : selected
  if (!values.some((v) => v.toUpperCase() === normalized.toUpperCase())) {
    writeDraft(fieldKey, [...values, normalized].join(' / '))
  }
  const next = { ...listSelectedOption.value }
  delete next[fieldKey]
  listSelectedOption.value = next
}

function availableListOptions(fieldKey: string) {
  const selected = new Set(readListDraft(fieldKey).map((v) => v.toUpperCase()))
  return listFieldOptions(fieldKey).filter((o) => !selected.has(o.value.toUpperCase()))
}

function readListDraft(fieldKey: string) {
  return toList(readDraft(fieldKey))
}

function toggleListDraft(fieldKey: string, value: string) {
  const values = readListDraft(fieldKey)
  const nextValues = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value]
  writeDraft(fieldKey, nextValues.join(' / '))
}

function readTagInput(fieldKey: string) {
  return tagInputs.value[fieldKey] ?? ''
}

function writeTagInput(fieldKey: string, value: string) {
  tagInputs.value[fieldKey] = value
}

function addListDraft(fieldKey: string) {
  const value = readTagInput(fieldKey).trim()
  if (!value) return
  const values = readListDraft(fieldKey)
  if (!values.includes(value)) {
    writeDraft(fieldKey, [...values, value].join(' / '))
  }
  writeTagInput(fieldKey, '')
}

function removeListDraft(fieldKey: string, value: string) {
  writeDraft(fieldKey, readListDraft(fieldKey).filter((item) => item !== value).join(' / '))
}

function displayTagDraft(fieldKey: string, value: string) {
  if (fieldKey === 'relationshipValues') return optionLabel('relationshipValues', value)
  if (fieldKey === 'languages') return optionLabel('languages', value.toUpperCase())
  return value
}

function toList(value: string | undefined) {
  return (value ?? '').split(/[\/,，、]/).map((item) => item.trim()).filter(Boolean)
}

function toNumber(value: string | undefined) {
  return Number(value ?? 0)
}

function toBoolean(value: string | undefined) {
  return value === 'true'
}

const booleanOptions = computed(() => [
  {label: t('common.yes'), value: true},
  {label: t('common.no'), value: false},
])

function profileOptionGroup(fieldKey: string) {
  return 'profile.' + fieldKey
}

function enumOptions(fieldKey: string): Array<{ label: string; value: string; requiresExtraText?: boolean }> {
  const options = optionsStore.optionsFor(editLocale.value, profileOptionGroup(fieldKey))
  return [{ label: t('common.selectPlaceholder'), value: '' }, ...options]
}

const cityOptions = computed(() => {
  const options = optionsStore.optionsFor(editLocale.value, profileOptionGroup('city'))
  const countryCode = readDraft('country')
  const filtered = countryCode
    ? options.filter((option) => option.value.startsWith(countryCode + ':'))
    : options
  return [{ label: t('common.selectPlaceholder'), value: '' }, ...filtered]
})

function optionLabel(fieldKey: string, value: string) {
  return enumOptions(fieldKey).find((option) => option.value === value)?.label ?? value
}

function enumRequiresExtraText(fieldKey: string) {
  return enumOptions(fieldKey).some((option) => option.value === readDraft(fieldKey) && option.requiresExtraText)
}

function extraTextDraftKey(fieldKey: string) {
  return `${fieldKey}ExtraText`
}

function buildOptionExtraTexts() {
  return {
    education: draft.value.educationExtraText ?? '',
    industry: draft.value.industryExtraText ?? '',
    relationshipGoal: draft.value.relationshipGoalExtraText ?? '',
    residencePlan: draft.value.residencePlanExtraText ?? '',
    preferredEducation: draft.value.preferredEducationExtraText ?? '',
    familyLife: draft.value.familyLifeExtraText ?? '',
    exercise: draft.value.exerciseExtraText ?? '',
  }
}

function selectedEnumLabel(fieldKey: string) {
  return enumOptions(fieldKey).find((option) => option.value === readDraft(fieldKey))?.label ?? '-'
}

function selectEnum(fieldKey: string, value: string) {
  writeDraft(fieldKey, value)
  openSelectKey.value = null
}

function togglePrivacyPreference(key: string, hidden: boolean) {
  void savePrivacyPreferences({
    [key]: hidden,
  } as Partial<NonNullable<typeof payload.value>['privacyPreferences']>)
}

function openVerificationPanel(key: AccountProfileVerificationPanelKey) {
  verificationPanelKey.value = key
  const material = selectedVerificationMaterial.value
  verificationDraft.value = {
    legalName: payload.value?.verification.legalName ?? material?.legalName ?? '',
    dateOfBirth: payload.value?.verification.dateOfBirth ?? material?.dateOfBirth ?? '',
    materialName: material?.materialName ?? '',
    materialUrl: material?.materialUrl ?? '',
    materialLocalPath: '',
    materialFilename: material?.materialName ?? materialFilenameFromUrl(material?.materialUrl ?? ''),
    reviewNote: material?.reviewNote ?? '',
  }
}

function closeVerificationPanel() {
  if (verificationSubmitting.value) return
  verificationPanelKey.value = null
}

async function submitVerification() {
  if (!profileId.value || !verificationPanelKey.value) return
  if (verificationPanelKey.value === 'review') return
  if (verificationSubmitting.value) return
  if (!verificationDraft.value.materialUrl && !verificationDraft.value.materialLocalPath) {
    toast.show(t('profiles.verificationPanel.invalidMaterialType'), 'error')
    return
  }
  verificationSubmitting.value = true
  let stage: 'upload' | 'submit' = 'submit'
  try {
    let materialUrl = verificationDraft.value.materialUrl
    if (verificationDraft.value.materialLocalPath) {
      stage = 'upload'
      verificationUploading.value = true
      const result = await uploadVerificationMaterial(verificationDraft.value.materialLocalPath)
      if (!result) {
        throw new Error('upload_failed')
      }
      materialUrl = result.materialUrl
      verificationDraft.value.materialUrl = result.materialUrl
      verificationDraft.value.materialLocalPath = ''
      verificationDraft.value.materialFilename = result.originalFilename || verificationDraft.value.materialFilename || materialFilenameFromUrl(result.materialUrl)
      if (!verificationDraft.value.materialName) {
        verificationDraft.value.materialName = verificationDraft.value.materialFilename
      }
      verificationUploading.value = false
      stage = 'submit'
    }
    if (!isAllowedVerificationMaterial(materialUrl)) {
      toast.show(t('profiles.verificationPanel.invalidMaterialType'), 'error')
      return
    }
    await submitVerificationMaterial({
      materialType: verificationPanelKey.value as AccountProfileVerificationMaterialType,
      legalName: verificationDraft.value.legalName,
      dateOfBirth: verificationDraft.value.dateOfBirth,
      materialName: verificationDraft.value.materialName,
      materialUrl,
      reviewNote: verificationDraft.value.reviewNote,
    })
    toast.show(t('profiles.verificationPanel.submitSuccess'), 'success')
    await refresh()
    closeVerificationPanel()
  } catch {
    toast.show(stage === 'upload' ? t('profiles.verificationPanel.uploadFailed') : t('profiles.verificationPanel.submitFailed'), 'error')
  } finally {
    verificationUploading.value = false
    verificationSubmitting.value = false
  }
}

function isAllowedVerificationMaterial(value: string) {
  return allowedVerificationMaterialPattern.test(value.trim())
}

async function chooseAndUploadVerificationMaterial() {
  if (!profileId.value || verificationUploading.value) return
  try {
    const file = await chooseVerificationMaterialFile()
    if (!isAllowedSelectedVerificationMaterial(file)) {
      toast.show(t('profiles.verificationPanel.invalidMaterialType'), 'error')
      return
    }
    if (file.size && file.size > MAX_VERIFICATION_MATERIAL_SIZE) {
      toast.show(t('profiles.detail.photoTooLarge'), 'error')
      return
    }
    verificationDraft.value.materialUrl = ''
    verificationDraft.value.materialLocalPath = file.path
    verificationDraft.value.materialFilename = file.name || materialFilenameFromUrl(file.path)
    if (!verificationDraft.value.materialName) {
      verificationDraft.value.materialName = verificationDraft.value.materialFilename
    }
  } catch {
    toast.show(t('profiles.verificationPanel.uploadFailed'), 'error')
  }
}

function isAllowedSelectedVerificationMaterial(file: SelectedLocalFile) {
  const ext = resolveSelectedFileExtension(file)
  return !ext || ALLOWED_VERIFICATION_MATERIAL_EXTENSIONS.includes(ext)
}

interface SelectedLocalFile {
  path: string
  name: string
  type?: string
  size?: number
}

function chooseVerificationMaterialFile(): Promise<SelectedLocalFile> {
  return new Promise((resolve, reject) => {
    const chooseFile = (uni as any).chooseFile
    if (typeof chooseFile === 'function') {
      chooseFile({
        count: 1,
        extension: ALLOWED_VERIFICATION_MATERIAL_EXTENSIONS,
        success(res: any) {
          const file = res.tempFiles?.[0]
          const path = file?.path || res.tempFilePaths?.[0]
          if (path) {
            resolve({
              path,
              name: file?.name || materialFilenameFromUrl(path),
              type: file?.type,
              size: file?.size,
            })
            return
          }
          reject(new Error('empty_file'))
        },
        fail: reject,
      })
      return
    }
    uni.chooseImage({
      count: 1,
      success(res) {
        const path = res.tempFilePaths[0]
        const files = Array.isArray(res.tempFiles) ? res.tempFiles : [res.tempFiles]
        const file = files[0] as { name?: string; path?: string; type?: string; size?: number } | undefined
        resolve({
          path,
          name: file?.name || materialFilenameFromUrl(path),
          type: file?.type,
          size: file?.size,
        })
      },
      fail: reject,
    })
  })
}

function resolveSelectedFileExtension(file: { name?: string; path?: string; type?: string }) {
  const fromName = extensionOf(file.name)
  if (fromName) return fromName
  const fromPath = extensionOf(file.path)
  if (fromPath) return fromPath
  if (file.type === 'application/pdf') return '.pdf'
  if (file.type === 'image/jpeg' || file.type === 'image/jpg') return '.jpg'
  if (file.type === 'image/png') return '.png'
  if (file.type === 'image/webp') return '.webp'
  return ''
}

function materialFilenameFromUrl(value: string) {
  if (!value) return ''
  return decodeURIComponent(value.split('/').pop() || value)
}

async function submitProfileReview() {
  if (!canSubmitProfileReview.value || profileReviewSubmitting.value) return
  if (editing.value) {
    toast.show(t('profiles.actions.saveBeforeSubmitReview'), 'error')
    return
  }
  profileReviewSubmitting.value = true
  try {
    const detail = await submitReview()
    if (detail) {
      toast.show(t('profiles.actions.submitReviewSuccess'), 'success')
    }
  } catch {
    toast.show(t('profiles.actions.submitReviewFailed'), 'error')
  } finally {
    profileReviewSubmitting.value = false
  }
}

function archiveProfile() {
  openConfirm(
      t('profiles.archiveDialog.title'),
      t('profiles.archiveDialog.description'),
      t('profiles.actions.archive'),
      async () => {
        const archived = await archive()
        if (archived) openMyProfilePage()
      },
  )
}

function maskName(value?: string) {
  if (!value) return ''
  if (value.length <= 1) return '*'
  return `${value.slice(0, 1)}${'*'.repeat(Math.max(value.length - 1, 1))}`
}

function maskDate(value?: string) {
  if (!value) return ''
  return value.replace(/\d(?=\d{2})/g, '*')
}

async function addDraftPhoto() {
  if (visiblePhotoDrafts.value.length >= MAX_PHOTO_COUNT) {
    toast.show(t('profiles.detail.photoMaxCount'), 'info')
    return
  }
  const localPath = await chooseLocalImage()
  if (!localPath) return
  const nextOrder = visiblePhotoDrafts.value.length + 1
  photoDrafts.value.push({
    clientId: `new-${Date.now()}-${nextOrder}`,
    url: localPath,
    localPath,
    isPrimary: visiblePhotoDrafts.value.length === 0,
    sortOrder: nextOrder,
    status: 'review',
  })
}

function openPhotoPreview(url?: string) {
  if (!url) return
  photoPreviewSize.value = {width: 0, height: 0}
  photoPreviewUrl.value = url
}

function closePhotoPreview() {
  photoPreviewUrl.value = ''
  photoPreviewSize.value = {width: 0, height: 0}
}

function handlePhotoPreviewLoad(event: Event) {
  const detail = (event as unknown as { detail?: { width?: number; height?: number } }).detail
  photoPreviewSize.value = {
    width: Number(detail?.width) || 0,
    height: Number(detail?.height) || 0,
  }
}

function handlePhotoPreviewImageClick(event: Event) {
  if (!isPointInsidePreviewImage(event)) {
    closePhotoPreview()
  }
}

function isPointInsidePreviewImage(event: Event) {
  const {width, height} = photoPreviewSize.value
  if (!width || !height) return true
  const point = eventPoint(event)
  if (!point) return true

  const viewportWidth = uni.getSystemInfoSync().windowWidth
  const viewportHeight = uni.getSystemInfoSync().windowHeight
  const scale = Math.min(viewportWidth / width, viewportHeight / height)
  const renderedWidth = width * scale
  const renderedHeight = height * scale
  const left = (viewportWidth - renderedWidth) / 2
  const top = (viewportHeight - renderedHeight) / 2

  return point.x >= left
      && point.x <= left + renderedWidth
      && point.y >= top
      && point.y <= top + renderedHeight
}

function eventPoint(event: Event) {
  const anyEvent = event as unknown as {
    clientX?: number
    clientY?: number
    detail?: { x?: number; y?: number }
    touches?: Array<{ clientX?: number; clientY?: number }>
    changedTouches?: Array<{ clientX?: number; clientY?: number }>
  }
  const touch = anyEvent.touches?.[0] || anyEvent.changedTouches?.[0]
  const x = anyEvent.clientX ?? anyEvent.detail?.x ?? touch?.clientX
  const y = anyEvent.clientY ?? anyEvent.detail?.y ?? touch?.clientY
  return typeof x === 'number' && typeof y === 'number' ? {x, y} : null
}

async function chooseDraftPhoto(clientId: string) {
  const localPath = await chooseLocalImage()
  if (!localPath) return
  writePhotoDraft(clientId, localPath, localPath)
}

function chooseLocalImage() {
  return new Promise<string | null>((resolve) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        const [path] = result.tempFilePaths
        if (!path) { resolve(null); return }

        const files = Array.isArray(result.tempFiles) ? result.tempFiles : [result.tempFiles]
        const file = files[0] as { name?: string; path?: string; type?: string; size?: number } | undefined
        const ext = resolveSelectedPhotoExtension(file, path)
        if (ext && !ALLOWED_PHOTO_EXTENSIONS.includes(ext)) {
          toast.show(t('profiles.detail.photoUnsupportedFormat'), 'error')
          resolve(null)
          return
        }

        const size = file?.size
        if (size && size > MAX_PHOTO_SIZE) {
          toast.show(t('profiles.detail.photoTooLarge'), 'error')
          resolve(null)
          return
        }

        resolve(path)
      },
      fail: () => resolve(null),
    })
  })
}

function resolveSelectedPhotoExtension(file: { name?: string; path?: string; type?: string } | undefined, path: string) {
  const fromName = extensionOf(file?.name)
  if (fromName) return fromName
  const fromPath = extensionOf(file?.path || path)
  if (fromPath) return fromPath
  if (file?.type === 'image/jpeg' || file?.type === 'image/jpg') return '.jpg'
  if (file?.type === 'image/png') return '.png'
  if (file?.type === 'image/webp') return '.webp'
  return ''
}

function extensionOf(value?: string) {
  if (!value) return ''
  const clean = value.split(/[?#]/)[0]
  const slash = Math.max(clean.lastIndexOf('/'), clean.lastIndexOf('\\'))
  const dot = clean.lastIndexOf('.')
  return dot > slash ? clean.slice(dot).toLowerCase() : ''
}

function markPrimaryPhoto(clientId: string) {
  photoDrafts.value = photoDrafts.value.map((photo) => ({
    ...photo,
    isPrimary: !photo.delete && photo.clientId === clientId,
  }))
}

function writePhotoDraft(clientId: string, value: string, localPath?: string) {
  photoDrafts.value = photoDrafts.value.map((photo) => photo.clientId === clientId
      ? {...photo, url: value, localPath, status: localPath ? 'review' : photo.status}
      : photo)
}

function removePhotoDraft(clientId: string) {
  const target = photoDrafts.value.find((photo) => photo.clientId === clientId)
  if (!target) return
  if (target.id) {
    photoDrafts.value = photoDrafts.value.map((photo) => photo.clientId === clientId ? {...photo, delete: true} : photo)
  } else {
    photoDrafts.value = photoDrafts.value.filter((photo) => photo.clientId !== clientId)
  }
  ensurePhotoPrimary()
}

function ensurePhotoPrimary() {
  const visiblePhotos = visiblePhotoDrafts.value
  if (visiblePhotos.length === 0 || visiblePhotos.some((photo) => photo.isPrimary)) return
  const primaryClientId = visiblePhotos[0].clientId
  photoDrafts.value = photoDrafts.value.map((photo) => ({
    ...photo,
    isPrimary: !photo.delete && photo.clientId === primaryClientId,
  }))
}

async function buildPhotoPayload() {
  ensurePhotoPrimary()
  const photos = await Promise.all(photoDrafts.value.map(async (photo, index) => {
    const url = photo.localPath && !photo.delete
        ? await uploadProfileImage(photo.localPath)
        : photo.url

    return {
      id: photo.id,
      url,
      isPrimary: photo.isPrimary,
      sortOrder: index + 1,
      delete: photo.delete,
    }
  }))

  return photos
}

function photoStatusLabel(status: NonNullable<typeof payload.value>['photos'][number]['status']) {
  return optionLabel('photoStatus', status)
}

function verificationToneClass(tone: string) {
  if (tone === 'complete') return 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
  if (tone === 'pending') return 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'
  if (tone === 'rejected') return 'border-semantic-state-danger text-semantic-state-danger'
  return 'border-semantic-border-soft text-semantic-text-muted'
}
</script>
