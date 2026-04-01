import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/modules/locale'
import { SUPPORTED_LOCALES, type AppLocale } from '@/i18n/types'

/**
 * locale 桥接层
 *
 * 负责：
 * - 同步 Pinia store 和 vue-i18n 的 locale
 * - 提供统一的 setLocale 方法
 * - 提供响应式 locale
 */
export function useLocaleBridge() {
    const localeStore = useLocaleStore()
    const { locale, t } = useI18n({ useScope: 'global' })

    // 初始化同步（store → i18n）
    if (locale.value !== localeStore.locale) {
        locale.value = localeStore.locale
    }

    function setLocale(value: AppLocale) {
        // 防止重复设置
        if (locale.value === value) return

        localeStore.setLocale(value)
        locale.value = value
    }

    const currentLocale = computed<AppLocale>({
        get: () => locale.value as AppLocale,
        set: setLocale,
    })

    return {
        t,
        locale: currentLocale,
        locales: SUPPORTED_LOCALES,
        setLocale,
    }
}