import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const useAuthStore = defineStore('auth', () => {
  const { getAccessTokenSilently } = useAuth0()

  onMounted(async () => {
    const token = await getAccessTokenSilently()
  })
})

export default useAuthStore
