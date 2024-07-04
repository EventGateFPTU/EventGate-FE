<template>
  <DefaultLayout>
    <div class="min-h-[calc(100vh_-_8rem)] bg-[#4A3F9F]">
      <CreateEventForm />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { CreateEventForm } from '@/components/create-event'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
