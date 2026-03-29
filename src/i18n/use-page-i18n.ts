import { useLocaleBridge } from '@/i18n/use-locale-bridge'

export function usePageI18n(namespace: string) {
  const { t: globalT, locale, locales, setLocale } = useLocaleBridge()

  function t(key: string) {
    return globalT(`${namespace}.${key}`)
  }

  return {
    t,
    locale,
    locales,
    setLocale,
  }
}
