<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
</script>

<template>
  <RouterView />
  <DynamicDialog />
  <Toast />
</template>
