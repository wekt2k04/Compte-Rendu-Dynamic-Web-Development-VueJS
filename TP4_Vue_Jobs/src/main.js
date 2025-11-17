import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles.css'

// Création de l'application Vue et montage sur #app
createApp(App)
  .use(router)
  .mount('#app')
