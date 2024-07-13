<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="relative flex w-full justify-center pt-32" v-if="event">
      <div class="container space-y-16 pb-[400px]">
        <div>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <img :src="event.backgroundImageUrl" alt="" class="w-full rounded-3xl" />
            </div>
            <div class="flex flex-col justify-center">
              <h2 class="text-3xl">{{ event.title }}</h2>
            </div>
          </div>
        </div>

        <div class="space-y-8 rounded-2xl bg-white p-8">
          <div class="grid grid-cols-4 gap-16">
            <div class="relative space-y-8">
              <h2 class="text-2xl font-bold">BAN TỔ CHỨC</h2>
              <div class="flex flex-col items-center gap-4">
                <img :src="event.organizerImageUrl" alt="" class="w-full rounded-3xl" />

                <h3 class="text-xl font-semibold">{{ event.organizerName }}</h3>
              </div>

              <p>{{ event.organizerDescription }}</p>
            </div>
            <div class="col-span-3 space-y-8">
              <h2 class="text-2xl font-bold">THÔNG TIN SỰ KIỆN</h2>

              <p v-html="event.description" class="text-xl"></p>
            </div>
          </div>

          <h2 class="text-2xl font-bold">HẠNG VÉ</h2>

          <div class="rounded-md border p-0">
            <div class="flex h-16 items-center p-4 text-xl">
              <p class="font-semibold">Thông tin vé</p>
            </div>
            <ShowsAccordion :eventId="event.id" />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import ShowsAccordion from '@/components/shows/ShowsAccordion.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute('/events/[id]')

const event = ref<GetEventByIdResponse>()

onMounted(() => {
  GetEventById(route.params.id).then(({ data }) => (event.value = data.value))
})
</script>
