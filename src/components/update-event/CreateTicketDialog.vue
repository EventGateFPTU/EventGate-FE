<template>
  <Dialog v-model:visible="visible" modal header="Tạo loại vé" class="w-[70vw]">
    <form class="space-y-8">
      <div class="flex flex-col">
        <label id="name" class="font-semibold">Name</label>
        <InputText v-model="name" :class="{ 'p-invalid': errors.name }" />
        <small id="name-help" class="p-error">
          {{ errors.name }}
        </small>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div class="flex flex-col">
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
              <p>Free</p>
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
          <label id="amount" class="font-semibold">Số vé tối thiểu trong một đơn hàng</label>
          <InputNumber v-model="amount" :class="{ 'p-invalid': errors.amount }" />
          <small id="amount-help" class="p-error">
            {{ errors.amount }}
          </small>
        </div>
        <div class="flex flex-col">
          <label id="amount" class="font-semibold">Số vé tối đa trong một đơn hàng</label>
          <InputNumber v-model="amount" :class="{ 'p-invalid': errors.amount }" />
          <small id="amount-help" class="p-error">
            {{ errors.amount }}
          </small>
        </div>
      </div>

      <div>
        <h3 class="font-semibold">Thời gian bán vé</h3>

        <div class="space-x-4">
          <div class="space-x-2">
            <label id="amount" class="font-semibold">Số vé tối đa trong một đơn hàng</label>
          </div>
          <div class="space-x-2">
            <label id="amount" class="font-semibold">Số vé tối đa trong một đơn hàng</label>
          </div>
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().max(256),
    description: z.string().max(256).optional(),
    price: z.number(),
    fromDate: z.date(),
    toDate: z.date(),
    amount: z.number()
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
</script>
