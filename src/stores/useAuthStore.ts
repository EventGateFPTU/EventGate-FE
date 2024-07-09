import { useAuth0 } from '@auth0/auth0-vue'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage<string>('accessToken', null)
  const { getAccessTokenSilently } = useAuth0()

  async function getToken() {
    token.value = await getAccessTokenSilently()
  }

  return {
    token,
    getToken
  }
})

export default useAuthStore
