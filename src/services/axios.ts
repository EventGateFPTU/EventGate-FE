import axios, { type AxiosInstance } from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'

const axiosClient: AxiosInstance = axios.create({
  baseURL: '/'
})

const { getAccessTokenSilently } = useAuth0()

axiosClient.interceptors.request.use(
  (config) => {
    config.headers.set('X-CSRF', '1')
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosClient
