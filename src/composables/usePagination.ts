import type { MaybeRef } from '@vueuse/core'
import { ref, unref } from 'vue'

export function usePagination(
  page?: MaybeRef<number | undefined>,
  size?: MaybeRef<number | undefined>
) {
  const pageNumber = ref<number>(unref(page) ?? 1)
  const pageSize = ref<number>(unref(size) ?? 10)

  return {
    pageNumber,
    pageSize
  }
}
