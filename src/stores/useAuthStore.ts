import { useAuth0 } from '@auth0/auth0-vue'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const token = ref<string>()
  const { getAccessTokenSilently } = useAuth0()

  onMounted(async () => {
    if (token.value) return
    await getToken()
  })

  async function getToken() {
    token.value = await getAccessTokenSilently()
  }

  return {
    token,
    getToken
  }
})

export default useAuthStore
