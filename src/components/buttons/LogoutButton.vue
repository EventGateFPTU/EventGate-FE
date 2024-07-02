<template>
  <Button @click="handleLogout">Log Out</Button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Button from 'primevue/button'

const { logout } = useAuth0()

const handleLogout = () =>
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
</script>
