<template>
  <div v-if="isSuccess">
    <div
      v-for="ticketType in data?.data"
      :key="ticketType.id"
      class="flex w-full items-end justify-between border-t py-2"
    >
      <div>
        {{ ticketType.name }}
      </div>
      <div class="flex items-end gap-4">
        <p class="font-semibold">{{ ticketType.price }}đ</p>
        <Button size="small" @click="() => buyTicket(ticketType)">Buy now</Button>
      </div>
    </div>
    <div v-if="!data?.data.length">No ticket types</div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { query } from '@/lib/axios'
import { GetShowTicketTypes } from '@/services/ticketTypes'
import { useQuery } from '@tanstack/vue-query'
import useGlobalStore from '@/stores/useGlobalStore'
import type { BaseEvent, BaseTicketType } from '@/types/items'
import { useRouter } from 'vue-router'
import type { GetEventByIdResponse } from '@/services/events'

const props = defineProps<{
  showId: string
  event: GetEventByIdResponse
}>()

const router = useRouter()
const globalStore = useGlobalStore()

const { data, isSuccess, refetch } = useShowTicketTypes(props.showId)

function useShowTicketTypes(showId: string) {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['ticket-types', { eventId: showId }],
    queryFn: () => query(GetShowTicketTypes(showId, 1, 99))
  })

  return { data, isSuccess, refetch }
}

function buyTicket(ticketType: BaseTicketType) {
  globalStore.ticketType = ticketType
  globalStore.event = props.event
  router.push(`/events/${props.event.id}/buy-ticket/${ticketType.id}`)
}
</script>
