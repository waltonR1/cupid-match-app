import { ref } from 'vue'
import { getInboxMessages, getInboxThreads, markInboxThreadRead, type InboxMessageDTO, type InboxMessagesPage, type InboxThreadDTO } from '@/api/messages'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useMessagesInbox() {
  const latest = useLatestRequest()
  const threads = ref<InboxThreadDTO[]>([])
  const messages = ref<InboxMessageDTO[]>([])
  const activeThreadId = ref<string | null>(null)
  const hasMore = ref(false)
  const nextBefore = ref<string | undefined>(undefined)

  void loadThreads()

  async function loadThreads() {
    const data = await latest.run(() => getInboxThreads())
    if (data) threads.value = data
  }

  async function selectThread(threadId: string) {
    activeThreadId.value = threadId
    const data = await getInboxMessages(threadId)
    if (data) {
      messages.value = data.items
      hasMore.value = data.page.hasMore
      nextBefore.value = data.page.nextBefore
    }
    // 标记已读 + 即时更新红点
    const result = await markInboxThreadRead(threadId)
    if (result) {
      threads.value = threads.value.map((t) =>
        t.id === threadId ? { ...t, unread: false } : t,
      )
    }
  }

  async function loadMore() {
    if (!activeThreadId.value || !nextBefore.value) return
    const data = await getInboxMessages(activeThreadId.value, nextBefore.value)
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
    refresh: loadThreads,
    selectThread,
    loadMore,
  }
}
