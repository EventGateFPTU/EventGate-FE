<template>
  <Stepper :steps :initialStep @update:step="(s) => (searchParams.step = s.key)">
    <template #Info="{ nextStep }">
      <div class="pb-32">
        <InfoStep v-if="event" :event :nextStep />
      </div>
    </template>
    <template #Tickets="{ nextStep }">
      <TicketsStep v-if="event" :event :nextStep />
    </template>
    <template #Settings>
      <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">fdsa</div>
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { Stepper, type Step } from '@/components/ui/stepper'
import InfoStep from './InfoStep.vue'
import TicketsStep from './TicketsStep.vue'
import { useRoute } from 'vue-router/auto'
import { onMounted, ref } from 'vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { useUrlSearchParams } from '@vueuse/core'

const route = useRoute('/organizer/create-event/[id]')
const searchParams = useUrlSearchParams<{
  step: string
}>()

const event = ref<GetEventByIdResponse>()

onMounted(() => {
  GetEventById(route.params.id).then(({ data }) => (event.value = data.value))
})

const steps: Step[] = [
  {
    index: 1,
    key: 'Info'
  },
  {
    index: 2,
    key: 'Tickets'
  },
  {
    index: 3,
    key: 'Settings'
  }
]

const initialStep = steps.find((x) => x.key == searchParams.step)?.index
</script>
