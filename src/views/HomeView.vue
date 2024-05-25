<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

const count = ref(0)
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <Button @click="count++"> Count is: {{ count }} </Button>
  </div>
</template>
