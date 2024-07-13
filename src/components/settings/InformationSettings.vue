<template>
  <form @submit="submit" @keydown.enter.prevent>
    <div class="flex flex-col gap-4">
      <label class="text-lg font-semibold" for="title">Title</label>
      <InputText v-model="title" placeholder="Title" :class="{ 'p-invalid': errors.title }" />
      <small id="title-help" class="p-error">
        {{ errors.title }}
      </small>
    </div>

    <div class="flex flex-col gap-4">
      <label class="text-lg font-semibold" for="address">Location</label>
      <InputText
        v-model="location"
        placeholder="Location"
        :class="{ 'p-invalid': errors.location }"
      />
      <small id="location-help" class="p-error">
        {{ errors.location }}
      </small>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-lg font-semibold" for="category">Event categories</label>
      <CategoriesTagsInput v-model:category-ids="categoryIds" :categories="event.categories" />
    </div>

    <div class="space-y-3 pb-10 pt-4">
      <label class="text-lg font-semibold" for="description">Description</label>
      <div>
        <small id="description-help" class="p-error">
          {{ errors.description }}
        </small>
        <Editor v-model="description" class="h-64" :class="{ 'p-invalid': errors.description }" />
      </div>
    </div>

    <div class="space-x-4 pt-6">
      <Button type="submit" size="small">Update event</Button>
      <Button outlined size="small">Reset form</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { UpdateEvent, type GetEventByIdResponse } from '@/services/events'
import { toTypedSchema } from '@vee-validate/zod'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as z from 'zod'
import CategoriesTagsInput from '../update-event/CategoriesTagsInput.vue'
import { EventStatus, eventStatusToNumber } from '@/types/enums'
import Editor from 'primevue/editor'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  event: GetEventByIdResponse
}>()

const toast = useToast()

const categoryIds = ref<string[]>([])

onMounted(() => (categoryIds.value = props.event.categories.map((x) => x.id)))

const formSchema = toTypedSchema(
  z.object({
    title: z.string().max(256),
    location: z.string().max(256),
    description: z.string().max(8192)
  })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: props.event.title,
    description: props.event.description,
    location: props.event.location
  }
})

const [title] = defineField('title')
const [location] = defineField('location')
const [description] = defineField('description')

const submit = handleSubmit(async (values) => {
  await UpdateEvent(props.event.id, {
    categoryIds: categoryIds.value,
    title: values.title,
    description: values.description,
    location: values.location,
    status: eventStatusToNumber(props.event.status)
  })

  toast.add({
    summary: 'Update event successfully',
    life: 3000
  })
})
</script>
