<template>
  <DefaultLayout :has-footer="false">
    <div class="relative py-40">
      <MainEvents />
    </div>

    <div class="relative">
      <img class="absolute -top-10 w-full" src="@/assets/something.png" alt="" />
      <div class="relative z-20 flex justify-center gap-5">
        <img src="@/assets/asterisk1.png" class="w-20" />
        <div
          class="flex items-center justify-center rounded-2xl border border-[#4A3F9F] bg-[#BFFF50] px-10 font-semibold"
        >
          Sự kiện nổi bật
        </div>
        <img src="@/assets/asterisk1.png" class="w-20" />
      </div>
      <div class="relative z-30 pt-20">
        <OutstandingEvents />
      </div>
    </div>

    <div class="pb-[1000px]"></div>

    <img fill="none" src="@/assets/background-logo.png" class="absolute top-0 z-0 w-full" />
    <div class="absolute bottom-0 z-10 w-full">
      <Footer />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import MainEvents from '@/components/events/MainEvents.vue'
import OutstandingEvents from '@/components/events/OutstandingEvents.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Footer from '@/components/Footer.vue'
</script>
