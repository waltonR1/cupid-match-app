import { ref } from 'vue'
import {
  getInboxMessages,
  getInboxThreads,
  markInboxThreadRead,
  type InboxMessageDTO,
  type InboxThreadDTO,
} from '@/api/messages'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useMessagesInbox() {
  const latest = useLatestRequest()
  const detailLatest = useLatestRequest()
  const threads = ref<InboxThreadDTO[]>([])
  const messages = ref<InboxMessageDTO[]>([])
  const activeThreadId = ref<string | null>(null)
  const hasMore = ref(false)
  const nextBefore = ref<string | undefined>(undefined)

  void loadThreads()

  async function loadThreads() {
    const data = await latest.run(() => getInboxThreads())
    if (!data) return

    threads.value = data
    if (!activeThreadId.value && data.length > 0) {
      await selectThread(data[0].id)
    }
  }

  async function selectThread(threadId: string) {
    activeThreadId.value = threadId
    messages.value = []
    hasMore.value = false
    nextBefore.value = undefined

    const data = await detailLatest.run(() => getInboxMessages(threadId))
    if (data) {
      messages.value = data.items
      hasMore.value = data.page.hasMore
      nextBefore.value = data.page.nextBefore
    }

    try {
      await markInboxThreadRead(threadId)
      threads.value = threads.value.map((thread) =>
        thread.id === threadId ? { ...thread, unread: false } : thread,
      )
    } catch {
      // Reading messages should not fail because read-state sync failed.
    }
  }

  async function loadMore() {
    if (!activeThreadId.value || !nextBefore.value) return
    const data = await detailLatest.run(() => getInboxMessages(activeThreadId.value!, nextBefore.value))
    if (data) {
      messages.value = [...messages.value, ...data.items]
      hasMore.value = data.page.hasMore
      nextBefore.value = data.page.nextBefore
    }
  }

  return {
    threads,
    messages,
    activeThreadId,
    hasMore,
    loading: latest.loading,
    error: latest.error,
    detailLoading: detailLatest.loading,
    detailError: detailLatest.error,
    refresh: loadThreads,
    selectThread,
    loadMore,
  }
}
