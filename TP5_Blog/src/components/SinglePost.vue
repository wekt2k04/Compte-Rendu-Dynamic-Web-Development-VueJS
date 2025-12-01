<template>
  <div class="card">
    <h3>{{ post.title }}</h3>
    <p>{{ snippet }}</p>
    <div class="tags">
      <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
    </div>
    <router-link :to="`/posts/${post.id}`">Lire</router-link>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: { post: { type: Object, required: true } },
  computed: {
    snippet(){
      return this.post.body ? this.post.body.substring(0, 80) + (this.post.body.length>80? '...':'') : ''
    }
  }
}
</script>
