<template>
  <div
    class="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 justify-center gap-[calc(100vw_*_0.517)]"
  >
    <div class="rounded-3xl bg-white px-3 py-6 hover:cursor-pointer" @click="prev">
      <i class="pi pi-chevron-left" style="font-size: 1.5rem"></i>
    </div>
    <div class="rounded-3xl bg-white px-3 py-6 hover:cursor-pointer" @click="next">
      <i class="pi pi-chevron-right" style="font-size: 1.5rem"></i>
    </div>
  </div>
  <Swiper
    :slidesPerView="5"
    :centerSlides="true"
    :loop="true"
    :modules
    slide
    ref="swiperRef"
    spaceBetween="0"
    :breakpoints="{}"
    @swiper="setSwiperRef"
  >
    <SwiperSlide v-for="product in products" :key="product.id" v-slot="{ isActive, isNext }">
      <div class="flex justify-center transition-all duration-500">
        <img
          :src="'https://primefaces.org/cdn/primevue/images/product/' + product.image"
          :alt="product.name"
          class="border-round rounded-3xl"
        />
      </div>
    </SwiperSlide>
  </Swiper>
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
