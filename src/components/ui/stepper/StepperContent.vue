<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { currentStepKey, stepsKey } from './symbols'

defineProps<{
  stepKey: string
  class?: HTMLAttributes['class']
}>()

const steps = inject(stepsKey)
if (steps === undefined) throw new Error('stepsKey is not provided')

const currentStep = inject(currentStepKey)
if (currentStep === undefined) throw new Error('currentStepKey is not provided')
</script>
