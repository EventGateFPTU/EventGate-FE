<template>
  <div class="card flex h-96 w-screen flex-row justify-center">
    <Galleria
      class="w-full"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      :circular="true"
      containerStyle="max-width: 640px"
      :showItemNavigators="true"
      :showThumbnails="false"
      :class="['w-full', 'h-full']"
    >
      <template #item="slotProps">
        <img class="shadow-2xl" :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" />
      </template>
    </Galleria>
  </div>
</template>

<script setup>
import Galleria from 'primevue/galleria'
import { ref, onMounted } from 'vue'

onMounted(() => {
  images.value = [
    {
      itemImageSrc:
        'https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_7__3.jpg',
      thumbnailImageSrc:
        'https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_7__3.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      itemImageSrc:
        'https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/t/3/t3_-_movie_-_cgv_980x448.jpg',
      thumbnailImageSrc:
        'https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/t/3/t3_-_movie_-_cgv_980x448.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
    }
  ]
})

const images = ref()
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
])
</script>
