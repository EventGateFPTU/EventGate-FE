<template>
  <div class="flex w-[80vw] items-baseline gap-2 space-y-20 rounded-3xl bg-white p-10">
    All done? Head to
    <Button size="small" @click="$router.push(`/organizer/events/${eventId}`)"
      >Management page</Button
    >
    to finish
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  eventId: string
}>()
</script>
