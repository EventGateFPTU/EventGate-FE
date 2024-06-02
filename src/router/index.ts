import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//@ts-ignore
import Events from '../views/Events.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/events',
      name: 'about',
      component: Events
    }
  ]
})

export default router
