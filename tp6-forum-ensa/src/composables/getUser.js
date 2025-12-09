import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

// On stocke l'utilisateur dans une variable réactive globale
const user = ref(projectAuth.currentUser)

// On écoute les changements (connexion/déconnexion)
projectAuth.onAuthStateChanged(_user => {
  console.log('User state changed. Current user is:', _user)
  user.value = _user
})

const getUser = () => {
  return { user }
}

export default getUser