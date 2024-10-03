<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    window.location.href = '/'
  }, 3000)
})
</script>

<template>
  <DefaultLayout has-footer>
    <div class="flex h-screen w-full flex-col items-center justify-center">
      <h1>Order canceled</h1>
    </div>
  </DefaultLayout>
</template>
