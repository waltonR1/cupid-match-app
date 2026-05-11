import { ref } from 'vue'
import { defineStore } from 'pinia'

/** 应用主题类型 */
type AppTheme = 'light' | 'dark'

/** 默认主题 */
const DEFAULT_THEME: AppTheme = 'dark'

/**
 * 判断是否为合法主题
 */
function isAppTheme(value: unknown): value is AppTheme {
  return value === 'light' || value === 'dark'
}

/**
 * 持久化恢复前修正主题数据
 *
 * 防止：
 * - 非法 theme
 * - 旧版本缓存
 * - undefined / null
 */
function restoreThemeState(state: unknown): void {
  // 非对象直接忽略
  if (!state || typeof state !== 'object') {
    return
  }

  const theme = (state as { theme?: unknown }).theme

      // 非法主题时回退默认值
  ;(state as { theme?: AppTheme }).theme = isAppTheme(theme) ? theme : DEFAULT_THEME
}

/** 应用主题 Store */
export const useThemeStore = defineStore('theme', () => {
  /** 当前主题 */
  const theme = ref<AppTheme>(DEFAULT_THEME)

  /**
   * 切换主题
   *
   * dark ↔ light
   */
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme,
  }
}, {
  persist: {
    // 仅持久化 theme 字段
    paths: ['theme'],

    // 恢复前修正缓存数据
    beforeHydrate: restoreThemeState,
  },
})