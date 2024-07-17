<template>
  <DefaultLayout>
    <div class="flex justify-center pt-20">
      <div class="container rounded-lg bg-white pt-10">
        <h2 class="text-2xl font-semibold">Vé đã mua</h2>
        <Divider />

        <TabView>
          <TabPanel header="Tất cả"> </TabPanel>
          <TabPanel header="Thành công"> </TabPanel>
          <TabPanel header="Đang xử lý"> </TabPanel>
          <TabPanel header="Đã hủy"> </TabPanel>
        </TabView>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { useQuery } from '@tanstack/vue-query'
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { GetUserTickets } from '@/services/users'

const { pageNumber, pageSize } = usePagination()
const { data, isSuccess } = useQuery({
  queryKey: ['tickets', { pageNumber, pageSize }],
  queryFn: () => query(GetUserTickets(pageNumber.value, pageSize.value))
})
</script>
