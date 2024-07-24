<template>
  <DefaultLayout :has-footer="false" :has-user-indicator="false">
    <div class="pb-20">
      <div class="relative">
        <img src="@/assets/search-background.png" alt="" class="w-full" />
        <div
          class="absolute bottom-10 left-40 flex h-60 w-[60vw] flex-col space-y-4 rounded-lg bg-[#28207E] bg-opacity-50 p-4"
        >
          <div class="relative flex items-center">
            <InputText
              v-model="searchTerm"
              class="h-12 w-[40vw] pl-10 pr-10 drop-shadow-md"
              placeholder="Tên sự kiện"
              @keydown.enter="() => refetchEvents()"
            />
            <span class="absolute flex items-center justify-center px-4">
              <i class="pi pi-search"></i>
            </span>
          </div>
          <InputText
            v-model="location"
            class="h-12 w-[30vw] pl-4 pr-10 drop-shadow-md"
            placeholder="Vị trí của bạn"
          />

          <div class="flex items-end justify-between">
            <div class="flex flex-col gap-2">
              <label class="text-white">Ngày diễn ra sự kiện</label>
              <Calendar v-model="date" showIcon class="w-[20vw]" :showOnFocus="false" />
            </div>
            <div>
              <Button @click="() => refetchEvents()">Search</Button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div v-if="fetchEventsSuccess" class="container grid grid-cols-4 gap-8 pt-10">
          <Card
            v-for="event in eventsRes?.data"
            :key="event.id"
            class="h-full max-h-[400px] hover:cursor-pointer"
            @click="$router.push(`/events/${event.id}`)"
          >
            <template #header>
              <img alt="user header" src="@/assets/test-background.png" class="rounded-t-xl" />
            </template>
            <template #title>{{ event.title }}</template>
            <template #content> </template>
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
import { usePagination } from '@/composables/usePagination'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { query } from '@/lib/axios'
import { SearchEvents } from '@/services/events'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router/auto'
import { useUrlSearchParams } from '@vueuse/core'

const route = useRoute('/events/search')

const { eventsRes, fetchEventsSuccess, refetchEvents, searchTerm, categoryIds, date, location } =
  useSearchEvents()

function useSearchEvents() {
  const { pageNumber, pageSize } = usePagination(1, 5)
  // const searchTerm = ref<string>(search ?? '')
  const urlSearchParams = useUrlSearchParams()
  const searchTerm = ref<string>(urlSearchParams.search as string)
  const location = ref<string>()
  const date = ref<Date>()
  const categoryIds = ref<string[]>([])

  watch(searchTerm, (val) => (urlSearchParams.search = val))

  const {
    data: eventsRes,
    isSuccess: fetchEventsSuccess,
    refetch: refetchEvents
  } = useQuery({
    queryKey: ['events', { pageNumber, pageSize }],
    queryFn: () =>
      query(
        SearchEvents(
          pageNumber.value,
          pageSize.value,
          categoryIds.value,
          searchTerm.value,
          location.value,
          date.value
        )
      )
  })

  return {
    eventsRes,
    fetchEventsSuccess,
    refetchEvents,

    searchTerm,
    location,
    date,
    categoryIds
  }
}
</script>
