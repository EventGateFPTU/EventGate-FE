<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <div class="flex items-end gap-2">
        <div class="flex flex-1 flex-wrap items-center gap-x-2 rounded-md border px-2">
          <Badge
            v-for="category in categories"
            :key="category.id"
            class="flex items-center gap-x-1 rounded-sm"
          >
            <span>
              {{ category.name }}
            </span>
            <X class="size-4 hover:cursor-pointer" @click="select(category)" />
          </Badge>
          <Input
            type="text"
            placeholder="Thể loại sự kiện"
            v-model="searchTerm"
            @update:model-value="() => searchFn()"
            @keydown.enter="addCategory(searchTerm)"
            class="min-w-20 flex-1 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent class="min-w-max" align="start" as-child>
      <Command class="p-0">
        <CommandEmpty>No categories found</CommandEmpty>
        <CommandList v-if="fetchCategoriesSuccess">
          <CommandGroup>
            <CommandItem
              v-for="category in categoriesRes!.data"
              :key="category.id"
              :value="category"
              @select="select(category)"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    categories.findIndex((x) => x.id === category.id) !== -1
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
              {{ category.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { usePagination } from '@/composables/usePagination'
import { query } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { CreateCategory, GetCategories } from '@/services/categories'
import type { EventCategory } from '@/types/items'
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { Check, X } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { Badge } from '../ui/badge'
import Input from '../ui/input/Input.vue'

const props = defineProps<{
  categoryIds: string[]
  categories?: EventCategory[]
}>()
const emit = defineEmits(['update:categoryIds'])
const categories = ref<EventCategory[]>(props.categories ?? [])

const categoryIds = ref<string[]>(props.categories?.map((x) => x.id) ?? props.categoryIds)
watchEffect(() => emit('update:categoryIds', categoryIds.value))

watchEffect(() => {
  categoryIds.value = categories.value.map((x) => x.id)
})

const open = ref(false)

const { categoriesRes, fetchCategoriesSuccess, refetchCategories, createCategory, searchTerm } =
  useCategories()

const searchFn = useDebounceFn(refetchCategories, 400)

function select(value: EventCategory) {
  const index = categories.value.findIndex((x) => x.id === value.id)
  if (index !== -1) {
    categories.value.splice(index, 1)
  } else {
    categories.value.push(value)
    open.value = false
  }
}

async function addCategory(name?: string) {
  if (!name) return
  const created = await createCategory(name)
  categories.value.push(created)
  searchTerm.value = ''
}

function useCategories() {
  const { pageNumber, pageSize } = usePagination(1, 5)
  const searchTerm = ref<string>()

  const {
    data: categoriesRes,
    isSuccess: fetchCategoriesSuccess,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ['categories', { pageNumber, pageSize }],
    queryFn: () => query(GetCategories(pageNumber.value, pageSize.value, searchTerm.value))
  })

  async function createCategory(name: string) {
    const { data } = await CreateCategory(name)
    return data.value
  }

  return {
    categoriesRes,
    fetchCategoriesSuccess,
    searchTerm,

    refetchCategories,
    createCategory
  }
}
</script>
