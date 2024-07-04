<template>
  <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
    <h2 class="text-3xl">THÔNG TIN SỰ KIỆN</h2>
    <FileUploader name="background" :width="1280" :height="720" desc="Thêm ảnh nền sự kiện" />

    <div class="grid grid-cols-4 gap-8">
      <FileUploader name="banner" :width="720" :height="958" desc="Thêm banner sự kiện" />
      <div class="col-span-3 space-y-2">
        <div class="flex flex-col gap-4">
          <label for="name">Tên sự kiện</label>
          <InputText id="name" placeholder="Tên sự kiện" />
        </div>

        <div class="flex flex-col gap-4">
          <label for="name">Địa điểm sự kiện</label>
          <InputText id="name" placeholder="Địa điểm sự kiện" />
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <div class="flex flex-col gap-4">
        <label for="category">Thể loại sự kiện</label>
        <InputText id="category" placeholder="Thể loại sự kiện" />
      </div>

      <Editor v-model="editorValue" class="h-72" />
    </div>

    <div class="grid grid-cols-4 gap-8">
      <FileUploader name="organizer" :width="257" :height="257" desc="Thêm banner sự kiện" />
      <div class="col-span-3 space-y-2">
        <div class="flex flex-col gap-4">
          <label for="organizationName">Tên ban tổ chức</label>
          <InputText id="organizationName" placeholder="Tên ban tổ chức" />
        </div>

        <div class="flex flex-col gap-4">
          <label for="organizationDesc">Thông tin ban tổ chức</label>
          <InputText id="organizationDesc" placeholder="Thông tin ban tổ chức" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <Button class="flex justify-center">Save</Button>
      <Button class="col-span-2 flex justify-center" @click="nextStep">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Button from 'primevue/button'
import { FileUploader } from '@/components/file-upload'

defineProps<{
  nextStep: () => void
}>()

const editorValue = ref('')
</script>
