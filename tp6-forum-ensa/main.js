import { createApp } from 'vue'
import App from './src/App.vue' // Le composant racine (vérifiez qu'il existe !)
import router from './src/router' // Le routeur fourni par le prof

// --- Configuration Bootstrap ---
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

const app = createApp(App)

// Installation des plugins
app.use(router) // Active le router
app.use(createBootstrap()) // Active Bootstrap

app.mount('#app')