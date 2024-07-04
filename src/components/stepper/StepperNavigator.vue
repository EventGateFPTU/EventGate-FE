<template>
  <div :class="cn('flex w-full items-center justify-center ', $props.class)">
    <div
      class="flex items-center gap-4 rounded-full border-2 bg-gray-50 p-4 shadow-2xl drop-shadow-2xl"
    >
      <div
        v-for="step in steps.sort((x) => x.index)"
        :key="step.key"
        class="flex items-center gap-4"
        :class="{
          'pl-2': step.index == 1 && !isCurrentStep(step),
          'pr-2': steps.length == step.index && !isCurrentStep(step)
        }"
      >
        <p
          v-if="step.index !== 1"
          :class="{
            'text-[#10b981]': isCurrentStep(step)
          }"
        >
          <i class="pi pi-chevron-right text-xl"></i>
        </p>
        <div
          class="flex items-center gap-2 text-gray-600 hover:cursor-pointer"
          @click="$emit('update:step', step)"
        >
          <Button
            class="size-full rounded-full border-2 bg-white text-gray-600"
            :class="{
              'border-[#10b981] text-[#10b981]': isCurrentStep(step),
              'border-gray-600': !isCurrentStep(step)
            }"
          >
            {{ step.index }}
          </Button>
          <p
            :class="{
              'text-[#10b981]': isCurrentStep(step)
            }"
          >
            {{ step.key }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import Button from 'primevue/button'
import { inject, type HTMLAttributes } from 'vue'
import { currentStepKey, stepsKey } from './symbols'
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

const isCurrentStep = (step: Step) => step.key === currentStep.value.key
</script>
