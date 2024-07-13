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
          <TabsContent value="Visibility"> dsaf </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
import Divider from 'primevue/divider'
import { computed, ref } from 'vue'
import InformationSettings from './InformationSettings.vue'
import SidebarNav from './SidebarNav.vue'
import type { GetEventByIdResponse } from '@/services/events'

const props = defineProps<{
  event: GetEventByIdResponse
}>()

const tab = ref()
</script>
