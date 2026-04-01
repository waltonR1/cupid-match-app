import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createAppI18n } from '@/i18n'
import { useLocaleStore } from '@/stores/modules/locale'
import { createPersistedStatePlugin } from '@/stores/plugins/persisted-state'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  pinia.use(createPersistedStatePlugin())

  app.use(pinia)

  const localeStore = useLocaleStore(pinia)
  const i18n = createAppI18n(localeStore.locale)

  app.use(i18n)

  return {
    app,
  }
}
