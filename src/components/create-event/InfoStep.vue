<template>
  <div class="rounded-3xl bg-[#D6F6FF]">
    <form @submit="onSubmit" class="space-y-20 p-10" @keydown.enter.prevent>
      <h2 class="text-3xl">THÔNG TIN</h2>
      <h3 class="text-2xl">Thông tin sự kiện</h3>
      <div class="relative pb-24">
        <div class="absolute flex w-full justify-center">
          <img
            src="@/assets/ticket-frame.png"
            alt=""
            class="h-[calc(18rem_+_15vh)] w-[90%] rounded-3xl"
          />
        </div>
        <div class="relative grid grid-cols-12 gap-20 px-[8vw] py-[5vh]">
          <div class="col-span-4 space-y-2">
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

            <div class="flex flex-col gap-2">
              <label for="category">Thể loại sự kiện</label>
              <CategoriesTagsInput v-model:category-ids="categoryIds" />
            </div>
          </div>
          <div></div>
          <div class="col-span-7">
            <small id="description-help" class="p-error">
              {{ errors.description }}
            </small>
            <Editor
              v-model="description"
              class="h-72"
              :class="{ 'p-invalid': errors.description }"
            />
          </div>
        </div>
      </div>
      <h2 class="text-2xl">Ảnh nền sự kiện</h2>
      <div>
        <FileUploader
          name="background"
          :width="1280"
          :height="720"
          desc="Thêm ảnh nền sự kiện"
          v-model:file="backgroundImage"
        />
        <small id="backgroundImage-help" class="p-error">
          {{ backgroundImageError }}
        </small>
      </div>

      <h2 class="text-2xl">Hình ảnh của sự kiện</h2>
      <div class="flex gap-8">
        <div v-for="i in images" :key="i.index" class="w-64">
          <FileUploader
            :name="i.index.toString()"
            :width="1280"
            :height="720"
            desc="Thêm ảnh cho sự kiện"
            :file="i.file"
            @update:file="addImage(i.index ?? null, $event)"
          />
        </div>
        <div class="w-64" v-if="images.length < 5">
          <FileUploader
            :key="id"
            :name="id.toString()"
            :width="1280"
            :height="720"
            desc="Thêm ảnh cho sự kiện"
            :file="null"
            @update:file="addImage(null, $event)"
          />
        </div>
      </div>

      <h2 class="text-2xl">Logo và thông tin của ban tổ chức</h2>

      <div class="grid grid-cols-4 gap-8">
        <div>
          <FileUploader
            :file-url="organizer?.imageUrl"
            v-model:file="organizationLogoImage"
            name="organizer"
            :width="257"
            :height="257"
            desc="Thêm banner sự kiện"
          />
        </div>
        <div class="col-span-3 space-y-2 rounded-xl bg-[#0088FF] p-10">
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
import {
  CreateEvent,
  UploadAdditionalImage,
  UploadBackground,
  UploadBanner
} from '@/services/events'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import CategoriesTagsInput from './CategoriesTagsInput.vue'
import Textarea from 'primevue/textarea'
import { CreateOrganizer, UpdateOrganizer, UploadOrganizerLogo } from '@/services/organizers'
import type { BaseOrganizer } from '@/types/items'

const props = defineProps<{
  organizer?: BaseOrganizer
}>()

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

const backgroundImage = ref<File | null>(null)
const images = ref<{ index: number; file: File | null }[]>([])
const id = ref<number>(0)

function addImage(index: number | null, file: File | null) {
  if (images.value.length >= 5) return
  if (!index && !file) return
  if (!file) {
    images.value = images.value.filter((i) => i.index !== index)
    id.value++
    return
  }

  images.value.push({
    index: images.value.reduce((a, b) => Math.max(a, b.index ?? 0), 0) + 1,
    file
  })
  id.value++
}
const bannerImage = ref<File | null>(null)
const organizationLogoImage = ref<File | null>(null)
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
  validationSchema: formSchema,
  initialValues: {
    organizationName: props.organizer?.organizationName,
    organizationDesc: props.organizer?.description
  }
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
  // if (!bannerImage.value) {
  //   bannerImageError.value = 'Banner image required'
  //   return
  // }

  const promises = []

  if (props.organizer == undefined) {
    if (!organizationLogoImage.value) {
      organizationLogoImageError.value = 'Logo image required'
      return
    }

    const { data: organizerRes } = await CreateOrganizer({
      organizationName: values.organizationName,
      description: values.organizationDesc
    })

    const organizerId = organizerRes.value.organizerId
    promises.push(UploadOrganizerLogo(organizerId, organizationLogoImage.value))
  } else {
    if (
      props.organizer.organizationName != organizationName.value ||
      props.organizer.description != organizationDesc.value
    ) {
      await UpdateOrganizer(props.organizer.id, {
        organizationName: values.organizationName,
        description: values.organizationDesc
      })
    }

    if (organizationLogoImage.value != undefined) {
      promises.push(UploadOrganizerLogo(props.organizer.id, organizationLogoImage.value))
    }
  }

  const { data } = await CreateEvent({
    title: values.title,
    description: values.description,
    location: values.location,
    categoryIds: categoryIds.value
  })

  const eventId = data.value.id

  for (const image of images.value) {
    if (!image.file) continue
    promises.push(UploadAdditionalImage(eventId, image.file))
  }

  promises.push([UploadBackground(eventId, backgroundImage.value)])

  await Promise.all(promises)

  await router.push(`/organizer/events/${eventId}?tab=settings`)

  toast.add({
    summary: 'Save draft successfully',
    life: 3000
  })
})
</script>
