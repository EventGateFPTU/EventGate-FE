<script setup lang="ts">
import ShowsAccordion from '@/components/shows/ShowsAccordion.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { useElementSize } from '@vueuse/core'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute('/events/[id]/')

const modules = [Pagination]

const images = [
  {
    src: '@/assets/test-background.png'
  },
  {
    src: '@/assets/test-background.png'
  },
  {
    src: '@/assets/test-background.png'
  },
  {
    src: '@/assets/test-background.png'
  },
  {
    src: '@/assets/test-background.png'
  }
]

const tickets = [
  {
    name: 'Ticket 1',
    price: 100000
  },
  {
    name: 'Ticket 2',
    price: 200000
  },
  {
    name: 'Ticket 3',
    price: 300000
  },
  {
    name: 'Ticket 4',
    price: 400000
  }
]

const event = ref<GetEventByIdResponse>()

const contentRef = ref()
const { height } = useElementSize(contentRef)

onMounted(() => {
  GetEventById(route.params.id).then(({ data }) => (event.value = data.value))
})
</script>

<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="relative flex w-full flex-col justify-center" v-if="event">
      <img :src="event.backgroundImageUrl" alt="" class="w-full" />
      <div class="relative">
        <img
          src="@/assets/ellipse.png"
          alt=""
          class="absolute -z-40 hidden w-full drop-shadow-2xl"
          :style="{
            transform: `translateY(-${height * 2.2}px)`
          }"
        />
        <div class="space-y-8 px-32 pt-20 text-[#0088FF]" ref="contentRef">
          <div class="relative space-y-8" v-if="event.additionalImages.length > 0">
            <h2 class="text-2xl font-bold">Hình ảnh sự kiện</h2>
            <swiper
              :slidesPerView="3"
              :spaceBetween="30"
              :pagination="{
                clickable: true
              }"
              :modules="modules"
              autoplay
            >
              <SwiperSlide v-for="image in event.additionalImages" :key="image">
                <img :src="image" :alt="event.title" class="border-round w-[1000px] rounded-3xl" />
              </SwiperSlide>
            </swiper>
          </div>
          <div class="relative flex flex-row-reverse justify-between gap-16">
            <div class="relative w-full space-y-8">
              <h2 class="text-2xl font-bold">BAN TỔ CHỨC</h2>
              <div class="flex flex-col items-center gap-4">
                <img :src="event.organizerImageUrl" alt="" class="w-full rounded-3xl" />

                <h3 class="text-xl font-semibold">{{ event.organizerName }}</h3>
              </div>

              <p>{{ event.organizerDescription }}</p>
            </div>
            <div class="space-y-8">
              <h2 class="text-2xl font-bold">Thông tin sự kiện</h2>

              <p v-html="event.description" class="text-xl"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-16 px-32 pb-[400px] pt-[5%]">
        <h2 class="text-2xl font-bold">HẠNG VÉ</h2>

        <div class="grid grid-cols-6 gap-12">
          <div class="col-span-5 space-y-8">
            <ShowsAccordion :event />
          </div>
          <div
            class="flex items-center justify-center rounded-3xl bg-[#0088FF] text-xl font-semibold text-white"
          >
            Quảng cáo
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
