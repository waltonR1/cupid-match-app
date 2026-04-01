import type { PiniaPluginContext, StateTree } from 'pinia'

export interface PersistedStateOptions<S extends StateTree = StateTree> {
  key?: string
  paths?: Array<keyof S>
  beforeHydrate?: (state: unknown) => Partial<S> | null | void
  debug?: boolean
}

type PersistOption<S extends StateTree = StateTree> = boolean | PersistedStateOptions<S>

const STORAGE_KEY_PREFIX = 'pinia'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function normalizeOptions<S extends StateTree>(
  storeId: string,
  persist: PersistOption<S>,
): PersistedStateOptions<S> {
  if (persist === true) {
    return {
      key: `${STORAGE_KEY_PREFIX}:${storeId}`,
    }
  }

  if (persist === false) {
    return {
      key: `${STORAGE_KEY_PREFIX}:${storeId}`,
    }
  }

  return {
    key: persist.key || `${STORAGE_KEY_PREFIX}:${storeId}`,
    paths: persist.paths,
    beforeHydrate: persist.beforeHydrate,
    debug: persist.debug,
  }
}

function pickState<S extends StateTree>(state: S, paths?: Array<keyof S>): Partial<S> | S {
  if (!paths || paths.length === 0) {
    return state
  }

  const partialState = {} as Partial<S>

  for (const path of paths) {
    partialState[path] = state[path]
  }

  return partialState
}

function readPersistedState(key: string, debug = false): unknown {
  try {
    const rawValue = uni.getStorageSync(key)

    if (rawValue === '' || rawValue === null || typeof rawValue === 'undefined') {
      return null
    }

    if (typeof rawValue !== 'string') {
      return rawValue
    }

    return JSON.parse(rawValue)
  } catch (error) {
    if (debug) {
      console.warn(`Failed to read persisted state for "${key}".`, error)
    }

    return null
  }
}

function writePersistedState(key: string, state: unknown, debug = false) {
  try {
    uni.setStorageSync(key, JSON.stringify(state))
  } catch (error) {
    if (debug) {
      console.warn(`Failed to persist state for "${key}".`, error)
    }
  }
}

export function createPersistedStatePlugin() {
  return ({ options, store }: PiniaPluginContext) => {
    const persist = options.persist as PersistOption<typeof store.$state> | undefined

    if (!persist) {
      return
    }

    const resolvedOptions = normalizeOptions(store.$id, persist)
    const rawPersistedState = readPersistedState(resolvedOptions.key!, resolvedOptions.debug)
    const hydratedState = resolvedOptions.beforeHydrate
      ? resolvedOptions.beforeHydrate(rawPersistedState)
      : rawPersistedState

    if (isPlainObject(hydratedState)) {
      store.$patch(hydratedState as typeof store.$state)
    }

    const persistCurrentState = (state: typeof store.$state) => {
      writePersistedState(
        resolvedOptions.key!,
        pickState(state, resolvedOptions.paths),
        resolvedOptions.debug,
      )
    }

    persistCurrentState(store.$state)

    store.$subscribe(
      (_mutation, state) => {
        persistCurrentState(state)
      },
      { detached: true },
    )
  }
}
