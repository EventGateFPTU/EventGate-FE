<template>
  <Stepper :steps :initialStep @update:step="(s) => (searchParams.step = s.key)">
    <template #Info="{ nextStep }">
      <div class="pb-32">
        <InfoStep v-if="event && organizer" :event :organizer :nextStep />
      </div>
    </template>
    <template #Tickets="{ nextStep }">
      <TicketsStep v-if="event" :event :nextStep />
    </template>
    <template #Settings>
      <SettingsStep v-if="event" :event />
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { Stepper, type Step } from '@/components/ui/stepper'
import InfoStep from './InfoStep.vue'
import TicketsStep from './TicketsStep.vue'
import SettingsStep from './SettingsStep.vue'
import { useRoute } from 'vue-router/auto'
import { onMounted, ref } from 'vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { useUrlSearchParams } from '@vueuse/core'
import { GetCurrentOrganization } from '@/services/organizers'
import type { BaseOrganizer } from '@/types/items'

const route = useRoute('/organizer/events/[id]')
const searchParams = useUrlSearchParams<{
  step: string
}>()

const event = ref<GetEventByIdResponse>()
const organizer = ref<BaseOrganizer>()
const done = ref(false)

onMounted(() => {
  GetEventById(route.params.id).then(({ data }) => (event.value = data.value))
  GetCurrentOrganization()
    .then((res) => {
      organizer.value = res.data.value
    })
    .finally(() => (done.value = true))
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
