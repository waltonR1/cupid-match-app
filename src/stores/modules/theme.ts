import { ref } from 'vue'
import { defineStore } from 'pinia'

type AppTheme = 'light' | 'dark'

const DEFAULT_THEME: AppTheme = 'dark'

function isAppTheme(value: unknown): value is AppTheme {
  return value === 'light' || value === 'dark'
}

function restoreThemeState(state: unknown): void {
  if (!state || typeof state !== 'object') {
    return
  }

  const theme = (state as { theme?: unknown }).theme

  ;(state as { theme?: AppTheme }).theme = isAppTheme(theme) ? theme : DEFAULT_THEME
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(DEFAULT_THEME)

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme,
  }
}, {
  persist: {
    paths: ['theme'],
    beforeHydrate: restoreThemeState,
  },
})
