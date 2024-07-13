<template>
  <div v-if="isSuccess">
    <DataTable :value="data?.data" lazy paginator :totalRecords="data?.count">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <template #empty>No tickets found</template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useQuery } from '@tanstack/vue-query'
import { usePagination } from '@/composables/usePagination'
import type { GetEventByIdResponse } from '@/services/events'
import { query } from '@/lib/axios'
import { GetEventTicketTypes } from '@/services/ticketTypes'

const props = defineProps<{
  event: GetEventByIdResponse
}>()

const { pageNumber, pageSize } = usePagination()

const { data, refetch, isSuccess } = useQuery({
  queryKey: ['tickets', { pageNumber, pageSize }],
  queryFn: () => query(GetEventTicketTypes(props.event.id, pageNumber.value, pageSize.value))
})
</script>
