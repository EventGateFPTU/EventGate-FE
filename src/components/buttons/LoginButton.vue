<template>
  <Button @click="handleLogin" class="rounded-full bg-[#4A3F9F]">Log In</Button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Button from 'primevue/button'
import { onMounted } from 'vue'

const { loginWithRedirect, getAccessTokenSilently } = useAuth0()

onMounted(() => {
  getAccessTokenSilently().then(console.log)
})
const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/'
    }
  })
}
</script>
