<template>
  <div class="flex w-full justify-center py-20">
    <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
      <h2 class="text-2xl">Thiết lập công khai</h2>
      <h3 class="text-xl">Sự kiện này là công khai hay riêng tư?</h3>

      <div v-if="event.status != EventStatus.Published && !clicked" class="space-y-4">
        <h3 class="text-xl">Publish event</h3>
        <Button @click="publish">Publish</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PublishEvent } from '@/services/events'
import { EventStatus } from '@/types/enums'
import type { BaseEvent } from '@/types/items'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const props = defineProps<{
  event: BaseEvent
}>()

const toast = useToast()
const clicked = ref(false)

async function publish() {
  await PublishEvent(props.event.id)

  toast.add({ detail: 'Publish event successfully', life: 3000 })
  clicked.value = true
}
</script>
