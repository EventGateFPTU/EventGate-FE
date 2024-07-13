<template>
  <nav class="flex space-x-2 pl-4 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.label"
      class="border-white bg-white text-black hover:bg-gray-100"
      @click="currValue = item.value"
      :class="{
        'bg-gray-200': item.value == currValue
      }"
    >
      {{ item.label }}
    </Button>
  </nav>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { cn } from '@/lib/utils'
import { ref, watch } from 'vue'

const props = defineProps<{
  value?: string
}>()

const emit = defineEmits(['update:value'])

interface Item {
  label: string
  value: string
}

const sidebarNavItems: Item[] = [
  {
    label: 'Information',
    value: 'Information'
  },
  {
    label: 'Visibility',
    value: 'Visibility'
  }
]

const currValue = ref(props.value ?? sidebarNavItems[0].value)
watch(currValue, (val) => emit('update:value', val))
</script>
