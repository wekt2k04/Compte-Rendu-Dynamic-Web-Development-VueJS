<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading...</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'

const displayName = ref('')
const email = ref('')
const password = ref('')

const { error, signup, isPending } = useSignup()
const emit = defineEmits(['signup'])

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value)
  if (!error.value) {
    emit('signup')
  }
}
</script>

<style>
/* Add styles if needed */
</style>