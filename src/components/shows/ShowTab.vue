<template>
  <div v-if="isSuccess">
    <div
      v-for="ticketType in data?.data"
      :key="ticketType.id"
      class="flex w-full items-center justify-between border-t py-2"
    >
      <div>
        {{ ticketType.name }}
      </div>
      <p class="font-semibold">{{ ticketType.price }}đ</p>
    </div>
    <div v-if="!data?.data.length">No ticket types</div>
  </div>
</template>

<script setup lang="ts">
import { query } from '@/lib/axios'
import { GetShowTicketTypes } from '@/services/ticketTypes'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  showId: string
}>()

const { data, isSuccess, refetch } = useShowTicketTypes(props.showId)

function useShowTicketTypes(showId: string) {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['ticket-types', { eventId: showId }],
    queryFn: () => query(GetShowTicketTypes(showId, 1, 99))
  })

  return { data, isSuccess, refetch }
}
</script>
