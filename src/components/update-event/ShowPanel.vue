<template>
  <CreateTicketDialog
    :eventId
    :isNew
    :showId="show.id.toString()"
    v-model:visible="visible"
    @submit="
      (t) => {
        refetchTicketTypes()
        ticketTypes.push(t)
        show.ticketTypeIds!.push(t.id)
        visible = false
      }
    "
  />
  <Panel toggleable collapsed :header="header(show.startsAt, show.endsAt)">
    <template #togglericon="{ collapsed }">
      <i
        class="pi pi-angle-right transition-all duration-200"
        :class="{
          'rotate-90': !collapsed
        }"
      ></i>
    </template>

    <div class="space-y-8">
      <div class="space-y-4">
        <div class="flex w-full justify-between">
          <h2 class="text-2xl">Ngày sự kiện</h2>
          <Button severity="danger" @click="() => confirmRemove()"><X /></Button>
        </div>
        <div class="flex gap-4">
          <div class="flex items-baseline space-x-2">
            <label for="startsAt">Thời gian bắt đầu</label>
            <div class="flex flex-col">
              <Calendar
                v-model="startsAt"
                dateFormat="dd/mm/yy"
                :invalid="startsAtError != null"
                showIcon
              />
              <small id="startsAt-help" class="p-error">
                {{ startsAtError }}
              </small>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <label for="endsAt">Thời gian kết thúc</label>
            <div class="flex flex-col">
              <Calendar v-model="endsAt" dateFormat="dd/mm/yy" showIcon />
              <small id="endsAt-help" class="p-error">
                {{ endsAtError }}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div v-if="fetchTicketTypesSuccess">
        <div
          v-for="ticketType in ticketTypesRes?.data"
          :key="ticketType.id"
          class="rounded-xl border px-8 py-6"
        >
          {{ ticketType.name }}
        </div>
      </div>

      <div
        v-for="ticketType in ticketTypes"
        :key="ticketType.id"
        class="rounded-xl border px-8 py-6"
      >
        {{ ticketType.name }}
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl">Loại vé</h2>
        <Button
          class="border-1 flex w-full justify-center border-dashed bg-inherit text-inherit hover:border-none hover:bg-[#10b981] hover:text-white"
          @click="visible = true"
          >+ Tạo loại vé</Button
        >
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { GetShowTicketTypes } from '@/services/ticketTypes'
import { useQuery } from '@tanstack/vue-query'
import { toRefs } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Panel from 'primevue/panel'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref, unref, watchEffect, type MaybeRef } from 'vue'
import CreateTicketDialog from './CreateTicketDialog.vue'
import type { BaseTicketType } from '@/types/items'
import { getHeader } from '@/utils/date'

const props = defineProps<{
  show: Show
  isNew: boolean
  eventId: string
}>()

type Show = {
  id: string | number
  startsAt?: Date
  endsAt?: Date
  ticketTypeIds?: string[]
}

const ticketTypes = ref<BaseTicketType[]>([])

const visible = ref(false)

const emit = defineEmits(['remove:show', 'hasError', 'add:show'])

const confirm = useConfirm()

const startsAtError = computed(() => (props.show.startsAt ? null : 'Please choose a date'))
const endsAtError = computed(() => {
  if (!props.show.endsAt) return 'Please choose a date'
  if (props.show.startsAt && props.show.startsAt > props.show.endsAt) {
    return 'Start date must be before end date'
  }

  return null
})

watchEffect(() => {
  const ok = startsAtError.value == null && endsAtError.value == null
  emit('hasError', !ok)
})

const show = ref<Show>(props.show)

const { startsAt, endsAt } = toRefs(show.value)

const confirmRemove = () => {
  confirm.require({
    message: 'Are you sure you want to delete this show?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    accept: () => {
      emit('remove:show')
    },
    reject: () => {}
  })
}

const { fetchTicketTypesSuccess, refetchTicketTypes, ticketTypesRes } = useTicketTypes(
  props.show.id as string
)

function useTicketTypes(showId: MaybeRef<string>) {
  const { pageNumber, pageSize } = usePagination(1, 5)

  const {
    data: ticketTypesRes,
    isSuccess: fetchTicketTypesSuccess,
    refetch: refetchTicketTypes
  } = useQuery({
    queryKey: ['ticket-types', { pageNumber, pageSize, showId: props.show.id }],
    queryFn: () => query(GetShowTicketTypes(unref(showId), pageNumber.value, pageSize.value)),
    enabled: !props.isNew
  })

  return {
    ticketTypesRes,
    fetchTicketTypesSuccess,
    refetchTicketTypes
  }
}

function header(startsAt?: Date, endsAt?: Date) {
  if (!startsAt || !endsAt) return ''

  return getHeader(startsAt, endsAt)
}
</script>
