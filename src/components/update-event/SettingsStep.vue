<template>
  <div class="flex w-full justify-center py-20">
    <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
      <h2 class="text-2xl">Thiết lập công khai</h2>
      <h3 class="text-xl">Sự kiện này là công khai hay riêng tư?</h3>
      <h3 class="text-xl">Khi nào thì sự kiện sẽ được công bố?</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  eventId: string
}>()
</script>
