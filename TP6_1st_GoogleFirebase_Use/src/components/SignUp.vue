<template>
  <div class="auth-container">
    <h2>Inscription Étudiant</h2>
    <form @submit.prevent="register">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email universitaire" 
        required 
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Mot de passe (6 carac. min)" 
        required 
      />
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase'; // On importe notre connexion

// Variables réactives pour stocker ce que l'utilisateur tape
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Fonction qui se lance quand on clique sur "S'inscrire"
const register = async () => {
  const auth = getAuth(app); // On récupère l'outil d'auth
  try {
    // La ligne magique qui envoie les infos à Google
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Compte créé avec succès ! Bienvenue.");
    errorMessage.value = '';
  } catch (error) {
    // Si Google n'est pas content (ex: mot de passe trop court), on l'affiche
    console.error(error);
    errorMessage.value = "Erreur : " + error.message;
  }
};
</script>

<style scoped>
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
  background-color: #42b883;
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