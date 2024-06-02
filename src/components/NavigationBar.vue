<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import 'primeicons/primeicons.css'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Events',
    icon: 'pi pi-calendar'
  }
])

const emit = defineEmits(['search'])
function search(e: Event) {
  e.preventDefault()
  // console.log(e.target);
  emit('search', e)
}
</script>

<template>
  <Menubar class="flex h-48 w-screen flex-row justify-around shadow-sm" :model="items">
    <!-- start -->
    <template #start>
      <img fill="none" src="@/assets/logo.png" class="m-auto w-48" />
    </template>
    <!-- middle -->
    <template #itemicon="{ item }">
      <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="align-items-center flex" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="border-1 surface-border border-round surface-100 ml-auto p-1 text-xs"
          >{{ item.shortcut }}</span
        >
      </a>
    </template>
    <!-- end -->
    <template #end>
      <div class="mr-6 flex flex-row justify-around">
        <div class="card flex h-10 flex-row items-center justify-around">
          <form
            class="flex h-full flex-row items-center justify-end"
            v-on:submit="(e) => search(e)"
          >
            <!-- <InputText type="text" /> -->
            <input class="relative h-full" type="text" placeholder="Enter" />
            <Button class="absolute" type="submit">
              <i class="pi pi-search"></i>
            </Button>
          </form>
        </div>
        <button
          v-ripple
          class="p-link text-color hover:surface-200 ml-4 flex w-full flex-row items-center justify-end overflow-hidden"
        >
          <Avatar image="/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
          <span class="m-auto inline-flex">
            <span class="font-bold">PersieDaGamer</span>
          </span>
        </button>
      </div>
    </template></Menubar
  >
</template>
