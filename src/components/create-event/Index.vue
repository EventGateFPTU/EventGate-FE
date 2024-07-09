<template>
  <Stepper :steps>
    <template #Info>
      <div class="pb-32">
        <InfoStep />
      </div>
    </template>
    <template #Tickets> </template>
    <template #Settings>
      <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">fdsa</div>
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { Stepper, type Step } from '@/components/ui/stepper'
import { ref } from 'vue'
import InfoStep from './InfoStep.vue'

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
