<template>
  <div class="card mb-8 flex min-h-72 w-screen flex-col items-center justify-between">
    <h1 class="mb-6 h-1/6 w-screen text-center text-3xl font-bold">Upcoming Event</h1>
    <Carousel
      circular
      :value="products"
      :numVisible="5"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="3000"
      :showIndicators="false"
    >
      <template #item="slotProps">
        <div class="h-5/6 w-full rounded-lg">
          <div class="relative mx-auto flex h-full w-full flex-col items-center justify-end">
            <img
              :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
              :alt="slotProps.data.name"
              class="mx-auto flex aspect-3/4 w-2/3 rounded-lg"
            />
            <div
              class="absolute inset-y-0 bottom-0 z-10 flex h-1/4 w-2/3 flex-col items-center justify-center rounded-lg bg-black bg-opacity-45"
            >
              <div
                class="flex w-full flex-col items-center justify-start text-lg font-semibold text-white"
              >
                {{ slotProps.data.name }}
                <div class="mt-0 text-xl font-semibold">${{ slotProps.data.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Carousel from 'primevue/carousel'

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

const products: any = ref([])
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>
