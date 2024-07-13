<template>
  <div class="flex justify-end">
    <Button @click="visible = true">Assign staff</Button>
  </div>
  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
    <span class="p-text-secondary mb-5 block">Update your information.</span>
    <div class="align-items-center mb-3 flex gap-3">
      <label for="username" class="w-6rem font-semibold">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="align-items-center mb-5 flex gap-3">
      <label for="email" class="w-6rem font-semibold">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="justify-content-end flex gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="visible = false"></Button>
    </div>
  </Dialog>

  <div v-if="isSuccess">
    <DataTable :value="data?.data" paginator :totalRecords="data?.count">
      <Column field="fullName" header="Full Name"></Column>
      <Column field="email" header="Email"></Column>
      <template #empty><p>No staffs has been assigned to your event</p></template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useQuery } from '@tanstack/vue-query'
import { query } from '@/lib/axios'
import Button from 'primevue/button'
import { GetEventStaffs } from '@/services/staffs'
import { usePagination } from '@/composables/usePagination'
import { ref } from 'vue'

const props = defineProps<{
  eventId: string
}>()

const { pageNumber, pageSize } = usePagination(1, 10)

const visible = ref(false)

const { data, isSuccess, refetch } = useQuery({
  queryKey: ['staffs', { eventId: props.eventId }],
  queryFn: () => query(GetEventStaffs(props.eventId, pageNumber.value, pageSize.value))
})
</script>
