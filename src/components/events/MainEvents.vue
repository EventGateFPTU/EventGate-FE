<template>
  <div
    class="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 justify-center gap-[calc(100vw_*_0.395)]"
  >
    <div
      class="rounded-3xl bg-black px-3 py-6 opacity-50 hover:cursor-pointer hover:opacity-80"
      @click="prev"
    >
      <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: white"></i>
    </div>
    <div
      class="rounded-3xl bg-black px-3 py-6 opacity-50 hover:cursor-pointer hover:opacity-80"
      @click="next"
    >
      <i class="pi pi-chevron-right" style="font-size: 1.5rem; color: white"></i>
    </div>
  </div>
  <Swiper
    v-if="fetchEventsSuccess"
    autoplay
    :slidesPerView="3"
    :centerSlides="true"
    :loop="true"
    :modules
    slide
    ref="swiperRef"
    class="scale-125"
    spaceBetween="0"
    @swiper="setSwiperRef"
  >
    <SwiperSlide v-for="event in eventsRes?.data" :key="event.id" v-slot="{ isActive, isNext }">
      <div
        class="relative transition-all duration-500"
        :class="{
          'scale-75 ': !isNext,
          'flex justify-end': isActive,
          'flex justify-center': isNext
        }"
      >
        <img
          src="@/assets/test-background.png"
          :alt="event.title"
          class="border-round w-[1000px] rounded-3xl"
        />
        <div class="absolute bottom-0 left-0 p-4">
          <h2
            class="w-96 flex-1 break-words text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            {{ event.title }}
          </h2>
        </div>
        <div class="absolute bottom-0 right-0 p-4">
          <Button @click="$router.push(`/events/${event.id}`)">See details</Button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { GetEvents } from '@/services/events'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

let swiperRef = ref()
const modules = [Autoplay, Navigation]

const { eventsRes, fetchEventsSuccess } = useEvents()

const setSwiperRef = (swiper: any) => {
  swiperRef.value = swiper
}

const prev = () => {
  swiperRef.value.slidePrev()
}

const next = () => {
  swiperRef.value.slideNext()
}

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
