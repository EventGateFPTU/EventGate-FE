<template>
  <DefaultLayout :has-footer="false">
    <div>
      <div class="flex h-[30vh] w-full justify-center gap-6 bg-gray-800 py-10">
        <!-- <img :src="globalStore.event?.backgroundImageUrl" alt="" class="h-full" /> -->
        <div class="container text-white">
          <h1 class="text-4xl">{{ event?.title }}</h1>
          <Divider />
          <div class="flex flex-col gap-3">
            <div class="flex items-baseline gap-4">
              <i class="pi pi-map-marker"></i>
              <p>{{ event?.location }}</p>
            </div>
            <div class="flex items-baseline gap-4">
              <i class="pi pi-calendar"></i>
              <p>
                {{ getHeader(ticketType?.fromDate!, ticketType?.toDate!) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full justify-center pb-40 pt-8">
        <div class="container space-y-8">
          <h2 class="text-3xl font-semibold text-white">QUESTION FORM</h2>
          <form class="grid grid-cols-4 gap-6" @submit="onSubmit">
            <div class="col-span-3 h-full rounded-2xl bg-slate-800 p-4 text-white">
              <h3 class="text-2xl">{{ ticketType?.name }}</h3>
              <div class="flex flex-col gap-4">
                <label for="email">Email</label>
                <InputText
                  v-model="email"
                  placeholder="Email"
                  :class="{ 'p-invalid': errors.email }"
                />
                <small id="email-help" class="p-error">
                  {{ errors.email }}
                </small>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-4">
                  <label for="firstName">First Name</label>
                  <InputText
                    v-model="firstName"
                    placeholder="First name"
                    :class="{ 'p-invalid': errors.firstName }"
                  />
                  <small id="firstName-help" class="p-error">
                    {{ errors.firstName }}
                  </small>
                </div>
                <div class="flex flex-col gap-4">
                  <label for="lastName">Last name</label>
                  <InputText
                    v-model="lastName"
                    placeholder="Last name"
                    :class="{ 'p-invalid': errors.lastName }"
                  />
                  <small id="lastName-help" class="p-error">
                    {{ errors.lastName }}
                  </small>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-2 flex flex-col gap-4">
                  <label for="phoneNumber">Phone number</label>
                  <InputText
                    v-model="phoneNumber"
                    placeholder="Phone number"
                    :class="{ 'p-invalid': errors.phoneNumber }"
                  />
                  <small id="phoneNumber-help" class="p-error">
                    {{ errors.phoneNumber }}
                  </small>
                </div>

                <div class="flex flex-col items-baseline gap-4">
                  <label for="startsAt">Date of birth</label>
                  <div class="flex flex-col">
                    <Calendar v-model="dateOfBirth" dateFormat="dd/mm/yy" showIcon />
                    <small id="dateOfBirth-help" class="p-error">
                      {{ errors.dateOfBirth }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="relative z-10 flex max-h-min flex-col rounded-2xl bg-white p-4">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-2xl">Ticket information</h3>
                  </div>
                  <div class="flex justify-between pt-2">
                    <p class="font-bold">Ticket type</p>
                    <p class="font-bold">Amount</p>
                  </div>

                  <div class="pt-3">
                    <div class="flex justify-between">
                      <p>{{ ticketType?.name }}</p>
                      <p>01</p>
                    </div>
                    <div class="flex justify-between">
                      <p>
                        {{ Math.round((ticketType?.price! + Number.EPSILON) * 100) / 100 }}
                        đ
                      </p>
                      <p>
                        {{ Math.round((ticketType?.price! + Number.EPSILON) * 100) / 100 }}
                        đ
                      </p>
                    </div>
                  </div>

                  <Divider type="dashed" style="border-color: black" />

                  <div class="flex justify-between">
                    <p class="font-bold">Total</p>
                    <p class="text-primary">
                      {{ Math.round((ticketType?.price! + Number.EPSILON) * 100) / 100 }}
                      đ
                    </p>
                  </div>
                </div>

                <div class="mt-auto flex w-full justify-end">
                  <Button type="submit" class="mt-10">Continue</Button>
                </div>
              </div>
              <div
                class="relative flex items-center justify-end gap-4 p-4 transition-all duration-1000"
                :class="{
                  '-translate-y-28': !orderCreated
                }"
              >
                <span class="text-xl font-semibold text-white">Tui em xin loi thay</span>
                <Button type="button" @click="confirmPaid">Magic</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import useGlobalStore from '@/stores/useGlobalStore'
import { useRoute, useRouter } from 'vue-router'
import { getHeader } from '@/utils/date'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Calendar from 'primevue/calendar'
import { useForm } from 'vee-validate'
import { ConfirmPaid, CreateOrder } from '@/services/orders'
import { onMounted, ref } from 'vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { GetTicketTypeById } from '@/services/ticketTypes'
import type { BaseTicketType } from '@/types/items'
import { useToast } from 'primevue/usetoast'

const route = useRoute('/events/[id]/buy-ticket/[ticketId]')
const event = ref<GetEventByIdResponse>()
const ticketType = ref<BaseTicketType>()
const toast = useToast()
const orderCreated = ref<boolean>(false)

onMounted(() => {
  GetEventById(route.params.id).then(({ data }) => (event.value = data.value))
  GetTicketTypeById(route.params.ticketId).then(({ data }) => (ticketType.value = data.value))
})

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().max(256),
    firstName: z.string().max(256),
    lastName: z.string().max(256),
    phoneNumber: z.string().regex(/^(?:\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/),
    dateOfBirth: z.date()
  })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema
})

const [email] = defineField('email')
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [phoneNumber] = defineField('phoneNumber')
const [dateOfBirth] = defineField('dateOfBirth')

const orderId = ref()
const onSubmit = handleSubmit((values) => {
  if (!ticketType.value) return
  CreateOrder({
    ...values,
    ticketTypeId: ticketType.value.id
  }).then(({ data }) => {
    if (!data.isSuccess) return
    orderCreated.value = true
    orderId.value = data.value.id
    toast.add({
      detail: 'Order successfully created',
      life: 3000
    })
  })
})

const confirmPaid = () => {
  if (!orderId.value) return

  ConfirmPaid(orderId.value)
  toast.add({
    detail: 'Order paid!',
    life: 3000
  })
}
</script>
