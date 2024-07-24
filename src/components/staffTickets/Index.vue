<template>
  <div v-if="isSuccess">
    <DataTable
      :value="data?.data"
      :rows="10"
      lazy
      paginator
      :totalRecords="data?.count"
      groupRowsBy="showId"
      rowGroupMode="subheader"
      v-model:expandedRowGroups="expandedRowGroups"
      expandableRowGroups
    >
      <template #groupheader="{ data }">
        <div class="inline w-full">
          <span class="ml-2 font-bold">{{ data.showName }}</span>
          -
          <span>{{ getHeader(data.startsAt, data.endsAt) }}</span>
          <RouterLink :to="`/show/${data.showId}/checkin`">
            <Button size="small" class="ml-10">Check in</Button>
          </RouterLink>
        </div>
      </template>

      <Column field="showId"></Column>
      <Column field="ticketTypeName" header="Name"></Column>
      <Column field="price" header="Price">
        <template #body="{ data }">
          <span> {{ data.price }}đ </span>
        </template>
      </Column>
      <Column field="amount" header="Amount"></Column>
      <template #empty>No tickets found</template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import { useQuery } from '@tanstack/vue-query'
import { usePagination } from '@/composables/usePagination'
import type { GetEventByIdResponse } from '@/services/events'
import { query } from '@/lib/axios'
import { GetEventTicketTypes } from '@/services/ticketTypes'
import { ref } from 'vue'
import { getHeader } from '@/utils/date'

const props = defineProps<{
  event: GetEventByIdResponse
}>()

const expandedRowGroups = ref()

const { pageNumber, pageSize } = usePagination()

const { data, refetch, isSuccess } = useQuery({
  queryKey: ['tickets', { pageNumber, pageSize }],
  queryFn: () => query(GetEventTicketTypes(props.event.id, pageNumber.value, pageSize.value))
})
</script>
