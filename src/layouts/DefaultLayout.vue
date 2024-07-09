<template>
  <div class="relative min-h-[calc(100vh_-_8rem)] overflow-hidden bg-[#4A3F9F]">
    <div class="flex h-32 items-center justify-between bg-[#BFFF50] px-24">
      <div class="w-80">
        <div v-if="isAuthenticated">
          <Avatar
            @click="toggle"
            :image="user?.picture"
            class="size-12 hover:cursor-pointer"
            shape="circle"
          />
          <OverlayPanel ref="op">
            <Menu :model="items" class="md:w-15rem w-full">
              <template #start>
                <div
                  class="p-link text-color hover:surface-200 border-noround relative flex w-full items-center overflow-hidden p-2 pl-3"
                >
                  <span class="flex-column inline-flex">
                    <span class="font-bold">{{ user?.nickname }}</span>
                  </span>
                </div>
              </template>
              <template #submenuheader="{ item }">
                <span class="font-bold text-primary">{{ item.label }}</span>
              </template>
              <template #item="{ item, props }">
                <a class="align-items-center flex" v-bind="props.action">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                </a>
              </template>
            </Menu>
          </OverlayPanel>
        </div>
        <template v-else>
          <LoginButton />
        </template>
      </div>

      <RouterLink to="/">
        <img fill="none" src="@/assets/logo.png" class="w-44 hover:cursor-pointer" />
      </RouterLink>

      <div class="flex w-80 items-center gap-8">
        <div>
          <svg
            width="57"
            height="33"
            viewBox="0 0 57 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M56.3235 9.70588L56.3235 3L56.3235 0L53.3235 -1.31134e-07L3.99996 -2.28713e-06L0.999962 -2.41827e-06L0.999962 3L0.999961 9.70588L3.99996 9.70588L3.99996 3L53.3235 3L53.3235 9.70588L56.3235 9.70588ZM3.99996 23.2941L3.99996 30L53.3235 30L53.3235 23.2941L56.3235 23.2941L56.3235 30L56.3235 33L53.3235 33L3.99996 33L0.99996 33L0.999961 30L0.999961 23.2941L3.99996 23.2941Z"
              fill="#4A3F9F"
            />
            <path
              d="M2.45591 6.30884L2.45591 9.2206C9.25003 11.4853 18.7618 17.4706 2.45591 23.2941L2.45591 27.1765"
              stroke="#4A3F9F"
              stroke-width="3"
            />
            <path
              d="M54.8677 5.33826L54.8677 9.22061C49.0441 11.6471 40.8912 17.9559 54.8677 23.7794L54.8677 26.6912"
              stroke="#4A3F9F"
              stroke-width="3"
            />
            <path d="M40.708 1.78467V7.13856" stroke="#4A3F9F" stroke-width="3" />
            <path d="M41.1542 10.7078V15.1693" stroke="#4A3F9F" stroke-width="3" />
            <path d="M41.1542 19.6309V24.0924" stroke="#4A3F9F" stroke-width="3" />
            <path d="M41.1542 27.6619V32.1234" stroke="#4A3F9F" stroke-width="3" />
            <path
              d="M8.58468 6.2462C8.58468 6.73901 8.18518 7.13851 7.69236 7.13851C7.19955 7.13851 6.80005 6.73901 6.80005 6.2462C6.80005 5.75338 7.19955 5.35388 7.69236 5.35388C8.18518 5.35388 8.58468 5.75338 8.58468 6.2462Z"
              fill="#4A3F9F"
            />
            <path
              d="M8.58468 27.6618C8.58468 28.1547 8.18518 28.5542 7.69236 28.5542C7.19955 28.5542 6.80005 28.1547 6.80005 27.6618C6.80005 27.169 7.19955 26.7695 7.69236 26.7695C8.18518 26.7695 8.58468 27.169 8.58468 27.6618Z"
              fill="#4A3F9F"
            />
            <path
              d="M50.9697 27.6618C50.9697 28.1547 50.5702 28.5542 50.0774 28.5542C49.5846 28.5542 49.1851 28.1547 49.1851 27.6618C49.1851 27.169 49.5846 26.7695 50.0774 26.7695C50.5702 26.7695 50.9697 27.169 50.9697 27.6618Z"
              fill="#4A3F9F"
            />
            <path
              d="M50.9697 6.2462C50.9697 6.73901 50.5702 7.13851 50.0774 7.13851C49.5846 7.13851 49.1851 6.73901 49.1851 6.2462C49.1851 5.75338 49.5846 5.35388 50.0774 5.35388C50.5702 5.35388 50.9697 5.75338 50.9697 6.2462Z"
              fill="#4A3F9F"
            />
            <path
              d="M24.1415 10.0656C24.4409 9.14429 25.7443 9.14429 26.0436 10.0656L27.0718 13.2299C27.2056 13.6419 27.5896 13.9209 28.0228 13.9209H31.3499C32.3187 13.9209 32.7214 15.1605 31.9377 15.7299L29.246 17.6855C28.8955 17.9402 28.7489 18.3915 28.8828 18.8036L29.9109 21.9678C30.2102 22.8891 29.1558 23.6553 28.3721 23.0859L25.6803 21.1302C25.3299 20.8756 24.8553 20.8756 24.5048 21.1302L21.8131 23.0859C21.0294 23.6553 19.9749 22.8892 20.2742 21.9678L21.3024 18.8036C21.4362 18.3915 21.2896 17.9402 20.9391 17.6855L18.2474 15.7299C17.4637 15.1605 17.8665 13.9209 18.8352 13.9209H22.1623C22.5955 13.9209 22.9795 13.6419 23.1134 13.2299L24.1415 10.0656Z"
              fill="#28207E"
            />
          </svg>
        </div>
        <div class="relative">
          <InputText class="h-12 rounded-full pl-4 pr-10 drop-shadow-md" />
          <span class="absolute inset-y-0 right-0 flex items-center justify-center px-4">
            <i class="pi pi-search"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="relative">
      <img fill="none" src="@/assets/background-logo.png" class="absolute top-0 z-0 w-full" />
      <div class="relative z-10">
        <slot />
      </div>
    </div>
    <div v-if="hasFooter" class="absolute bottom-0 z-10 w-full">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginButton from '@/components/buttons/LoginButton.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import OverlayPanel from 'primevue/overlaypanel'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'

defineProps<{
  hasFooter?: boolean
}>()

const { isAuthenticated, user, logout } = useAuth0()
const op = ref()
const items = ref([
  {
    separator: true
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog'
      },
      // {
      //   label: 'Messages',
      //   icon: 'pi pi-inbox',
      //   badge: 2
      // },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          })
        }
      }
    ]
  }
])

const toggle = (event: any) => {
  op.value.toggle(event)
}
</script>
