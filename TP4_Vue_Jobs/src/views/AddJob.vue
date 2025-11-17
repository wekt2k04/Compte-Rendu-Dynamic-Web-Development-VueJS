
<template>
    <div>
        <h2>Ajouter un emploi</h2>
        <form @submit.prevent="submitForm">
            <input v-model="job.titre" placeholder="Titre" required></input>
            <textarea v-model="job.description" placeholder="Description" required></textarea>
            <input v-model="job.salaire" placeholder="Salaire"></input>
            <input v-model="job.lieu" placeholder="Lieu"></input>
            <input v-model="job.entreprise" placeholder="Entreprise"></input>
            <input v-model="job.mail" type="email" placeholder="Email de contact"></input>
            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<script>
import { getJobs, saveJobs } from '../services/jobService';

export default{
    data(){
        return{
            job :{
                titre:"",
                description:"",
                salaire:"",
                lieu :"",
                entreprise: "",
                competences: [],
                mail: ""

            }
        };
    },
    methods:{
        submitForm(){
            const jobs = getJobs();
            const newJob  ={
                ...this.job,
                id: Date.now(),
                date_creation: new Date().toISOString().split("T")[0],
                // normalize contact field so other components can rely on it
                contact: { email: this.job.mail || '' },
                entreprise: this.job.entreprise || ''
            };
            jobs.push(newJob);
            saveJobs(jobs);
            alert("Emploi ajouté");
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
input,textarea{
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid#ccc;
}
button{
    background-color: #24292e;
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 6px;
    cursor: pointer;
}
button:hover{
    background-color: #444;
}
</style>