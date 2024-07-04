<template>
  <DefaultLayout>
    <div class="relative min-h-[calc(100vh_-_8rem)] bg-[#4A3F9F]">
      <div class="relative z-10 h-[2000px] w-full px-8 pt-32">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <img
              src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
              alt=""
              class="w-full rounded-3xl"
            />
          </div>
          <div class="pt-16">
            <h2 class="text-2xl">TÊN SỰ KIỆN</h2>
          </div>
        </div>
      </div>
      <img fill="none" src="@/assets/background-logo.png" class="absolute top-0 z-0 w-full" />
      <div class="absolute bottom-0 z-0 w-full">
        <Footer />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Footer from '@/components/Footer.vue'
</script>
