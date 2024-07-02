<template>
  <div :class="cn('flex w-full items-center justify-center ', $props.class)">
    <div class="flex items-center gap-4 rounded-full bg-[#E3E3E3]">
      <div v-for="(step, index) in steps" :key="step.key" class="flex items-center gap-4">
        <Button
          @click="$emit('update:step', step)"
          class="rounded-full border-0 bg-white px-8 text-black"
        >
          <p v-if="step.key === currentStep.key">{{ index + 1 }}. {{ step.key }}</p>
          <p v-else>{{ index + 1 }}</p>
        </Button>
        <p v-if="steps.length !== index + 1">></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { currentStepKey, stepsKey } from './symbols'
import { cn } from '@/lib/utils'
import Button from 'primevue/button'
import type { Step } from './types'

defineProps<{
  class?: HTMLAttributes['class']
}>()

defineEmits<{
  (e: 'update:step', step: Step): void
}>()

const steps = inject(stepsKey)
if (steps === undefined) throw new Error('no stepsKey are provided')

const currentStep = inject(currentStepKey)
if (currentStep === undefined) throw new Error('currentStepKey is not provided')
</script>
