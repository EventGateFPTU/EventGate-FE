<template>
  <Dialog v-model:visible="visible" modal header="Assign staff">
    <div class="justify-content-end flex gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="visible = false"></Button>
    </div>
  </Dialog>
  <Panel :header="getHeader(show.startsAt, show.endsAt)" toggleable>
    <template #togglericon="{ collapsed }">
      <i
        class="pi pi-angle-right transition-all duration-200"
        :class="{
          'rotate-90': !collapsed
        }"
      ></i>
    </template>
    <div>
      <div class="flex w-full justify-end">
        <Button size="small" @click="visible = true">Assign staff</Button>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { query } from '@/lib/axios'
import type { BaseShow } from '@/types/items'
import { getHeader } from '@/utils/date'
import { useQuery } from '@tanstack/vue-query'
import Panel from 'primevue/panel'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

const props = defineProps<{
  show: BaseShow
}>()

const visible = ref(false)
const searchUserVisible = ref(false)

const { data, isSuccess, refetch } = useQuery({
  queryKey: ['staffs', { showId: props.show.id }]
})
</script>
