<template>
  <div class="flex justify-center py-32">
    <InfoStep v-if="done" :organizer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfoStep from './InfoStep.vue'
import type { BaseOrganizer } from '@/types/items'
import { GetCurrentOrganization } from '@/services/organizers'

const organizer = ref<BaseOrganizer>()
const done = ref(false)

onMounted(() =>
  GetCurrentOrganization()
    .then((res) => {
      organizer.value = res.data.value
    })
    .finally(() => (done.value = true))
)
</script>
