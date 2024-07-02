<template>
  <div :class="cn('', $props.class)">
    <div :class="cn('relative flex w-full justify-center py-8', contentClass)">
      <div v-for="{ key } in steps" :key class="h-full">
        <slot :name="key" v-if="key == currentStep.key" />
      </div>
    </div>
    <div class="absolute bottom-20 flex w-full justify-center">
      <StepperNavigator @update:step="(step) => (currentStep = step)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, type HTMLAttributes } from 'vue'
import type { Step } from './types'
import { toRefs } from '@vueuse/core'
import { currentStepKey, stepsKey } from './symbols'
import StepperNavigator from './StepperNavigator.vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  steps: Step[]
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}>()

const { steps } = toRefs(props)

const currentStep = ref<Step>(steps.value[0])

provide(stepsKey, steps)
provide(currentStepKey, currentStep)
</script>
