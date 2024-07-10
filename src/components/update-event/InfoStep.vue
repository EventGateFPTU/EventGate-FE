<template>
  <div class="w-[80vw] rounded-3xl bg-white">
    <form @submit="onSubmit" class="space-y-20 p-10" @keydown.enter.prevent>
      <h2 class="text-3xl">THÔNG TIN SỰ KIỆN</h2>
      <FileUploader
        name="background"
        :width="1280"
        :height="720"
        desc="Thêm ảnh nền sự kiện"
        :fileUrl="event.backgroundImageUrl"
        @update:file="backgroundImage = $event"
      />

      <div class="grid grid-cols-4 gap-8">
        <FileUploader
          name="banner"
          :width="720"
          :height="958"
          desc="Thêm banner sự kiện"
          :fileUrl="event.bannerImageUrl"
          @update:file="bannerImage = $event"
        />
        <div class="col-span-3 space-y-2">
          <div class="flex flex-col gap-4">
            <label for="title">Tên sự kiện</label>
            <InputText
              v-model="title"
              placeholder="Tên sự kiện"
              :class="{ 'p-invalid': errors.title }"
            />
            <small id="title-help" class="p-error">
              {{ errors.title }}
            </small>
          </div>

          <div class="flex flex-col gap-4">
            <label for="address">Địa điểm sự kiện</label>
            <InputText
              v-model="location"
              placeholder="Địa điểm sự kiện"
              :class="{ 'p-invalid': errors.location }"
            />
            <small id="location-help" class="p-error">
              {{ errors.location }}
            </small>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label for="category">Thể loại sự kiện</label>
          <CategoriesTagsInput :categories="event.categories" v-model:category-ids="categoryIds" />
        </div>

        <div>
          <small id="description-help" class="p-error">
            {{ errors.description }}
          </small>
          <Editor v-model="description" class="h-72" :class="{ 'p-invalid': errors.description }" />
        </div>
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
        <Button type="submit" class="flex justify-center">Save</Button>
        <Button class="col-span-2 flex justify-center" @click="nextStep">Next</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FileUploader } from '@/components/file-upload'
import {
  UpdateEvent,
  UploadBackground,
  UploadBanner,
  type GetEventByIdResponse
} from '@/services/events'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { ref, watchEffect } from 'vue'
import * as z from 'zod'
import CategoriesTagsInput from './CategoriesTagsInput.vue'
import { EventStatus } from '@/types/enums'

const props = defineProps<{
  event: GetEventByIdResponse
  nextStep: () => void
}>()

const categoryIds = ref<string[]>([])

const toast = useToast()

const formSchema = toTypedSchema(
  z.object({
    title: z.string().max(256),
    location: z.string().max(256),
    description: z.string().max(8192)
  })
)

const backgroundImage = ref<File | null>()
const bannerImage = ref<File | null>()
watchEffect(() => {
  if (backgroundImage.value) backgroundImageError.value = undefined
})
watchEffect(() => {
  if (bannerImage.value) bannerImageError.value = undefined
})
const backgroundImageError = ref<string>()
const bannerImageError = ref<string>()

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: props.event?.title,
    description: props.event?.description,
    location: props.event?.location
  }
})

const [title] = defineField('title')
const [location] = defineField('location')
const [description] = defineField('description')

const onSubmit = handleSubmit(async (values) => {
  await UpdateEvent(props.event.id, {
    title: values.title,
    description: values.description,
    location: values.location,
    status: EventStatus.Draft,
    categoryIds: categoryIds.value
  })

  const eventId = props.event.id

  const promises = []
  if (backgroundImage.value) promises.push(UploadBackground(eventId, backgroundImage.value))
  if (bannerImage.value) promises.push(UploadBanner(eventId, bannerImage.value))

  await Promise.all(promises)

  toast.add({
    summary: 'Save draft successfully',
    life: 3000
  })
})
</script>
