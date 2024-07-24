import type { GetEventByIdResponse } from '@/services/events'
import type { BaseEvent, BaseTicketType } from '@/types/items'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useGlobalStore = defineStore('global', () => {
  const event = ref<GetEventByIdResponse>()
  const ticketType = ref<BaseTicketType>()

  return {
    event,
    ticketType
  }
})

export default useGlobalStore
