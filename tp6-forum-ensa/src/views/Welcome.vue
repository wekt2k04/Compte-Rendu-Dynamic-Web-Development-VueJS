<template>
  <div class="welcome container">
    <p class="welcome-message">Welcome !</p>
    
    <!-- CAS 1 : Afficher le Login -->
    <div v-if="showLogin">
      <h2>Login</h2>
      <!-- On écoute l'événement 'login' émis par l'enfant -->
      <LoginForm @login="enterForum" />
      <p>No account yet? <span @click="showLogin = false">Signup</span> instead.</p>
    </div>

    <!-- CAS 2 : Afficher l'Inscription -->
    <div v-else>
      <h2>Sign up</h2>
      <!-- On écoute l'événement 'signup' émis par l'enfant -->
      <SignupForm @signup="enterForum" />
      <p>Already registered? <span @click="showLogin = true">Login</span> instead.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'

const showLogin = ref(true) // Par défaut, on montre le login
const router = useRouter()  // Pour pouvoir changer de page

// Fonction appelée quand un enfant signale un succès
const enterForum = () => {
  // Redirection vers la route nommée 'Home'
  router.push({ name: 'Home' })
}
</script>

.welcome-message {
  font-size: 24px;
  font-weight: bold;
}

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* Form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}
</style>