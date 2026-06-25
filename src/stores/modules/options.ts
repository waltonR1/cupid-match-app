import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCommonOptions } from '@/api/common/options'
import type { CommonOptionDTO, CommonOptionsGroup } from '@/api/common/options.types'
import type { FormatLocale } from '@/utils/locale-format'

/**
 * 单个语言下的通用选项缓存。
 *
 * version:
 * 后端返回的选项版本号，用于下次请求时判断数据是否有变化。
 *
 * groups:
 * 按业务分组后的选项数据，例如 gender、country、language 等。
 */
interface CachedProfileOptions {
  version: string
  groups: CommonOptionsGroup
}

/**
 * 按语言区分的 options 缓存。
 *
 * 示例结构：
 * {
 *   zh: { version: 'xxx', groups: {...} },
 *   en: { version: 'xxx', groups: {...} },
 *   fr: { version: 'xxx', groups: {...} }
 * }
 */
type LocaleOptionsCache = Partial<Record<FormatLocale, CachedProfileOptions>>

export const useOptionsStore = defineStore('options', () => {
  /**
   * 本地缓存的通用选项数据。
   *
   * 注意：cache 按 locale 分开存储，避免不同语言的选项文本互相覆盖。
   */
  const cache = ref<LocaleOptionsCache>({})

  /**
   * 当前是否正在加载 options。
   *
   * 这里是全局 loading，不区分具体 locale。
   * 如果以后需要同时加载多个语言，可以改成按 locale 维护 loading 状态。
   */
  const loading = ref(false)

  /**
   * 保存最近一次加载 options 时出现的错误。
   */
  const error = ref<unknown>(null)

  /**
   * 确保指定语言的 options 已经加载。
   *
   * 逻辑：
   * 1. 先读取当前 locale 的本地缓存；
   * 2. 请求接口时带上当前缓存的 version；
   * 3. 如果后端返回 unchanged，说明缓存仍然有效，直接使用本地数据；
   * 4. 如果后端返回新数据，则更新当前 locale 对应的缓存；
   * 5. 如果请求失败，则优先返回当前已有缓存，避免页面完全无数据。
   *
   * 注意：
   * locale 由 API 通用请求层自动注入，这里不需要手动传给 getCommonOptions。
   */
  async function ensureOptions(locale: FormatLocale) {
    const current = cache.value[locale]

    loading.value = true
    error.value = null

    try {
      // 这里只传当前语言缓存的 version。
      // locale 已经由 API 通用封装统一带入请求。
      const response = await getCommonOptions(current?.version)

      // 如果后端数据发生变化，则更新当前 locale 的缓存。
      if (!response.unchanged && response.groups) {
        cache.value = {
          ...cache.value,
          [locale]: {
            version: response.version,
            groups: response.groups,
          },
        }
      }

      // 返回当前 locale 的 options。
      // 如果后端返回 unchanged，这里会直接返回之前的缓存。
      return cache.value[locale]?.groups ?? {}
    } catch (err) {
      // 保存错误信息，方便页面或调试时使用。
      error.value = err

      // 请求失败时，优先返回旧缓存，避免页面选项全部丢失。
      return current?.groups ?? {}
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取指定语言、指定分组下的 options。
   *
   * 例如：
   * optionsFor('zh', 'gender')
   * optionsFor('en', 'country')
   */
  function optionsFor(locale: FormatLocale, group: string): CommonOptionDTO[] {
    return cache.value[locale]?.groups[group] ?? []
  }

  return {
    cache,
    loading,
    error,
    ensureOptions,
    optionsFor,
  }
}, {
  persist: {
    /**
     * 只持久化 cache。
     *
     * loading 和 error 属于运行时状态，不需要保存到本地。
     */
    paths: ['cache'],
  },
})