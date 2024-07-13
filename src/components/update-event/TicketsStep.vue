<template>
  <div class="w-[80vw] space-y-20 rounded-3xl bg-white p-10">
    <h2 class="text-3xl">THỜI GIAN & LOẠI VÉ</h2>

    <div class="space-y-4">
      <ShowPanel
        v-for="show in shows"
        :isNew="false"
        :key="show.id"
        :show
        @hasError="check(show.id, $event)"
        @remove:show="DeleteShow(show.id).then(() => refetch())"
      />

      <ShowPanel
        v-for="(show, index) in showsToAdd"
        :isNew="true"
        :key="show.id"
        :show
        @hasError="check(show.id, $event)"
        @remove:show="showsToAdd.splice(index, 1)"
      />
    </div>

    <Button
      class="flex w-full justify-center border-dashed bg-inherit text-inherit hover:border-none hover:bg-[#10b981] hover:text-white"
      @click="
        showsToAdd.push({ id: cur++, endsAt: undefined, startsAt: undefined, ticketTypeIds: [] })
      "
    >
      + Tạo suất diễn
    </Button>

    <small class="p-error">
      {{ hasError ? 'Please fill in all the fields' : null }}
    </small>

    <div class="grid grid-cols-3 gap-4">
      <Button class="flex justify-center" :disabled="hasError" @click="save">Save</Button>
      <Button class="col-span-2 flex justify-center" @click="nextStep">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'
import { CreateShow, DeleteShow, GetEventShows } from '@/services/shows'
import type { BaseEvent, BaseShow } from '@/types/items'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'
import ShowPanel from './ShowPanel.vue'

const props = defineProps<{
  event: BaseEvent
  nextStep: () => void
}>()

const toast = useToast()

const eventId = computed(() => props.event.id)
const { pageNumber, pageSize } = usePagination(1, 5)

type ShowToAdd = {
  id: number
  startsAt?: Date
  endsAt?: Date
  ticketTypeIds: string[]
}
const shows = ref<BaseShow[]>([])
const showsToAdd = ref<ShowToAdd[]>([])
let cur = 0
const errors = ref<
  {
    id: string | number
    hasError: boolean
  }[]
>([])

const hasError = computed(() => errors.value.findIndex((x) => x.hasError) > -1)

const check = (id: string | number, val: boolean) => {
  const err = errors.value.find((x) => x.id == id)
  if (!err)
    errors.value.push({
      id: id,
      hasError: val
    })
  else {
    err.hasError = val
  }
}

onMounted(() => refetch())

const refetch = () => {
  GetEventShows(props.event.id, pageNumber.value, pageSize.value).then(({ data }) => {
    shows.value = data.value.data
  })
}

async function save() {
  const promises = []
  for (const showToAdd of showsToAdd.value) {
    promises.push(
      CreateShow({
        eventId: props.event.id,
        title: 'afds',
        startsAt: showToAdd.startsAt!,
        endsAt: showToAdd.endsAt!
      })
    )
  }

  await Promise.all(promises)

  toast.add({
    summary: 'Save draft successfully',
    life: 3000
  })
}

// const { fetchShowsSuccess, refetchShows, showsRes } = useShows(eventId)

// function useShows(eventId: MaybeRef<string>) {
//   const { pageNumber, pageSize } = usePagination(1, 5)

//   const {
//     data: showsRes,
//     isSuccess: fetchShowsSuccess,
//     refetch: refetchShows
//   } = useQuery({
//     queryKey: ['shows', { pageNumber, pageSize, eventId }],
//     queryFn: () => query(GetEventShows(unref(eventId), pageNumber.value, pageSize.value))
//   })

//   return {
//     showsRes,
//     fetchShowsSuccess,
//     refetchShows
//   }
// }
</script>
