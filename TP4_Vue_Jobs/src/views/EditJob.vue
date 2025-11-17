<template>
    <div class="edit-job">
        <h2>Modifier un emploi</h2>

        <form @submit.prevent="updateJob">
            <input v-model="job.titre" placeholder="Titre" required />
            <textarea v-model="job.description" placeholder="Description" required></textarea>
            <input v-model="job.salaire" placeholder="Salaire" />
            <input v-model="job.lieu" placeholder="Lieu" />
            <input v-model="job.entreprise" placeholder="Entreprise" />
            <input v-model="job.mail" type="email" placeholder="Email de contact" />

            <div class="actions">
                <button type="submit">💾 Sauvegarder</button>
                <button type="button" @click="deleteJob">🗑️ Supprimer</button>
            </div>
        </form>
    </div>
</template>

<script>
import { getJobs, saveJobs } from "../services/jobService"

export default {
    props: ["id"],

    data() {
        return {
            job: {
                titre:"",
                description:"",
                salaire: "",
                lieu :"",
                entreprise: "",
                competences:[],
                mail:"",
                id:null
            }
        }
    },

    created() {
        const jobs = getJobs()
        const found = jobs.find(j => j.id == this.id) 

        if(found){
            this.job={
                titre:found.titre || "",
                description:found.description || "",
                salaire:found.salaire || "",
                lieu:found.lieu || "",
                entreprise: found.entreprise || '',
                competences:found.competences || [],
                mail: found.mail || found.contact?.email || "",
                id: found.id

            }

        }
    },

    methods: {
        updateJob() {
            const jobs = getJobs()
            const index = jobs.findIndex(j => j.id == this.id)

            // ensure we save a normalized job shape (contact object expected by JobDetail)
            const jobToSave = {
                ...this.job,
                contact: { email: this.job.mail || '' },
                entreprise: this.job.entreprise || ''
            }

            jobs[index] = jobToSave
            saveJobs(jobs)

            alert("Emploi modifié avec succès !")
            this.$router.push("/")
        },

        deleteJob() {
            if (confirm("Voulez-vous vraiment supprimer cet emploi ?")) {
                const jobs = getJobs().filter(j => j.id != this.id)
                saveJobs(jobs)

                alert("Emploi supprimé !")
                this.$router.push("/")
            }
        }
    }
}
</script>

<style scoped>
.edit-job {
    max-width: 600px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input, textarea {
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid #ccc;
}

.actions {
    display: flex;
    gap: 1rem;
}

button {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
}

button:first-child {
    background-color: #24292e;
}

button:last-child {
    background-color: #b22222;
}

button:hover {
    opacity: 0.9;
}
</style>
