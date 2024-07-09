import axios, { type AxiosInstance } from 'axios'
import useAuthStore from '@/stores/useAuthStore'

const axiosClient: AxiosInstance = axios.create({
  baseURL: '/'
})

const authStore = useAuthStore()

axiosClient.defaults.baseURL = import.meta.env.VITE_API_URL
axiosClient.interceptors.request.use(
  async (config) => {
    if (!authStore.token) await authStore.getToken()
    config.headers.setAuthorization(`Bearer ${authStore.token}`)
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosClient
