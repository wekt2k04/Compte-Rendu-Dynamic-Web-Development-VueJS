import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
  const document = ref(null)
  const error = ref(null)

  let documentRef = doc(projectFirestore, collectionName, id)

  const unsub = onSnapshot(documentRef, (doc) => {
    if (doc.data()) {
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'Ce document n\'existe pas'
    }
  }, (err) => {
    console.log(err.message)
    error.value = 'Problème de récupération du document'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument