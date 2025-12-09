<template>
  <div class="create container mt-4">
    <h2>Créer un nouveau sujet</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Titre</label>
        <input type="text" class="form-control" required v-model="title" placeholder="Ex: Problème TP Java">
      </div>
      
      <div class="mb-3">
        <label class="form-label">Contenu</label>
        <textarea class="form-control" required v-model="content" rows="4"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Catégorie</label>
        <select class="form-select" v-model="category">
          <option value="General">Général</option>
          <option value="Cours">Cours</option>
          <option value="TP">Travaux Pratiques</option>
          <option value="Stages">Stages</option>
        </select>
      </div>

      <button v-if="!isPending" class="btn btn-primary">Publier</button>
      <button v-else class="btn btn-secondary" disabled>Envoi en cours...</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

const { addDocument, isPending } = useCollection('discussions') // Collection 'discussions'
const { user } = getUser()
const router = useRouter()

const title = ref('')
const content = ref('')
const category = ref('General')

const handleSubmit = async () => {
  const discussion = {
    title: title.value,
    content: content.value,
    category: category.value,
    userId: user.value.uid,
    userName: user.value.displayName || user.value.email,
    createdAt: timestamp(),
    responseCount: 0
  }

  await addDocument(discussion)
  if (!isPending.value) {
    router.push({ name: 'Home' })
  }
}
</script>