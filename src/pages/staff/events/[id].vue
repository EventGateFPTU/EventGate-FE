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
        <div class="min-h-[50%] rounded-xl bg-white p-4">
          <Tabs :model-value="tab ?? 'orders'" v-if="event">
            <TabsContent value="tickets">
              <Tickets :event />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { Tickets } from '@/components/staffTickets'
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
  { label: 'Tickets & Shows', icon: 'pi pi-ticket', action: () => (tab.value = 'tickets') }
])
</script>
