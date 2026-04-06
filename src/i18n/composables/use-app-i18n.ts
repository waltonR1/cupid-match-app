import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'

export function useAppI18n() {
  return useLocaleBridge()
}
