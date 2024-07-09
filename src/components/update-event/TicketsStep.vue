<template>
  <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
    <h2 class="text-3xl">THỜI GIAN & LOẠI VÉ</h2>

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
              <label for="fromDate">Thời gian bắt đầu</label>
              <Calendar showIcon />
            </div>
            <div class="space-x-2">
              <label for="toDate">Thời gian kết thúc</label>
              <Calendar showIcon />
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

    <Button
      class="flex w-full justify-center border-dashed bg-inherit text-inherit hover:border-none hover:bg-[#10b981] hover:text-white"
    >
      + Tạo suất diễn
    </Button>

    <div class="grid grid-cols-3 gap-4">
      <Button class="flex justify-center">Save</Button>
      <Button class="col-span-2 flex justify-center" @click="nextStep">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

defineProps<{
  nextStep: () => void
}>()
</script>
