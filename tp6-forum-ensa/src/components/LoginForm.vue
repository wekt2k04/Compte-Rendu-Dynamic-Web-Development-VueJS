<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'

// 1. On définit l'événement qu'on va envoyer au parent
const emit = defineEmits(['login'])

const { error, login } = useLogin()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  // 2. On tente la connexion via le composable
  await login(email.value, password.value)
  
  // 3. Si pas d'erreur, on prévient Welcome.vue que c'est bon
  if (!error.value) {
    emit('login')
  }
}
</script>

<style>
/* Les styles seront gérés par le parent ou globalement */
</style>