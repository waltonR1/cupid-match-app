import { useLocaleBridge } from '@/i18n/use-locale-bridge'

export function usePageI18n(namespace: string) {
  const { t: globalT, locale, locales, setLocale } = useLocaleBridge()

  type TranslateParams = Record<string, string | number>

  function t(key: string, params?: TranslateParams) {
    if (params) {
      return globalT(`${namespace}.${key}`, params)
    }
    return globalT(`${namespace}.${key}`)
  }

  return {
    t,
    locale,
    locales,
    setLocale,
  }
}
