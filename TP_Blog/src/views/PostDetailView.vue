<template>
  <div>
    <div v-if="!post">Article introuvable.</div>
    <div v-else class="card">
      <h2>{{ post.title }}</h2>
      <div class="tags"><span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span></div>
      <p>{{ post.body }}</p>
      <button @click="onDelete">Supprimer</button>
      <router-link to="/">Retour</router-link>
    </div>
  </div>
</template>

<script>
import { getPostById, deletePost } from '../composables/getPost'

export default {
  name: 'PostDetailView',
  props: ['id'],
  data(){
    return { post: null }
  },
  methods:{
    load(){
      const id = this.$route.params.id
      this.post = getPostById(id)
    },
    onDelete(){
      if(confirm('Supprimer cet article?')){
        deletePost(this.$route.params.id)
        this.$router.push('/')
      }
    }
  },
  mounted(){ this.load() },
  watch: {
    '$route.params.id'(){ this.load() }
  }
}
</script>
