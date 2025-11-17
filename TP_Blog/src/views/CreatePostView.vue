<template>
  <div>
    <h2>Créer un article</h2>
    <form @submit.prevent="onSubmit" class="card">
      <div>
        <label>Titre</label>
        <input v-model="title" required />
      </div>
      <div>
        <label>Body</label>
        <textarea v-model="body" rows="6" required></textarea>
      </div>
      <div>
        <label>Tags (séparés par des virgules)</label>
        <input v-model="tagsInput" />
      </div>
      <button type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
import { createPost } from '../composables/getPost'

export default {
  name: 'CreatePostView',
  data(){
    return { title: '', body: '', tagsInput: '' }
  },
  methods:{
    onSubmit(){
      const tags = this.tagsInput.split(',').map(t=>t.trim()).filter(Boolean)
      createPost({ title: this.title, body: this.body, tags })
      this.$router.push('/')
    }
  }
}
</script>
