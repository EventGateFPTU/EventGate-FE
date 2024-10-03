<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useUrlSearchParams } from '@vueuse/core'

const urlSearchParams = useUrlSearchParams<{
  code?: string
  id?: string
  cancel?: boolean
  status?: string
  orderCode?: number
}>()
</script>

<template>
  <DefaultLayout has-footer>
    <div
      v-if="urlSearchParams.code == '00'"
      class="flex h-screen w-full flex-col items-center justify-center"
    >
      <h1>Thank you for your order!</h1>
    </div>
  </DefaultLayout>
</template>
