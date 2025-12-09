<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from './firebase';

// Import des composants
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import EventList from './components/EventList.vue'; // <--- NOUVEAU

// Variables réactives (État)
const user = ref(null);
const showLogin = ref(true);

const auth = getAuth(app);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
    } else {
      user.value = null;
    }
  });
});

const logout = async () => {
  await signOut(auth);
};
</script>

<template>
  <div class="app-container">
    <h1>Application de Vote ENSA</h1>

    <!-- SCÉNARIO 1 : L'utilisateur EST connecté -->
    <div v-if="user">
      <div class="dashboard">
        <p>Bienvenue, <strong>{{ user.email }}</strong> !</p>
        <button @click="logout" class="logout-btn">Se déconnecter</button>
      </div>
      
      <hr>
      
      <!-- ON AFFICHE LA LISTE DES ÉVÉNEMENTS ICI -->
      <EventList /> 
    </div>

    <!-- SCÉNARIO 2 : L'utilisateur N'EST PAS connecté -->
    <div v-else class="auth-wrapper">
      <Login v-if="showLogin" />
      <SignUp v-else />

      <p class="switch-auth">
        <span v-if="showLogin">
          Pas encore de compte ? 
          <a @click="showLogin = false">S'inscrire</a>
        </span>
        <span v-else>
          Déjà un compte ? 
          <a @click="showLogin = true">Se connecter</a>
        </span>
      </p>
    </div>
  </div>
</template>

<style>
/* (Gardez le même style qu'avant) */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.app-container { max-width: 600px; margin: 0 auto; }
.switch-auth { margin-top: 15px; font-size: 0.9em; }
.switch-auth a { color: #42b883; cursor: pointer; text-decoration: underline; font-weight: bold; }
.logout-btn { background-color: #ff4d4d; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
.dashboard { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
</style>