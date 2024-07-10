<template>
  <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
    <h2 class="text-3xl">THỜI GIAN & LOẠI VÉ</h2>

    <template v-if="shows.length > 0">
      <ShowPanel v-for="show in shows" :key="show.id" :show />
    </template>

    <Button
      class="flex w-full justify-center border-dashed bg-inherit text-inherit hover:border-none hover:bg-[#10b981] hover:text-white"
    >
      + Tạo suất diễn
    </Button>

    <div class="grid grid-cols-3 gap-4">
      <Button class="flex justify-center">Save</Button>
      <Button class="col-span-2 flex justify-center" @click="nextStep">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import { computed, onMounted, ref, unref } from 'vue'
import { usePagination } from '@/composables/usePagination'
import { useQuery } from '@tanstack/vue-query'
import { query } from '@/lib/axios'
import { GetEvents } from '@/services/events'
import { toRefs, type MaybeRef } from '@vueuse/core'
import { GetEventShows } from '@/services/shows'
import type { BaseEvent, BaseShow } from '@/types/items'
import ShowPanel from './ShowPanel.vue'

const props = defineProps<{
  event: BaseEvent
  nextStep: () => void
}>()

const eventId = computed(() => props.event.id)
const { pageNumber, pageSize } = usePagination(1, 5)

const shows = ref<BaseShow[]>([])

onMounted(() => {
  GetEventShows(props.event.id, pageNumber.value, pageSize.value).then(({ data }) => {
    shows.value = data.value.shows
  })
})

// const { fetchShowsSuccess, refetchShows, showsRes } = useShows(eventId)

// function useShows(eventId: MaybeRef<string>) {
//   const { pageNumber, pageSize } = usePagination(1, 5)

//   const {
//     data: showsRes,
//     isSuccess: fetchShowsSuccess,
//     refetch: refetchShows
//   } = useQuery({
//     queryKey: ['shows', { pageNumber, pageSize, eventId }],
//     queryFn: () => query(GetEventShows(unref(eventId), pageNumber.value, pageSize.value))
//   })

//   return {
//     showsRes,
//     fetchShowsSuccess,
//     refetchShows
//   }
// }
</script>
