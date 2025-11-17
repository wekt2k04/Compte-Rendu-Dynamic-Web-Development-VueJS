
<template>
    <div class="job-detail">
        <div class="detail-box">
            <button class="close-btn" @click="$emit('close')">×</button>
            <h2>{{ job.titre}}</h2>
            <p><strong>Entreprise :</strong>{{ job.entreprise }}</p>
            <p><strong>Description  :</strong>{{ job.description  }}</p>
            {{ (job.competences && job.competences.length) ? job.competences.join(', ') : (job.competences_requises && job.competences_requises.length) ? job.competences_requises.join(', ') : "Aucune compétence définie" }}
            <p><strong> Salaire :</strong>{{ job.salaire }}</p>
            <p><strong> Contact  :</strong>{{ (job.contact && job.contact.email) ? job.contact.email : (job.mail ? job.mail : 'N/A') }}</p>
        </div>
    </div>
</template>


<script>
export default{
    props: ["job"]
}
</script>

<style scoped>
.job-detail{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}
.detail-box{
    background: white;
    padding: 2rem;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
}
.close-btn{
    float:right;
    border: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>

