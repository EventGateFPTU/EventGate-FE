<template>
  <div class="w-[80vw] rounded-3xl bg-white">
    <form @submit="onSubmit" class="space-y-20 p-10" @keydown.enter.prevent>
      <h2 class="text-3xl">THÔNG TIN SỰ KIỆN</h2>
      <div>
        <FileUploader
          name="background"
          :width="1280"
          :height="720"
          desc="Thêm ảnh nền sự kiện"
          @update:file="backgroundImage = $event"
        />
        <small id="backgroundImage-help" class="p-error">
          {{ backgroundImageError }}
        </small>
      </div>

      <div class="grid grid-cols-4 gap-8">
        <div>
          <FileUploader
            name="banner"
            :width="720"
            :height="958"
            desc="Thêm banner sự kiện"
            @update:file="bannerImage = $event"
          />
          <small id="bannerImage-help" class="p-error">
            {{ bannerImageError }}
          </small>
        </div>
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
          <CategoriesTagsInput v-model:category-ids="categoryIds" />
        </div>

        <div>
          <small id="description-help" class="p-error">
            {{ errors.description }}
          </small>
          <Editor v-model="description" class="h-72" :class="{ 'p-invalid': errors.description }" />
        </div>
      </div>

      <div class="grid grid-cols-4 gap-8">
        <FileUploader
          @update:file="organizationLogoImage = $event"
          name="organizer"
          :width="257"
          :height="257"
          desc="Thêm banner sự kiện"
        />
        <div class="col-span-3 space-y-2">
          <div class="flex flex-col gap-4">
            <label for="organizationName">Tên ban tổ chức</label>
            <InputText
              v-model="organizationName"
              id="organizationName"
              placeholder="Tên ban tổ chức"
              :class="{ 'p-invalid': errors.organizationName }"
            />
            <small id="organizationName-help" class="p-error">
              {{ errors.organizationName }}
            </small>
          </div>

          <div class="flex flex-col gap-4">
            <label for="organizationDesc">Thông tin ban tổ chức</label>
            <Textarea
              v-model="organizationDesc"
              id="organizationDesc"
              placeholder="Thông tin ban tổ chức"
              class="h-[10rem] flex-grow"
              :class="{ 'p-invalid': errors.organizationDesc }"
            />
            <small id="organizationDesc-help" class="p-error">
              {{ errors.organizationDesc }}
            </small>
          </div>
        </div>
      </div>

      <Button type="submit" class="flex w-full justify-center">Save</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FileUploader } from '@/components/file-upload'
import { CreateEvent, UploadBackground, UploadBanner } from '@/services/events'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import CategoriesTagsInput from './CategoriesTagsInput.vue'
import Textarea from 'primevue/textarea'
import { CreateOrganizer, UploadOrganizerLogo } from '@/services/organizers'

const categoryIds = ref<string[]>([])

const toast = useToast()
const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    title: z.string().max(256),
    location: z.string().max(256),
    description: z.string().max(8192),
    organizationName: z.string().max(256),
    organizationDesc: z.string().max(8192)
  })
)

const backgroundImage = ref<File | null>()
const bannerImage = ref<File | null>()
const organizationLogoImage = ref<File | null>()
watchEffect(() => {
  if (backgroundImage.value) backgroundImageError.value = undefined
})
watchEffect(() => {
  if (bannerImage.value) bannerImageError.value = undefined
})
watchEffect(() => {
  if (organizationLogoImage.value) organizationLogoImageError.value = undefined
})
const backgroundImageError = ref<string>()
const bannerImageError = ref<string>()
const organizationLogoImageError = ref<string>()

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema
})

const [title] = defineField('title')
const [location] = defineField('location')
const [description] = defineField('description')
const [organizationName] = defineField('organizationName')
const [organizationDesc] = defineField('organizationDesc')

const onSubmit = handleSubmit(async (values) => {
  if (!backgroundImage.value) {
    backgroundImageError.value = 'Background image required'
    return
  }
  if (!bannerImage.value) {
    bannerImageError.value = 'Banner image required'
    return
  }
  if (!organizationLogoImage.value) {
    organizationLogoImageError.value = 'Logo image required'
    return
  }

  const { data } = await CreateEvent({
    title: values.title,
    description: values.description,
    location: values.location,
    categoryIds: categoryIds.value
  })

  const eventId = data.value.id

  const { data: organizerRes } = await CreateOrganizer({
    organizationName: values.organizationName,
    description: values.organizationDesc,
    imageUrl: ''
  })

  const organizerId = organizerRes.value.organizerId

  await Promise.all([
    UploadOrganizerLogo(organizerId, organizationLogoImage.value),
    UploadBackground(eventId, backgroundImage.value),
    UploadBanner(eventId, bannerImage.value)
  ])

  await router.push(`/organizer/create-event/${eventId}`)

  toast.add({
    summary: 'Save draft successfully',
    life: 3000
  })
})
</script>
