import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'swiper/css'
import 'swiper/css/pagination'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createAuth0 } from '@auth0/auth0-vue'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

app.use(PrimeVue)
app.use(DialogService)
app.use(ConfirmationService)
app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL
    }
  })
)

app.mount('#app')
