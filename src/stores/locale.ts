import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readLocale, writeLocale } from '@/i18n/locale'
import type { AppLocale } from '@/i18n/types'

/**
 * Locale Store
 * 用于管理当前应用语言。
 *
 * 这个 store 只负责两件事：
 * 1. 保存当前语言状态
 * 2. 在切换语言时同步写入本地存储
 *
 * 为什么适合用 setup store？
 * - 状态很少，逻辑很轻
 * - 和 Vue3 的 ref 写法天然一致
 * - 后续如果要接 computed / watch，也更自然
 */
export const useLocaleStore = defineStore('locale', () => {
  /**
   * 当前语言。
   *
   * 初始化时直接读取本地存储中的语言设置，
   * 这样页面刷新后仍然可以保持用户上次选择的语言。
   */
  const locale = ref<AppLocale>(readLocale())

  /**
   * 设置语言。
   *
   * @param value 新的语言值
   *
   * 这里做两件事：
   * 1. 更新 Pinia 中的响应式状态
   * 2. 同步写入本地存储，保证刷新后仍可恢复
   */
  function setLocale(value: AppLocale) {
    locale.value = value
    writeLocale(value)
  }

  /**
   * setup store 必须显式 return
   * return 出去的内容，外部组件才能访问到
   */
  return {
    locale,
    setLocale,
  }
})