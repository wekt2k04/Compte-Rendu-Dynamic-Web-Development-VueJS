<template>
  <div>
    <h2>Liste des emplois</h2>
    <FilterNav @filter="applyFilter" />
    
    <div class="jobs">
      <div 
        v-for="job in filteredJobs" 
        :key="job.id" 
        class="job-card"
      >
        <h3>{{ job.titre }}</h3>
        <p>{{ job.entreprise }} - {{ job.lieu }}</p>
        <p><strong>Salaire :</strong> {{ job.salaire }}</p>

        <div class="buttons">
          <button @click="viewJob(job.id)">Détails</button>
          <button @click.stop="editJob(job.id)" class="edit-btn">Modifier</button>
          <button class="delete" @click="deleteJob(job.id)">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Détails d'un emploi -->
    <JobDetail 
      v-if="selectedJob" 
      :job="selectedJob" 
      @close="selectedJob = null" 
    />
  </div>
</template>

<script>
import { getJobs, saveJobs } from "../services/jobService"
import FilterNav from "../components/FilterNav.vue"
import JobDetail from "../components/JobDetail.vue"
import EditJob from "./EditJob.vue";

export default {
  components: { FilterNav, JobDetail },
  data() {
    return {
      jobs: getJobs(), // 👈 charge les données depuis localStorage ou JSON
      selectedJob: null,
      filterText: ""
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job =>
        job.titre.toLowerCase().includes(this.filterText.toLowerCase())
      )
    }
  },
  methods: {
    viewJob(id) {
      this.selectedJob = this.jobs.find(j => j.id === id)
    },
    applyFilter(text) {
      this.filterText = text
    },
    deleteJob(id) {
      if (confirm("Voulez-vous vraiment supprimer cet emploi ?")) {
        this.jobs = this.jobs.filter(j => j.id !== id) // retire l’emploi
        saveJobs(this.jobs) // met à jour localStorage
      }
    },
    editJob(id) {
      this.$router.push(`/jobs/${id}`);
    }
  }
}
</script>

<style scoped>
.jobs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.job-card:hover {
  transform: scale(1.03);
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #24292e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  opacity: 0.85;
}

button.delete {
  background-color: #b22222;
}

button.edit{
  background-color:#1e90ff; 

}
button.edit:hover{
  background-color:  #007bff;

}
</style>
