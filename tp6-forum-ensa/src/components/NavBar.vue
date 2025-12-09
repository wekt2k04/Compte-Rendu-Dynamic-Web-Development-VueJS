<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 p-3">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">📢 Forum ENSA</router-link>
      
      <div class="d-flex align-items-center" v-if="user">
        <span class="text-white me-3">Bonjour, {{ user.displayName }}</span>
        <router-link :to="{ name: 'Create' }" class="btn btn-success btn-sm me-2">Nouveau Sujet</router-link>
        <button @click="handleLogout" class="btn btn-outline-danger btn-sm">Se déconnecter</button>
      </div>
      <div v-else>
        <!-- Si pas connecté, on ne montre rien ou des liens vers Login -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

const { user } = getUser()
const { logout } = useLogout()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  console.log('User logged out')
  router.push({ name: 'Welcome' })
}
</script>