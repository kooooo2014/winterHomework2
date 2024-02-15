import { createRouter, createWebHistory } from 'vue-router'
import Form from '../components/UserForm.vue'
import Main from '../components/UsersList.vue'

const routes = [
  {
    path: '/form',
    component: Form
  },
  {
    path: '/',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
