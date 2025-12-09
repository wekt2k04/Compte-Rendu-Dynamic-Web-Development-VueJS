<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="container">
      <RouterView />
    </main>
    <footer class="mt-5 text-center text-muted p-3">
      <small>&copy; 2025 Forum Communautaire ENSA</small>
    </footer>
  </div>
</template>

<style>
body { background-color: #f8f9fa; }
</style>