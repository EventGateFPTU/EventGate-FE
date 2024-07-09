<template>
  <div class="relative z-30 px-20">
    <!-- <div
      class="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 justify-center gap-[calc(calc(100vw_-_11rem)_*_0.979)]"
    > -->
    <div
      class="absolute left-[58px] top-1/2 z-30 -translate-y-1/2 rounded-3xl bg-black px-3 py-6 opacity-50 hover:cursor-pointer hover:opacity-80"
      @click="prev"
    >
      <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: white"></i>
    </div>
    <div
      class="absolute right-[58px] top-1/2 z-30 flex -translate-y-1/2 justify-center gap-[calc(calc(100vw_-_11rem)_*_0.979)] rounded-3xl bg-black px-3 py-6 opacity-50 hover:cursor-pointer hover:opacity-80"
      @click="next"
    >
      <i class="pi pi-chevron-right" style="font-size: 1.5rem; color: white"></i>
    </div>
    <!-- </div> -->
    <Swiper
      v-if="fetchEventsSuccess"
      autoplay
      :slidesPerView="5"
      :centerSlides="true"
      :loop="true"
      :modules
      slide
      ref="swiperRef"
      spaceBetween="50"
      :breakpoints="{}"
      @swiper="setSwiperRef"
      style="z-index: 20"
    >
      <SwiperSlide v-for="event in eventsRes?.events" :key="event.id">
        <div
          class="relative space-y-4 hover:cursor-pointer"
          @click="$router.push(`/events/${event.id}`)"
        >
          <div class="flex justify-center transition-all duration-500">
            <img
              src="@/assets/test-banner.png"
              :alt="event.title"
              class="border-round rounded-3xl"
            />
          </div>
          <div class="flex justify-center">
            <p class="text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {{ event.title }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { onMounted, ref } from 'vue'
import { usePagination } from '@/composables/usePagination'
import { useQuery } from '@tanstack/vue-query'
import { query } from '@/lib/axios'
import { GetEvents } from '@/services/events'

const { eventsRes, fetchEventsSuccess } = useEvents()

let swiperRef = ref()
const modules = [Autoplay, Navigation]

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
  const { pageNumber, pageSize } = usePagination(1, 10)
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
