import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'

const getCollection = (collectionName) => {
  const documents = ref(null)
  const error = ref(null)

  // Compat API syntax
  let collectionRef = projectFirestore.collection(collectionName)
    .orderBy('createdAt', 'desc')

  const unsub = collectionRef.onSnapshot((snap) => {
    let results = []
    snap.docs.forEach(doc => {
      // Ensure data exists and createdAt is present (optional check)
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    error.value = null
  }, (err) => {
    console.log(err.message)
    documents.value = null
    error.value = 'Impossible de récupérer les données'
  })

  // Nettoyage de l'écouteur si le composant est détruit
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection