<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style>
main {
  max-width: 900px;
  margin: 20px auto;
  padding: 0 16px;
}
</style>
