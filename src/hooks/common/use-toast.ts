import {ref} from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export function useToast() {
  const visible = ref(false)
  const message = ref('')
  const type = ref<ToastType>('info')

  function show(msg: string, toastType: ToastType = 'info') {
    message.value = msg
    type.value = toastType
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { visible, message, type, show, hide }
}
