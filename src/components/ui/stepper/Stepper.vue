<template>
  <div :class="cn('', $props.class)">
    <div :class="cn('relative flex w-full justify-center py-8', contentClass)">
      <div v-for="{ key } in steps" :key class="h-full">
        <slot :name="key" v-if="key == currentStep.key" :nextStep />
      </div>
    </div>
    <div class="fixed bottom-12 left-1/2 flex -translate-x-1/2 justify-center">
      <StepperNavigator @update:step="(step) => updateStep(step)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { toRefs } from '@vueuse/core'
import { provide, ref, type HTMLAttributes } from 'vue'
import StepperNavigator from './StepperNavigator.vue'
import { currentStepKey, stepsKey } from './symbols'
import type { Step } from './types'

const props = defineProps<{
  steps: Step[]
  initialStep?: number
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  (e: 'update:step', step: Step): void
}>()

const { steps } = toRefs(props)

const currentStep = ref<Step>(steps.value[props.initialStep ? props.initialStep - 1 : 0])

const updateStep = (step: Step) => {
  if (!currentStep?.value) return
  if (step.index > currentStep?.value.index + 1) return

  currentStep.value = step
  emit('update:step', step)
}

const nextStep = () => {
  const nextStep = steps.value.find((x) => x.index == currentStep.value.index + 1)
  updateStep(nextStep!)
}

provide(stepsKey, steps)
provide(currentStepKey, currentStep)
</script>
