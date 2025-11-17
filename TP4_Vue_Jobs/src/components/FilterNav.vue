
<template>
    <div class="filter-nav">
        <input
        type="text"
        placeholder="Rechercher un emploi.."
        v-model="text"
        @input="$emit('filter' ,text)"></input>
    </div>
</template>

<script>
export default {
    data(){
        return{text :""};
    }
}
</script>

<style scoped>
.filter-nav input{
    width: 100%;
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    

}
</style>