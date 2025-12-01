<template>
  <div class="events-container">
    <h2>Événements à venir</h2>
    <div v-if="loading">Chargement des événements...</div>
    <div v-else-if="events.length === 0">Aucun événement trouvé.</div>
    
    <div v-else class="event-list">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p class="date">Date : {{ event.date }}</p>
        
        <div class="vote-section">
          <!-- BOUTON YES -->
          <button 
            @click="castVote(event, 'yes')" 
            class="vote-btn yes"
            :disabled="isVoting"
          >
            <span>👍 Yes</span>
            <span class="count">{{ event.yesVotes }}</span>
          </button>

          <!-- BOUTON NO -->
          <button 
            @click="castVote(event, 'no')" 
            class="vote-btn no"
            :disabled="isVoting"
          >
            <span>👎 No</span>
            <span class="count">{{ event.noVotes }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// On importe les outils nécessaires pour écrire dans la base
import { 
  getFirestore, collection, onSnapshot, 
  doc, updateDoc, increment, addDoc, query, where, getDocs 
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Pour savoir QUI vote
import { app } from '../firebase';

const db = getFirestore(app);
const auth = getAuth(app);

const events = ref([]);
const loading = ref(true);
const isVoting = ref(false); // Pour éviter le double-clic rapide

// 1. Récupération des événements (Comme avant)
onMounted(() => {
  const eventsCollection = collection(db, "Events");
  onSnapshot(eventsCollection, (snapshot) => {
    events.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    loading.value = false;
  });
});

// 2. Fonction de Vote
const castVote = async (event, choice) => {
  const user = auth.currentUser;
  if (!user) return alert("Vous devez être connecté pour voter !");

  isVoting.value = true; // On bloque les boutons

  try {
    // A. VÉRIFICATION : Est-ce que cet utilisateur a déjà voté pour cet événement ?
    // On cherche dans la collection 'Votes' si un document existe avec ce userId ET cet eventId
    const q = query(
      collection(db, "Votes"), 
      where("userId", "==", user.uid),
      where("eventId", "==", event.id)
    );
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si la recherche n'est pas vide, c'est qu'il a déjà voté !
      alert("Vous avez déjà voté pour cet événement !");
      isVoting.value = false;
      return;
    }

    // B. ENREGISTREMENT DU VOTE (Si pas encore voté)
    // 1. On crée la preuve du vote dans la collection 'Votes'
    await addDoc(collection(db, "Votes"), {
      eventId: event.id,
      userId: user.uid,
      vote: choice,
      email: user.email, // Optionnel, pour info
      createdAt: new Date().toISOString()
    });

    // 2. On met à jour le compteur dans l'événement (Incrementation atomique)
    // Si choice est 'yes', on augmente yesVotes, sinon noVotes
    const eventRef = doc(db, "Events", event.id);
    const fieldToUpdate = choice === 'yes' ? 'yesVotes' : 'noVotes';

    await updateDoc(eventRef, {
      [fieldToUpdate]: increment(1) // increment(1) est plus sûr que "valeur + 1"
    });

    alert(`Vote "${choice}" enregistré !`);

  } catch (error) {
    console.error("Erreur lors du vote :", error);
    alert("Une erreur est survenue.");
  } finally {
    isVoting.value = false; // On débloque les boutons
  }
};
</script>

<style scoped>
/* (Mêmes styles qu'avant + style pour le curseur pointer) */
.events-container { max-width: 600px; margin: 0 auto; text-align: left; }
.event-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.vote-section { display: flex; gap: 15px; margin-top: 15px; }
.vote-btn { 
  display: flex; align-items: center; gap: 8px; padding: 8px 16px; 
  border-radius: 20px; font-weight: bold; border: none; cursor: pointer; transition: transform 0.1s;
}
.vote-btn:active { transform: scale(0.95); }
.vote-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.yes { background-color: #e6f4ea; color: #1e8e3e; }
.no { background-color: #fce8e6; color: #d93025; }
.count { font-size: 1.1em; background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 10px; }
</style>