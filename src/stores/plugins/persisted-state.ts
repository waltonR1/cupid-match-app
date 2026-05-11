import type { PiniaPluginContext, StateTree } from 'pinia'

/** Pinia 状态持久化配置 */
export interface PersistedStateOptions<S extends StateTree = StateTree> {
  /** 自定义存储 key */
  key?: string

  /** 只持久化指定字段 */
  paths?: Array<keyof S>

  /** 状态恢复前的数据预处理 */
  beforeHydrate?: (state: unknown) => Partial<S> | null | void

  /** 是否开启调试日志 */
  debug?: boolean
}

/** Store persist 选项 */
type PersistOption<S extends StateTree = StateTree> = boolean | PersistedStateOptions<S>

/** 默认存储 key 前缀 */
const STORAGE_KEY_PREFIX = 'pinia'

/** 判断是否为普通对象 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/** 标准化 persist 配置 */
function normalizeOptions<S extends StateTree>(
    storeId: string,
    persist: PersistOption<S>,
): PersistedStateOptions<S> {
  // persist: true，使用默认 key
  if (persist === true) {
    return {
      key: `${STORAGE_KEY_PREFIX}:${storeId}`,
    }
  }

  // 理论上外层已过滤 false，这里保留兜底
  if (persist === false) {
    return {
      key: `${STORAGE_KEY_PREFIX}:${storeId}`,
    }
  }

  return {
    // 未传 key 时使用默认 key
    key: persist.key || `${STORAGE_KEY_PREFIX}:${storeId}`,

    // 指定需要持久化的字段
    paths: persist.paths,

    // 恢复前的数据处理函数
    beforeHydrate: persist.beforeHydrate,

    // 调试开关
    debug: persist.debug,
  }
}

/** 根据 paths 选择需要持久化的 state */
function pickState<S extends StateTree>(state: S, paths?: Array<keyof S>): Partial<S> | S {
  // 未指定 paths 时持久化完整 state
  if (!paths || paths.length === 0) {
    return state
  }

  const partialState = {} as Partial<S>

  // 只复制指定字段
  for (const path of paths) {
    partialState[path] = state[path]
  }

  return partialState
}

/** 从本地缓存中读取持久化状态 */
function readPersistedState(key: string, debug = false): unknown {
  try {
    const rawValue = uni.getStorageSync(key)

    // uni-app 读取不到值时，常见返回值为空字符串
    if (rawValue === '' || rawValue === null || typeof rawValue === 'undefined') {
      return null
    }

    // 非字符串直接返回
    if (typeof rawValue !== 'string') {
      return rawValue
    }

    // 字符串按 JSON 解析
    return JSON.parse(rawValue)
  } catch (error) {
    // 仅在 debug 模式输出错误
    if (debug) {
      console.warn(`Failed to read persisted state for "${key}".`, error)
    }

    return null
  }
}

/** 将状态写入本地缓存 */
function writePersistedState(key: string, state: unknown, debug = false) {
  try {
    uni.setStorageSync(key, JSON.stringify(state))
  } catch (error) {
    // 仅在 debug 模式输出错误
    if (debug) {
      console.warn(`Failed to persist state for "${key}".`, error)
    }
  }
}

/** 创建 Pinia 状态持久化插件 */
export function createPersistedStatePlugin() {
  return ({ options, store }: PiniaPluginContext) => {
    const persist = options.persist as PersistOption<typeof store.$state> | undefined

    // 未开启 persist 时不处理
    if (!persist) {
      return
    }

    // 生成最终配置
    const resolvedOptions = normalizeOptions(store.$id, persist)

    // 读取本地缓存
    const rawPersistedState = readPersistedState(resolvedOptions.key!, resolvedOptions.debug)

    // 可选：恢复前预处理
    const hydratedState = resolvedOptions.beforeHydrate
        ? resolvedOptions.beforeHydrate(rawPersistedState)
        : rawPersistedState

    // 只有普通对象才合并到 store
    if (isPlainObject(hydratedState)) {
      store.$patch(hydratedState as typeof store.$state)
    }

    /** 持久化当前 store 状态 */
    const persistCurrentState = (state: typeof store.$state) => {
      writePersistedState(
          resolvedOptions.key!,
          pickState(state, resolvedOptions.paths),
          resolvedOptions.debug,
      )
    }

    // 初始化时立即写入一次，确保本地缓存结构完整
    persistCurrentState(store.$state)

    // 监听 store 变化并写入缓存
    store.$subscribe(
        (_mutation, state) => {
          persistCurrentState(state)
        },
        {detached: true},
    )
  }
}