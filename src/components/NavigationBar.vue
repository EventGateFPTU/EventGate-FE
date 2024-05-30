<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import 'primeicons/primeicons.css'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    items: [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'About',
        icon: 'pi pi-home'
      }
    ]
  },
  {
    label: 'Feature',
    icon: 'pi pi-home'
  },
  {
    label: 'About',
    icon: 'pi pi-home'
  }
])

const emit = defineEmits(['search'])
function search(e:Event) {
  e.preventDefault()
  // console.log(e.target);
  emit('search',e)
}
</script>

<template>
  <Menubar class="flex w-screen flex-row justify-around shadow-sm" :model="items">
    <!-- start -->
    <template #start>
      <span class="align-items-center inline-flex gap-1 px-2 py-2">
        <img
          width="35"
          height="40"
          viewBox="0 0 35 40"
          fill="none"
          src="@/assets/logo.svg"
          class="h-2rem"
        >
          <path d="..." fill="var(--primary-color)" />
          <path d="..." fill="var(--text-color)" />
        </img>
        <span class="text-xl font-semibold">EventGate</span>
      </span>
    </template>
    <!-- middle -->
    <template #itemicon="{item}">
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
      <div class="flex flex-row justify-around">
        <div class="card flex items-center justify-around">
          <form class="flex flex-row" v-on:submit="(e) => search(e)">
            <!-- <InputText type="text" /> -->
            <input type="text" placeholder="Enter">
            <Button type="submit">
              <i class="pi pi-search"></i>
            </Button>
          </form>
          
    </div>
    <button
        v-ripple
        class="p-link align-items-center text-color hover:surface-200 border-noround relative flex w-full overflow-hidden p-2 pl-3">
        <Avatar image="/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
        <span class="flex-column inline-flex">
          <span class="font-bold">PersieDaGamer</span>
        </span>
      </button>
      </div>
      
    </template></Menubar
  >
</template>
