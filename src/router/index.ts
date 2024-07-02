import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomePage
  //   },
  //   {
  //     path: '/events',
  //     name: 'about',
  //     component: EventsPage
  //   },
  //   {
  //     path: '/create-event',
  //     name: 'create-event',
  //     component: CreateEventPage
  //   }
  // ]
})

export default router
