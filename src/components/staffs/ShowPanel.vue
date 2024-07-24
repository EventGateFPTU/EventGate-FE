<template>
  <Dialog v-model:visible="visible" modal header="Assign staff">
    <div class="space-y-4">
      <div>
        <div v-if="fetchStaffsSuccess">
          <DataTable :value="staffs?.data">
            <Column field="fullname" header="Full name"></Column>
            <Column field="email" header="email"></Column>
            <Column header="Actions">
              <template #body="{ data }">
                <div class="flex w-full justify-center">
                  <i class="pi pi-plus hover:cursor-pointer" @click="() => submit(data.userId)"></i>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </Dialog>
  <Panel :header="getHeader(show.startsAt, show.endsAt)" toggleable>
    <template #togglericon="{ collapsed }">
      <i
        class="pi pi-angle-right transition-all duration-200"
        :class="{
          'rotate-90': !collapsed
        }"
      ></i>
    </template>
    <div>
      <div class="flex w-full justify-end">
        <Button size="small" @click="visible = true">Assign staff</Button>
      </div>
      <div v-if="fetchShowStaffsSuccess && showStaffs">
        <DataTable :value="showStaffs.value">
          <Column field="fullname" header="Full name"></Column>
          <Column field="email" header="Email"></Column>
          <Column header="Actions">
            <template #body="{ data }">
              <Button
                size="small"
                severity="danger"
                class="rounded-full"
                @click="() => unassignStaff(data.userId)"
              >
                <i class="pi pi-times"></i>
              </Button>
            </template>
          </Column>
          <template #empty>No staffs</template>
        </DataTable>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { AssignStaff, GetEventStaffs, GetShowStaffs, UnassignStaff } from '@/services/staffs'
import { type BaseShow } from '@/types/items'
import { getHeader } from '@/utils/date'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Panel from 'primevue/panel'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps<{
  eventId: string
  show: BaseShow
}>()

const confirm = useConfirm()
const toast = useToast()
const visible = ref(false)
const { pageNumber, pageSize } = usePagination()

const { data: staffs, isSuccess: fetchStaffsSuccess } = useQuery({
  queryKey: ['staffs'],
  queryFn: () => query(GetEventStaffs(props.eventId, pageNumber.value, pageSize.value))
})

const {
  data: showStaffs,
  isSuccess: fetchShowStaffsSuccess,
  refetch
} = useQuery({
  queryKey: ['show-staffs'],
  queryFn: () => query(GetShowStaffs(props.show.id))
})

const submit = async (id: string) => {
  const { data } = await AssignStaff(id, props.show.id)

  visible.value = false
}
const unassignStaff = (userId: string) => {
  confirm.require({
    message: 'Are you sure you want to unassign this user?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    accept: () => {
      UnassignStaff(userId, props.show.id).then(() => {
        toast.add({ detail: 'Staff unassigned successfully', life: 3000 })
        refetch()
      })
    },
    reject: () => {}
  })
}
</script>
