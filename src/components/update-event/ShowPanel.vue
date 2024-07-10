<template>
  <Panel toggleable>
    <template #togglericon="{ collapsed }">
      <i
        class="pi pi-angle-right transition-all duration-200"
        :class="{
          'rotate-90': !collapsed
        }"
      ></i>
    </template>

    <div class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl">Ngày sự kiện</h2>
        <div class="flex gap-4">
          <div class="space-x-2">
            <label for="startsAt">Thời gian bắt đầu</label>
            <Calendar v-model="startsAt" dateFormat="dd/mm/yy" showIcon />
          </div>
          <div class="space-x-2">
            <label for="endsAt">Thời gian kết thúc</label>
            <Calendar v-model="endsAt" showIcon />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl">Loại vé</h2>
        <Button
          class="border-1 flex w-full justify-center border-dashed bg-inherit text-inherit hover:border-none hover:bg-[#10b981] hover:text-white"
          >+ Tạo loại vé</Button
        >
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { BaseShow } from '@/types/items'
import { toRefs } from '@vueuse/core'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Panel from 'primevue/panel'
import { ref } from 'vue'

const props = defineProps<{
  show: BaseShow
}>()

const show = ref<BaseShow>(props.show)

const { startsAt, endsAt } = toRefs(show.value)
</script>
