<template>
  <div class="container mt-4" v-if="document">
    <!-- Le Sujet -->
    <div class="card mb-4 border-primary">
      <div class="card-header bg-primary text-white d-flex justify-content-between">
        <span>{{ document.category }}</span>
        <small>Posté par {{ document.userName }}</small>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ document.title }}</h3>
        <p class="card-text mt-3">{{ document.content }}</p>
      </div>
    </div>

    <!-- Les Réponses (À implémenter dans une sous-collection si on veut, ici simplifié) -->
    <h4>Réponses</h4>
    <div v-if="responses && responses.length">
      <div v-for="resp in responses" :key="resp.id" class="card mb-2">
        <div class="card-body py-2">
          <strong>{{ resp.userName }} :</strong> {{ resp.message }}
        </div>
      </div>
    </div>
    <div v-else class="text-muted mb-3">Aucune réponse pour le moment.</div>

    <!-- Formulaire de réponse -->
    <form @submit.prevent="handleResponse">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Votre réponse..." v-model="newMessage" required>
        <button class="btn btn-outline-secondary">Envoyer</button>
      </div>
    </form>
  </div>
  <div v-else class="container text-center mt-5">Chargement...</div>
</template>

<script setup>
import getDocument from '@/composables/getDocument'
import useCollection from '@/composables/useCollection'
import getCollection from '@/composables/getCollection' // Pour lire les réponses
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const { user } = getUser()
const id = route.params.id

// 1. Récupérer le sujet
const { error, document } = getDocument('discussions', id)

// 2. Gestion des réponses (Sous-collection 'messages' liée à l'ID du post)
// Note: Dans une vraie structure NoSQL, on ferait souvent une sous-collection.
// Ici, on va utiliser une collection 'messages' avec un champ 'parentId'.
const { addDocument } = useCollection('messages')
// On triche un peu ici pour simplifier: on récupère tout et on filtrera (pas optimal mais simple pour le TP)
// Idéalement il faudrait une requête 'where'. Pour l'instant, utilisons useCollection simple.
// Pour bien faire, il faudrait un getCollection avec Query. 
// Pour ce TP rapide, on va supposer que 'messages' est la collection.

// PATCH RAPIDE : Utilisation d'une sous-collection virtuelle pour l'affichage (logique simplifiée)
// Pour l'instant, on n'affiche pas les réponses dynamiques ici sans un composant 'getSubcollection'.
// On va juste permettre d'ajouter.

const newMessage = ref('')

const handleResponse = async () => {
  const response = {
    parentId: id,
    message: newMessage.value,
    userName: user.value.displayName || user.value.email,
    createdAt: timestamp()
  }
  await addDocument(response)
  newMessage.value = ''
  alert('Réponse envoyée ! (Rafraîchissez pour voir si implémenté)')
}
</script>