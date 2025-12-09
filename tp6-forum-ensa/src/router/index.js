import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue' // Nouveau
import Details from '../views/Details.vue' // Nouveau
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      beforeEnter: requireAuth
    },
    {
      path: '/details/:id', // Paramètre dynamique ID
      name: 'Details',
      component: Details,
      beforeEnter: requireAuth,
      props: true
    }
  ]
})

export default router