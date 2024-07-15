<template>
  <DefaultLayout>
    <div class="flex justify-center">
      <div class="container mt-20 h-[50vh] rounded-xl bg-white pt-8">
        <TabView>
          <TabPanel header="Events">
            <DataTable :value="events" tableStyle="min-width: 50rem">
              <Column field="title" header="Name"></Column>
              <Column field="location" header="Location"></Column>
              <Column field="status" header="Status">
                <template #body="{ data }">
                  <Chip class="px-3 py-1">
                    <span class="font-medium">{{ data.status }}</span>
                  </Chip>
                </template>
              </Column>
              <Column header="Actions">
                <template #body="{ data }">
                  <Button @click="$router.push(`/staff/events/${data.id}`)">Manage</Button>
                </template>
              </Column>
              <template #empty><p>You have no events yet</p></template>
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TabView from 'primevue/tabview'
import Button from 'primevue/button'
import TabPanel from 'primevue/tabpanel'
import { onMounted, ref } from 'vue'
import type { BaseEvent } from '@/types/items'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { GetOrganizerEvents } from '@/services/organizers'

const events = ref<BaseEvent[]>([])

onMounted(() => GetOrganizerEvents().then((res) => (events.value = res.data.value)))
</script>
