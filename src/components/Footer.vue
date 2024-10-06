<template>
  <div class="m-0 grid h-96 w-screen grid-cols-3 bg-[#fdf6e3]">
    <div></div>
    <div class="flex items-center justify-center">
      <img src="@/assets/qr.png" alt="" class="w-60" />
    </div>
    <div class="flex items-start justify-around">
      <div class="flex h-full w-80 flex-col justify-start text-wrap pt-12 *:py-3">
        <div>
          <h1 class="text-2xl font-bold">Hotline:</h1>
          <span>01234567890 - Mr. Chien</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold">Email:</h1>
          <span>abc123456@gmail.com</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold">Address:</h1>
          <span class=""
            >Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí
            Minh</span
          >
        </div>
      </div>
      <div class="flex h-full w-80 flex-col justify-start text-wrap pt-12 *:py-3">
        <div>
          <h1 class="text-2xl font-bold">For Customer:</h1>
          <span>Customers terms of use</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold">For organizers:</h1>
          <span>Organizers terms of use</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>
