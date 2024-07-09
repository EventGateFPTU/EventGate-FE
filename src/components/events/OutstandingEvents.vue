<template>
  <div class="relative z-30 px-20">
    <div
      class="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 justify-center gap-[calc(calc(100vw_-_11rem)_*_0.9585)]"
    >
      <div class="rounded-3xl bg-white px-3 py-6 hover:cursor-pointer" @click="prev">
        <i class="pi pi-chevron-left" style="font-size: 1.5rem"></i>
      </div>
      <div class="rounded-3xl bg-white px-3 py-6 hover:cursor-pointer" @click="next">
        <i class="pi pi-chevron-right" style="font-size: 1.5rem"></i>
      </div>
    </div>
    <Swiper
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
      <SwiperSlide v-for="product in products" :key="product.id">
        <div class="relative space-y-4 hover:cursor-pointer">
          <div class="flex justify-center transition-all duration-500">
            <img
              src="@/assets/test-banner.png"
              :alt="product.name"
              class="border-round rounded-3xl"
            />
          </div>
          <div class="flex justify-center">
            <p class="text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {{ product.name }}
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

onMounted(() => {
  products.value = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'd3g4h5j6',
      name: 'Leather Wallet',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 12,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'a1b2c3d4',
      name: 'Sunglasses',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 80,
      category: 'Accessories',
      quantity: 8,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'd3g4h5j6',
      name: 'Leather Wallet',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 12,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'a1b2c3d4',
      name: 'Sunglasses',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 80,
      category: 'Accessories',
      quantity: 8,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'd3g4h5j6',
      name: 'Leather Wallet',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 12,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'a1b2c3d4',
      name: 'Sunglasses',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 80,
      category: 'Accessories',
      quantity: 8,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    }
  ]
})

let swiperRef = ref()
const modules = [Autoplay, Navigation]
const products: any = ref([])

const setSwiperRef = (swiper: any) => {
  swiperRef.value = swiper
}

const prev = () => {
  swiperRef.value.slidePrev()
}

const next = () => {
  swiperRef.value.slideNext()
}
</script>
