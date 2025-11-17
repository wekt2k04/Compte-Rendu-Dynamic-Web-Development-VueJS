<template>
  <div>
    <h4>Tags</h4>
    <div v-if="!unique.length">Aucun tag</div>
    <div v-else>
      <button v-for="t in unique" :key="t" class="tag" @click="$emit('select', t)">{{ t }}</button>
    </div>
  </div>
</template>

<script>
import { getPosts } from '../composables/getPosts'

export default {
  name: 'TagCloud',
  data(){
    return { unique: [] }
  },
  methods:{
    load(){
      const posts = getPosts()
      const tags = posts.flatMap(p => p.tags || [])
      this.unique = Array.from(new Set(tags))
    }
  },
  mounted(){ this.load() }
}
</script>
