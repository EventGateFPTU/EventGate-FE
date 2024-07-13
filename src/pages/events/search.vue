<template>
  <DefaultLayout :has-footer="false" :has-user-indicator="false">
    <div>
      <div class="relative">
        <img src="@/assets/search-background.png" alt="" class="w-full" />
        <div
          class="absolute bottom-10 left-10 flex h-60 w-[60vw] flex-col space-y-4 rounded-lg bg-[#28207E] bg-opacity-50 p-4"
        >
          <div class="relative flex items-center">
            <InputText class="h-12 w-[40vw] pl-10 pr-10 drop-shadow-md" placeholder="Tên sự kiện" />
            <span class="absolute flex items-center justify-center px-4">
              <i class="pi pi-search"></i>
            </span>
          </div>
          <InputText class="h-12 w-[30vw] pl-4 pr-10 drop-shadow-md" placeholder="Vị trí của bạn" />

          <div class="flex items-end justify-between">
            <div class="flex flex-col gap-2">
              <label class="text-white">Ngày diễn ra sự kiện</label>
              <Calendar v-model="date" showIcon class="w-[20vw]" :showOnFocus="false" />
            </div>
            <div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div v-if="fetchEventsSuccess" class="container grid grid-cols-5 gap-8 pt-10">
          <Card v-for="event in eventsRes?.data" :key="event.id">
            <template #header>
              <img alt="user header" :src="event.backgroundImageUrl" />
            </template>
            <template #title>{{ event.title }}</template>
            <template #content> price related thing here </template>
            <!-- <template #footer>
              <div class="mt-1 flex gap-3">
                <Button label="Cancel" severity="secondary" outlined class="w-full" />
                <Button label="Save" class="w-full" />
              </div>
            </template> -->
          </Card>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import Calendar from 'primevue/calendar'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Button from 'primevue/button'
import { usePagination } from '@/composables/usePagination'
import { useQuery } from '@tanstack/vue-query'
import { query } from '@/lib/axios'
import { GetEvents } from '@/services/events'
import Card from 'primevue/card'

const props = defineProps<{
  searchTerm?: string
}>()

const date = ref()

const { eventsRes, fetchEventsSuccess, refetchEvents } = useEvents()

function useEvents() {
  const { pageNumber, pageSize } = usePagination(1, 5)
  const searchTerm = ref<string>()

  const {
    data: eventsRes,
    isSuccess: fetchEventsSuccess,
    refetch: refetchEvents
  } = useQuery({
    queryKey: ['events', { pageNumber, pageSize }],
    queryFn: () => query(GetEvents(pageNumber.value, pageSize.value, searchTerm.value))
  })

  return {
    eventsRes,
    fetchEventsSuccess,
    refetchEvents
  }
}
</script>
