<template>
  <Button @click="handleSignUp">Sign Up</Button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Button from 'primevue/button'

const { loginWithRedirect } = useAuth0()

const handleSignUp = () => {
  loginWithRedirect({
    appState: {
      target: '/profile'
    },
    authorizationParams: {
      screen_hint: 'signup'
    }
  })
}
</script>
