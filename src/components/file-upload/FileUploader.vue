<template>
  <FileUpload
    mode="advanced"
    name="demo[]"
    url="/api/upload"
    :multiple="false"
    accept="image/*"
    :maxFileSize="1000000"
    :auto="true"
  >
    <template #header>
      <div></div>
    </template>
    <template #content="{ files,  }">
      <div v-if="files.length > 0">
        <img role="presentation" :alt="files[0].name" :src="files[0].objectURL" :width :height />
      </div>
    </template>
    <template #empty>
      <div class="flex w-full justify-center">
        <img src="@/assets/upload-logo.png" />
      </div>
    </template>
  </FileUpload>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload'

defineProps<{
  width: number
  height: number
}>()
</script>
