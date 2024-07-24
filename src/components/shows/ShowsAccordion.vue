<template>
  <Accordion v-if="isSuccess" class="border-t">
    <AccordionTab
      v-for="show in data?.data"
      :key="show.id"
      :header="getHeader(show.startsAt, show.endsAt)"
    >
      <ShowTab :showId="show.id" :event />
    </AccordionTab>
  </Accordion>
</template>

<script setup lang="ts">
import { query } from '@/lib/axios'
import { GetEventShows } from '@/services/shows'
import { useQuery } from '@tanstack/vue-query'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import ShowTab from './ShowTab.vue'
import { getHeader } from '@/utils/date'
import type { BaseEvent } from '@/types/items'
import type { GetEventByIdResponse } from '@/services/events'
const props = defineProps<{
  event: GetEventByIdResponse
}>()

const { data, isSuccess, refetch } = useShows(props.event.id)

function useShows(eventId: string) {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['shows', { eventId }],
    queryFn: () => query(GetEventShows(eventId, 1, 99))
  })

  return { data, isSuccess, refetch }
}
</script>
