<template>
  <Stepper :steps>
    <template #Info="{ nextStep }">
      <div class="pb-32">
        <InfoStep :nextStep />
      </div>
    </template>
    <template #Tickets="{ nextStep }">
      <TicketsStep :nextStep />
    </template>
    <template #Settings>
      <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">fdsa</div>
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { Stepper } from '@/components/stepper'
import type { Step } from '@/components/stepper/types'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import InfoStep from './InfoStep.vue'
import TicketsStep from './TicketsStep.vue'

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
const menu = ref(null)
</script>
