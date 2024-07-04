<template>
  <DefaultLayout :has-footer="true">
    <div class="relative py-40">
      <MainEvents />
    </div>

    <div class="relative z-10 flex justify-center gap-5">
      <img src="@/assets/asterisk1.png" class="w-20" />
      <div
        class="flex items-center justify-center rounded-2xl border border-[#4A3F9F] bg-[#BFFF50] px-10"
      >
        Sự kiện nổi bật
      </div>
      <img src="@/assets/asterisk1.png" class="w-20" />
    </div>

    <div class="relative pb-[2000px] pt-32">
      <OutstandingEvents />
    </div>

    <img fill="none" src="@/assets/background-logo.png" class="absolute top-0 z-0 w-full" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import MainEvents from '@/components/events/MainEvents.vue'
import OutstandingEvents from '@/components/events/OutstandingEvents.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
