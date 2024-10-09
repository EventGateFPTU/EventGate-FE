<template>
  <DefaultLayout>
    <div class="flex items-start">
      <Menu :model="items" class="min-h-screen w-1 rounded-none bg-white py-5">
        <template #item="{ item, props }">
          <a
            class="align-items-center flex justify-start"
            v-bind="props.action"
            @click="
              () => {
                item.action()
                urlSearchParams.tab = item.value
              }
            "
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
      <div class="w-full flex-1">
        <Tabs :model-value="tab ?? urlSearchParams.tab" v-if="event">
          <div class="container min-h-[50%] rounded-xl bg-white">
            <TabsContent value="orders">
              <div class="my-20 p-4">
                <OrdersTable :eventId />
              </div>
            </TabsContent>
            <TabsContent value="checkins">
              <div class="my-20 p-4">
                <CheckinsTable />
              </div>
            </TabsContent>
            <TabsContent value="staff">
              <div class="my-20 p-4">
                <StaffsTable :eventId />
              </div>
            </TabsContent>
            <TabsContent value="tickets">
              <div class="my-20 p-4">
                <Tickets :event />
              </div>
            </TabsContent>
          </div>
          <TabsContent value="settings">
            <UpdateEventForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { CheckinsTable } from '@/components/checkins'
import { OrdersTable } from '@/components/orders'
import { Settings } from '@/components/settings'
import { StaffsTable } from '@/components/staffs'
import { Tickets } from '@/components/tickets'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { UpdateEventForm } from '@/components/update-event'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import { useUrlSearchParams } from '@vueuse/core'
import Menu from 'primevue/menu'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router/auto'

const route = useRoute('/organizer/create-event/[id]')
const eventId = route.params.id
const event = ref<GetEventByIdResponse>()
const urlSearchParams = useUrlSearchParams<{
  tab?: string
}>()

onMounted(() => {
  GetEventById(eventId).then((res) => (event.value = res.data.value))
  tab.value = urlSearchParams.tab
})

const tab = ref()

const items = ref([
  {
    label: 'Orders',
    icon: 'pi pi-shopping-cart',
    action: () => (tab.value = 'orders'),
    value: 'orders'
  },
  {
    label: 'Check ins',
    icon: 'pi pi-check',
    action: () => (tab.value = 'checkins'),
    value: 'checkins'
  },
  {
    label: 'Staff management',
    icon: 'pi pi-user-edit',
    action: () => (tab.value = 'staff'),
    value: 'staff'
  },
  {
    label: 'Tickets & Shows',
    icon: 'pi pi-ticket',
    action: () => (tab.value = 'tickets'),
    value: 'tickets'
  },
  {
    label: 'Events settings',
    icon: 'pi pi-cog',
    action: () => (tab.value = 'settings'),
    value: 'settings'
  }
])
</script>
