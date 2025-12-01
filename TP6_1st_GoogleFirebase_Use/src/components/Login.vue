<template>
  <div class="auth-container">
    <h2>Connexion Étudiant</h2>
    <form @submit.prevent="login">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email universitaire" 
        required 
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Mot de passe" 
        required 
      />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  const auth = getAuth(app);
  try {
    // La différence est ici : on utilise signIn au lieu de createUser
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Vous êtes connecté !");
    errorMessage.value = '';
  } catch (error) {
    console.error(error);
    errorMessage.value = "Erreur de connexion : " + error.message;
  }
};
</script>

<style scoped>
/* On réutilise le même style simple */
.auth-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  padding: 8px;
  margin-bottom: 10px;
}
button {
  background-color: #35495e; /* Couleur différente pour différencier */
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>