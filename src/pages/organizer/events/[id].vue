<template>
  <DefaultLayout>
    <div class="flex">
      <Menu :model="items" class="min-h-screen w-1 rounded-none bg-white py-5">
        <template #item="{ item, props }">
          <a
            class="align-items-center flex justify-start"
            v-bind="props.action"
            @click="item.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
      <div class="container my-20 w-full flex-1">
        <div class="h-full rounded-xl bg-white p-4">
          <Tabs :model-value="tab ?? 'orders'" v-if="event">
            <TabsContent value="orders"> <OrdersTable /> </TabsContent>
            <TabsContent value="checkins"> <CheckinsTable /></TabsContent>
            <TabsContent value="staff"> <StaffsTable :eventId /> </TabsContent>
            <TabsContent value="tickets"> <Tickets :event /> </TabsContent>
            <TabsContent value="settings"> <Settings :event /> </TabsContent>
          </Tabs>
        </div>
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
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { GetEventById, type GetEventByIdResponse } from '@/services/events'
import Menu from 'primevue/menu'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router/auto'

const route = useRoute('/organizer/create-event/[id]')
const eventId = route.params.id
const event = ref<GetEventByIdResponse>()

onMounted(() => {
  GetEventById(eventId).then((res) => (event.value = res.data.value))
})

const tab = ref()

const items = ref([
  { label: 'Orders', icon: 'pi pi-shopping-cart', action: () => (tab.value = 'orders') },
  { label: 'Check ins', icon: 'pi pi-check', action: () => (tab.value = 'checkins') },
  { label: 'Staff management', icon: 'pi pi-user-edit', action: () => (tab.value = 'staff') },
  { label: 'Tickets & Shows', icon: 'pi pi-ticket', action: () => (tab.value = 'tickets') },
  { label: 'Events settings', icon: 'pi pi-cog', action: () => (tab.value = 'settings') }
])
</script>
