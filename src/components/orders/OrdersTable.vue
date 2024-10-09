<template>
  <DataTable
    :value="data?.data"
    lazy
    paginator
    :totalRecords="data?.count"
    :rows="size"
    tableStyle="min-width: 50rem"
    @page="page = $event.page + 1"
  >
    <Column field="email" header="Email"></Column>
    <Column field="createdAt" header="Ordered on"></Column>
    <Column field="status" header="status"></Column>
    <Column field="totalPrice" header="Amount"></Column>
    <Column field="currency" header="Currency"></Column>
    <template #empty><p>No orders found</p></template>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { query } from '@/lib/axios'
import { GetEventOrders } from '@/services/events'

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

const page = ref(1)
const size = ref(10)

const { data } = useQuery({
  queryKey: ['orders', { page, size }],
  queryFn: () => query(GetEventOrders(props.eventId, page.value, size.value))
})
</script>
