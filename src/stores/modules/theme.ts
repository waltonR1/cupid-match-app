import { ref } from 'vue'
import { defineStore } from 'pinia'

type AppTheme = 'light' | 'dark'

const DEFAULT_THEME: AppTheme = 'dark'

function isAppTheme(value: unknown): value is AppTheme {
  return value === 'light' || value === 'dark'
}

function restoreThemeState(state: unknown): { theme: AppTheme } | null {
  if (!state || typeof state !== 'object') {
    return null
  }

  const theme = (state as { theme?: unknown }).theme

  return {
    theme: isAppTheme(theme) ? theme : DEFAULT_THEME,
  }
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
