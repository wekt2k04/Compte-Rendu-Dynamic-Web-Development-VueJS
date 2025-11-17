<template>
  <div>
    <div v-if="!posts.length">Aucun article.</div>
    <div v-else>
      <SinglePost v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue'
import { getPosts } from '../composables/getPosts'

export default {
  name: 'PostList',
  components: { SinglePost },
  data(){
    return { posts: [] }
  },
  methods:{
    load(){
      this.posts = getPosts()
    }
  },
  mounted(){ this.load() }
}
</script>
