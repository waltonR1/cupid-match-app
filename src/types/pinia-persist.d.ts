import 'pinia'
import type { StateTree } from 'pinia'
import type { PersistedStateOptions } from '@/stores/plugins/persisted-state'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: boolean | PersistedStateOptions<S>
  }
}
