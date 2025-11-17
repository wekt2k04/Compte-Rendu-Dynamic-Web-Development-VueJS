<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <h1>📋 Gestion des emplois</h1>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/add">Ajouter un emploi</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
header {
  background-color: #24292e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  margin: 0;
}
nav a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  font-weight: bold;
}
nav a.router-link-active {
  text-decoration: underline;
}
main {
  padding: 2rem;
}
</style>
