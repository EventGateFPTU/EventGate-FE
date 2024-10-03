<template>
  <div
    class="relative flex w-full items-center justify-center"
    :style="{
      height
    }"
  >
    <label
      :for="name"
      class="flex min-h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray-300 bg-[#0088FF] hover:bg-[#0088FF]"
    >
      <template v-if="file == null && !fileUrl">
        <div class="flex flex-col items-center justify-center space-y-2 pb-6 pt-5">
          <img src="@/assets/upload-logo.png" class="size-16" />
          <p class="text-xs text-white">{{ desc }}</p>
          <p class="text-xs text-white">({{ width }} x {{ height }})</p>
        </div>
        <input :id="name" type="file" class="hidden" @change="onFileChanged" />
      </template>
      <div v-else class="p-4">
        <img :src="fileUrl ?? image?.src" class="max-h-full max-w-full" />
      </div>
    </label>
    <Button
      v-if="fileUrl ?? file"
      class="absolute right-4 top-4"
      severity="danger"
      @click="$emit('update:file', null)"
      >X</Button
    >
  </div>

  <Toast position="top-center" :group="name" />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, toRefs, watch, watchEffect } from 'vue'

const props = defineProps<{
  fileUrl?: string
  file: File | null
  width: number
  height: number
  desc: string
  name: string
}>()

const { fileUrl, file } = toRefs(props)

onMounted(() => {})

const emit = defineEmits(['update:file'])

const toast = useToast()

const image = computed(() => {
  if (!file.value) return
  const image = new Image()

  image.src = URL.createObjectURL(file.value)

  return image
})

function onFileChanged(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target || !target.files) return

  const f = target.files[0]
  check(f).then(({ message, ok }) => {
    if (!ok) {
      toast.add({
        severity: 'error',
        summary: message,
        life: 3000,
        group: props.name
      })
    } else {
      emit('update:file', f)
    }
  })
}

const allowFileTypes = ['image/png', 'image/jpg']

async function check(file: File) {
  if (!allowFileTypes.some((x) => file.type == x))
    return {
      ok: false,
      message: 'wrong file format'
    }

  const { height, width } = await getWidthAndHeight(file)

  return {
    ok: height === props.height && width === props.width,
    message: 'wrong image size'
  }
}

const getWidthAndHeight = (src: File) =>
  new Promise<{
    width: number
    height: number
  }>((resolve, reject) => {
    const img = new Image()
    img.onload = () =>
      resolve({
        width: img.width,
        height: img.height
      })
    img.onerror = reject
    img.src = URL.createObjectURL(src)
  })
</script>
