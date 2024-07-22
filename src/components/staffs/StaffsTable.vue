<template>
  <Dialog v-model:visible="visible" modal header="Assign staff" class="w-[40vw]">
    <div class="space-y-4">
      <div>
        <div class="flex flex-col">
          <label>Search</label>
          <InputText type="email" v-model="search" @update:modelValue="() => searchFn()" />
        </div>
        <div v-if="fetchUsersSuccess">
          <Listbox
            v-if="users?.data && search"
            v-model="selected"
            :options="users?.data"
            optionLabel="email"
            class="md:w-14rem w-full"
          >
            <template #option="slotProps">
              <div class="flex flex-col">
                <div>{{ slotProps.option.name }}</div>
                <div class="text-xs text-gray-400">{{ slotProps.option.email }}</div>
              </div>
            </template>
          </Listbox>
        </div>
      </div>

      <div class="justify-content-end flex gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="submit"></Button>
      </div>
    </div>
  </Dialog>
  <div class="pb-4">
    <div class="flex justify-between">
      <h2 class="text-xl font-semibold">Staffs</h2>
      <Button size="small" @click="visible = true">Add staff</Button>
    </div>
    <div v-if="fetchStaffsSuccess" class="space-y-4 pb-4">
      <DataTable :value="staffs?.data">
        <Column field="fullName" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <template #empty>No staffs</template>
      </DataTable>
    </div>
  </div>
  <div>
    <h2 class="text-xl font-semibold">Assign staffs to show</h2>
    <div v-if="fetchShowsSuccess" class="space-y-4 pb-4">
      <ShowPanel :eventId v-for="show in shows?.data" :key="show.id" :show />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { GetEventShows } from '@/services/shows'
import { AddStaff, GetEventStaffs } from '@/services/staffs'
import { SearchUserByEmail } from '@/services/users'
import type { BaseUser } from '@/types/items'
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import ShowPanel from './ShowPanel.vue'

const props = defineProps<{
  eventId: string
}>()

const { pageNumber, pageSize } = usePagination(1, 10)
const visible = ref(false)
const search = ref<string>()

const {
  data: users,
  isSuccess: fetchUsersSuccess,
  refetch: refetchUsers
} = useQuery({
  queryKey: ['users'],
  queryFn: () => query(SearchUserByEmail(pageNumber.value, pageSize.value, search.value)),
  enabled: !!search.value
})

const submit = async () => {
  if (!selected.value) return

  const { data } = await AddStaff(props.eventId, selected.value.id)
  if (!data.isSuccess) {
    toast.add({ detail: data.errors[0], severity: 'error', life: 3000 })
  } else {
    toast.add({ detail: 'Staff added successfully!', life: 3000 })
  }

  refetchUsers()

  visible.value = false
}

const toast = useToast()
const selected = ref<BaseUser>()
const searchFn = useDebounceFn(refetchUsers, 300)

const { data: staffs, isSuccess: fetchStaffsSuccess } = useQuery({
  queryKey: ['staffs', { eventId: props.eventId }],
  queryFn: () => query(GetEventStaffs(props.eventId, 1, 999))
})

const { data: shows, isSuccess: fetchShowsSuccess } = useQuery({
  queryKey: ['shows', { eventId: props.eventId }],
  queryFn: () => query(GetEventShows(props.eventId, 1, 999))
})
</script>
