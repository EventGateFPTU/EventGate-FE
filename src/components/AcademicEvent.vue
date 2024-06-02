<template>
  <div class="card flex h-96 w-screen flex-col items-center justify-start">
    <h1 class="h-1/6 w-screen text-center text-3xl font-bold">Academic Event</h1>
    <Carousel
      circular
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="3000"
      :showIndicators="false"
    >
      <template #item="slotProps">
        <div
          class="mx-auto flex h-full w-5/6 flex-row items-center justify-center rounded-2xl bg-slate-800"
        >
          <img
            :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
            :alt="slotProps.data.name"
            class="border-round mx-4 my-6 flex aspect-square w-1/3 rounded-lg"
          />
          <div class="flex w-full flex-col justify-start py-6 text-lg text-white">
            <h1 class="font-semibold">{{ slotProps.data.name }}</h1>
            <div class="flex flex-row justify-start">
              <i class="pi pi-calendar mr-1 pt-1"></i>
              <h1 class="font-light">{{ slotProps.data.date }}</h1>
            </div>
            <div class="flex flex-row justify-start">
              <i class="pi pi-map-marker mr-1 pt-1"></i>
              <h1 class="font-light">{{ slotProps.data.address }}</h1>
            </div>
            <div class="flex flex-row justify-start">
              <i class="pi pi-tag mr-1 pt-1"></i>
              <h1 class="font-light">{{ slotProps.data.price }}</h1>
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
      image: 'bamboo-watch.jpg',
      name: 'Bamboo Watch',
      address: 'SECC Quận 7, TP.HCM',
      date: '22.09.2023',
      price: '1.000.000-2.000.000'
    },
    {
      image: 'bamboo-watch.jpg',
      name: 'Bamboo Watch',
      address: 'SECC Quận 7, TP.HCM',
      date: '22.09.2023',
      price: '1.000.000-2.000.000'
    },
    {
      image: 'bamboo-watch.jpg',
      name: 'Bamboo Watch',
      address: 'SECC Quận 7, TP.HCM',
      date: '22.09.2023',
      price: '1.000.000-2.000.000'
    }
  ]
})

const products: any = ref([])
const responsiveOptions = ref([])
</script>
