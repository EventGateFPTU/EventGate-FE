import type { InjectionKey, Ref } from 'vue'
import type { Step } from './types'

type StepsKey = InjectionKey<Ref<Step[]>>
export const stepsKey: StepsKey = Symbol('steps')

type CurrentStepKey = InjectionKey<Ref<Step>>
export const currentStepKey: CurrentStepKey = Symbol('current-step')
