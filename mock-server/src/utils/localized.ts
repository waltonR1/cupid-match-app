import type { DisplayNameCapable, LocalizedText } from '../types/common.js'

export function localized(zh: string, fr: string, en: string): LocalizedText {
  return { zh, fr, en }
}

export function resolveDisplayName(record: DisplayNameCapable): string {
  return record.displayName ?? record.nickName ?? record.realName ?? record.id ?? 'Unknown'
}

export function withDisplayName<T extends DisplayNameCapable>(record: T): T & { displayName: string } {
  return {
    ...record,
    displayName: resolveDisplayName(record),
  }
}
