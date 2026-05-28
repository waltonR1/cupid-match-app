import { ref } from 'vue'
import { getInboxThreads, type InboxThreadDTO } from '@/api/messages'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useMessagesInbox() {
  const latest = useLatestRequest()
  const threads = ref<InboxThreadDTO[]>([])

  void load()

  async function load() {
    const data = await latest.run(() => getInboxThreads())
    if (data) threads.value = data
  }

  return { threads, loading: latest.loading, error: latest.error, refresh: load }
}
