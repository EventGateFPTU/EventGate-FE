<template>
  <CreateTicketDialog v-model:visible="visible" />
  <Panel toggleable>
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
          <div class="flex space-x-2">
            <label for="startsAt">Thời gian bắt đầu</label>
            <div class="flex flex-col">
              <Calendar v-model="startsAt" :invalid="startsAtError != null" showIcon />
              <small id="startsAt-help" class="p-error">
                {{ startsAtError }}
              </small>
            </div>
          </div>
          <div class="flex space-x-2">
            <label for="endsAt">Thời gian kết thúc</label>
            <div class="flex flex-col">
              <Calendar v-model="endsAt" showIcon />
              <small id="endsAt-help" class="p-error">
                {{ endsAtError }}
              </small>
            </div>
          </div>
        </div>
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
import { toRefs } from '@vueuse/core'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Panel from 'primevue/panel'
import { computed, ref, watch, watchEffect } from 'vue'
import { X } from 'lucide-vue-next'
import { useConfirm } from 'primevue/useconfirm'
import CreateTicketDialog from './CreateTicketDialog.vue'

const props = defineProps<{
  show: Show
  isNew: boolean
}>()

type Show = {
  startsAt?: Date
  endsAt?: Date
}

const visible = ref(false)

const emit = defineEmits(['remove:show', 'hasError'])

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
</script>
