import type {ApiLocale, LocalizedText} from '../types/common.js'
import {emptyManualLocalizedText, isManualTranslation, manualValue, pendingMachineValue} from '../utils/localized.js'

const SUPPORTED_LOCALES: ApiLocale[] = ['zh', 'fr', 'en']

/** Merge one edited locale while preserving manually authored translations. */
export function mergeTranslatedText(current: LocalizedText | undefined, locale: ApiLocale, value: string): LocalizedText {
    if (current?.[locale]?.value === value) return current

    const now = new Date().toISOString()
    const next: LocalizedText = current
        ? {...current}
        : {
            zh: pendingMachineValue(now),
            fr: pendingMachineValue(now),
            en: pendingMachineValue(now),
        }

    next[locale] = manualValue(value, now)

    SUPPORTED_LOCALES
        .filter((targetLocale) => targetLocale !== locale)
        .forEach((targetLocale) => {
            if (isManualTranslation(next, targetLocale)) return
            next[targetLocale] = pendingMachineValue(now)
        })

    return next
}

/** Merge a user-authored multilingual label without scheduling machine translation. */
export function mergeManualLocalizedText(current: LocalizedText | undefined, locale: ApiLocale, value: string): LocalizedText {
    if (current?.[locale]?.value === value) return current

    const next = current ? {...current} : emptyManualLocalizedText()
    next[locale] = manualValue(value)
    return next
}
