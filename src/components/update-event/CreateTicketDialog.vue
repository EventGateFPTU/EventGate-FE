<template>
  <Dialog v-model:visible="visible" modal header="Tạo loại vé" class="w-[70vw]">
    <form @submit="onSubmit" class="space-y-8" @keydown.enter.prevent>
      <div class="flex flex-col">
        <label id="name" class="font-semibold">Name</label>
        <InputText v-model="name" :class="{ 'p-invalid': errors.name }" />
        <small id="name-help" class="p-error">
          {{ errors.name }}
        </small>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-1 flex-col">
          <label id="price" class="font-semibold">Giá vé</label>
          <div class="flex items-center gap-4">
            <div>
              <InputNumber
                v-model="price"
                :disabled="checked"
                :class="{ 'p-invalid': errors.price }"
              />
              <small id="price-help" class="p-error">
                {{ errors.price }}
              </small>
            </div>
            <div class="flex w-max flex-1 items-center gap-4">
              <Checkbox v-model="checked" :binary="true" />
              <div>Free</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <label id="amount" class="font-semibold">Tổng số lượng vé</label>
          <InputNumber v-model="amount" :class="{ 'p-invalid': errors.amount }" />
          <small id="amount-help" class="p-error">
            {{ errors.amount }}
          </small>
        </div>
        <div class="flex flex-col">
          <label id="leastAmountBuy" class="font-semibold"
            >Số vé tối thiểu trong một đơn hàng</label
          >
          <InputNumber v-model="leastAmountBuy" :class="{ 'p-invalid': errors.leastAmountBuy }" />
          <small id="leastAmountBuy-help" class="p-error">
            {{ errors.leastAmountBuy }}
          </small>
        </div>
        <div class="flex flex-col">
          <label id="mostAmountBuy" class="font-semibold">Số vé tối đa trong một đơn hàng</label>
          <InputNumber v-model="mostAmountBuy" :class="{ 'p-invalid': errors.mostAmountBuy }" />
          <small id="mostAmountBuy-help" class="p-error">
            {{ errors.mostAmountBuy }}
          </small>
        </div>
      </div>

      <div>
        <h3 class="font-semibold">Thời gian bán vé</h3>

        <div class="flex items-center gap-4">
          <div class="space-x-2">
            <label id="fromDate">Thời gian bắt đầu bán vé</label>
            <Calendar v-model="fromDate" :class="{ 'p-invalid': errors.fromDate }" />
          </div>
          <div class="space-x-2">
            <label id="toDate">Thời gian kết thúc bán vé</label>
            <Calendar v-model="toDate" :class="{ 'p-invalid': errors.toDate }" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 space-y-2">
          <label id="description" class="font-semibold">Thông tin vé</label>
          <div class="">
            <Textarea
              v-model="description"
              :class="{ 'p-invalid': errors.description }"
              class="min-h-64 w-full"
            />
            <small id="description-help" class="p-error">
              {{ errors.description }}
            </small>
          </div>
        </div>
        <div class="space-y-2">
          <label id="image" class="font-semibold">Hình ảnh vé</label>
          <FileUploader name="Logo" desc="" :width="275" :height="275" />
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <Button type="button" severity="secondary" @click="visible = false">Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import Textarea from 'primevue/textarea'
import { FileUploader } from '../file-upload'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'
import { CreateTicketType } from '@/services/ticketTypes'

const props = defineProps<{
  visible: boolean
  showId: string
  isNew: boolean
  eventId: string
}>()

const emit = defineEmits(['update:visible', 'submit'])

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().max(256),
    description: z.string().max(256),
    price: z.number(),
    fromDate: z.date(),
    toDate: z.date(),
    amount: z.number(),
    leastAmountBuy: z.number(),
    mostAmountBuy: z.number()
  })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema
})

const [name] = defineField('name')
const [description] = defineField('description')
const [fromDate] = defineField('fromDate')
const [toDate] = defineField('toDate')
const [price] = defineField('price')
const checked = ref(false)
const [amount] = defineField('amount')
const [leastAmountBuy] = defineField('leastAmountBuy')
const [mostAmountBuy] = defineField('mostAmountBuy')

const onSubmit = handleSubmit(async (values) => {
  const showIds = []
  if (!props.isNew) showIds.push(props.showId)
  const { data } = await CreateTicketType({
    eventId: props.eventId,
    showId: showIds,
    name: values.name,
    description: values.description,
    amount: values.amount,
    fromDate: values.fromDate,
    toDate: values.toDate,
    price: values.price,
    leastAmountBuy: values.leastAmountBuy,
    mostAmountBuy: values.mostAmountBuy,
    imageUrl: 'afs'
  })

  emit('submit', data.value)
})
</script>
