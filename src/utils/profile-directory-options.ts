import type { LocalizedText, Profile } from '@/api/modules/profiles'
import type { ActiveDirectoryFilterChip, DirectoryOption } from '@/types/profiles/directory'

export function buildBaseAllOption(label: string): DirectoryOption {
  return {
    label,
    value: '',
  }
}

export function resolveProfileOptionLabel(options: DirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || value
}

export function buildActiveProfileFilterChip<TKey extends string>(
  key: TKey,
  label: string,
  options: DirectoryOption[],
  value: string,
): ActiveDirectoryFilterChip<TKey> | undefined {
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

export function dedupeProfileOption<T extends DirectoryOption>(item: T, index: number, items: T[]) {
  if (!item.value || !item.label) return false
  return items.findIndex(option => option.value === item.value) === index
}
