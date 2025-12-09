<template>
  <div class="home container">
    <h1>Discussions</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ doc.title }}</h5>
          <p class="card-text">{{ doc.content ? doc.content.substring(0, 100) + '...' : '' }}</p>
          <router-link :to="{ name: 'Details', params: { id: doc.id } }" class="btn btn-primary">Voir plus</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getCollection from '@/composables/getCollection'

const { documents, error } = getCollection('discussions')
</script>