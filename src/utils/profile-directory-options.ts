import type { LocalizedText, Profile } from '@/api/modules/profiles'

export interface ProfileDirectoryOption {
  label: string
  value: string
}

export interface ProfileDirectoryFilterChip<TKey extends string> {
  key: TKey
  label: string
  value: string
}

export function buildBaseAllOption(label: string): ProfileDirectoryOption {
  return {
    label,
    value: '',
  }
}

export function resolveProfileOptionLabel(options: ProfileDirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || value
}

export function buildActiveProfileFilterChip<TKey extends string>(
  key: TKey,
  label: string,
  options: ProfileDirectoryOption[],
  value: string,
): ProfileDirectoryFilterChip<TKey> | undefined {
  if (!value) return undefined

  return {
    key,
    label,
    value: resolveProfileOptionLabel(options, value),
  }
}

export function buildLocalizedProfileOptions(
  profiles: Profile[],
  localize: (text: LocalizedText) => string,
  getter: (profile: Profile) => LocalizedText,
) {
  const options = profiles
    .map(profile => ({
      label: localize(getter(profile)),
      value: getter(profile).en,
    }))
    .filter(dedupeProfileOption)

  return options.sort((left, right) => left.label.localeCompare(right.label))
}

export function dedupeProfileOption<T extends ProfileDirectoryOption>(item: T, index: number, items: T[]) {
  if (!item.value || !item.label) return false
  return items.findIndex(option => option.value === item.value) === index
}
