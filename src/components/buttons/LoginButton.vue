<template>
  <Button @click="handleLogin" class="rounded-full bg-[#4A3F9F]">Log In</Button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Button from 'primevue/button'

const { loginWithRedirect } = useAuth0()

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/'
    }
  })
}
</script>
