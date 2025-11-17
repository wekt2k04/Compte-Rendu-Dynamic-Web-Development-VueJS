import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AddJob },
  { path: '/jobs/:id', component: EditJob, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
