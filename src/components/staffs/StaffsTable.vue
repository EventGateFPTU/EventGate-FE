<template>
  <div v-if="fetchShowsSuccess" class="space-y-4 pb-4">
    <ShowPanel v-for="show in shows?.data" :key="show.id" :show />
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { GetEventShows } from '@/services/shows'
import { GetEventStaffs } from '@/services/staffs'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import ShowPanel from './ShowPanel.vue'

const props = defineProps<{
  eventId: string
}>()

const { pageNumber, pageSize } = usePagination(1, 10)

const { data: shows, isSuccess: fetchShowsSuccess } = useQuery({
  queryKey: ['shows', { eventId: props.eventId }],
  queryFn: () => query(GetEventShows(props.eventId, 1, 999))
})
</script>
