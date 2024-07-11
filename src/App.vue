<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <RouterView />
  <DynamicDialog />
  <Toast />
</template>
