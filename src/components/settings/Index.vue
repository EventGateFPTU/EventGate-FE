<template>
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
    <p class="text-muted-foreground">Manage your event.</p>
  </div>
  <Divider />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SidebarNav v-model:value="tab" />
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <div class="space-y-6">
        <Tabs :model-value="tab ?? 'Information'">
          <TabsContent value="Information">
            <InformationSettings :event />
          </TabsContent>
          <TabsContent value="Visibility">
            <div class="flex h-full">
              <div class="flex flex-col gap-2">
                <label>Publish event</label>
                <Button @click="publishEvent">Publish</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import Divider from 'primevue/divider'
import { computed, ref } from 'vue'
import InformationSettings from './InformationSettings.vue'
import SidebarNav from './SidebarNav.vue'
import { UpdateEvent, type GetEventByIdResponse } from '@/services/events'
import { EventStatus, eventStatusToNumber } from '@/types/enums'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps<{
  event: GetEventByIdResponse
}>()

const confirm = useConfirm()
const toast = useToast()
const tab = ref()

const publishEvent = () => {
  confirm.require({
    message: 'Are you sure you want to publish this event?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    accept: () => {
      UpdateEvent(props.event.id, {
        categoryIds: props.event.categories.map((x) => x.id),
        title: props.event.title,
        description: props.event.description,
        location: props.event.location,
        status: eventStatusToNumber(EventStatus.Published)
      }).then(() => {
        toast.add({ detail: 'Publish event successfully', life: 3000 })
      })
    },
    reject: () => {}
  })
}
</script>
