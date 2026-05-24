import type {ApiLocale, LocalizedText, LocalizedValue} from '../types/common.js'

const SUPPORTED_API_LOCALES: ApiLocale[] = ['zh', 'fr', 'en']

export function localized(zh: string, fr: string, en: string): LocalizedText {
    const updatedAt = new Date().toISOString()
    return {
        zh: manualValue(zh, updatedAt),
        fr: manualValue(fr, updatedAt),
        en: manualValue(en, updatedAt),
    }
}

export function resolveApiLocale(value: unknown): ApiLocale {
    if (typeof value === 'string' && SUPPORTED_API_LOCALES.includes(value as ApiLocale)) {
        return value as ApiLocale
    }

    return 'zh'
}

/** Public display resolver: ignore empty/pending values and fall back to useful text. */
export function resolveLocalizedText(locale: ApiLocale, text?: LocalizedText): string {
    const candidates = [
        text?.[locale],
        text?.zh,
        text?.en,
        ...SUPPORTED_API_LOCALES.map((item) => text?.[item]),
    ]

    return candidates.find(isReadyNonEmptyValue)?.value ?? ''
}

export function resolveLocalizedTexts(locale: ApiLocale, items: LocalizedText[]): string[] {
    return items.map((item) => resolveLocalizedText(locale, item))
}

/** Editable resolver: return the exact locale slot without fallback. */
export function resolveEditableLocalizedText(locale: ApiLocale, text?: LocalizedText): string {
    return text?.[locale]?.value ?? ''
}

export function manualValue(value: string, updatedAt = new Date().toISOString()): LocalizedValue {
    return {value, source: 'manual', provider: 'human', status: 'ready', updatedAt}
}

export function pendingMachineValue(updatedAt = new Date().toISOString()): LocalizedValue {
    return {value: '', source: 'machine', provider: null, status: 'pending', updatedAt}
}

export function translatedValue(value: string, updatedAt = new Date().toISOString()): LocalizedValue {
    return {value, source: 'machine', provider: 'translation_api', status: 'ready', updatedAt}
}

export function staleMachineValue(value = '', updatedAt = new Date().toISOString()): LocalizedValue {
    return {value, source: 'machine', provider: 'translation_api', status: 'stale', updatedAt}
}

export function failedMachineValue(value = '', updatedAt = new Date().toISOString()): LocalizedValue {
    return {value, source: 'machine', provider: null, status: 'failed', updatedAt}
}

export function isManualTranslation(text: LocalizedText, locale: ApiLocale): boolean {
    return text[locale]?.source === 'manual'
}

function isReadyNonEmptyValue(value: LocalizedValue | undefined): value is LocalizedValue {
    return value?.status === 'ready' && value.value.trim() !== ''
}
