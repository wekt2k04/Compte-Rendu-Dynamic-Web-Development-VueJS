<template>
  <div class="layout">
    <div class="left">
      <PostList />
    </div>
    <aside class="right card">
      <TagCloud @select="onTagSelect" />
      <div v-if="selected">Articles taggés « {{ selected }} »</div>
    </aside>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'

export default {
  name: 'Home',
  components: { PostList, TagCloud },
  data(){
    return { selected: null }
  },
  methods:{
    onTagSelect(tag){ this.selected = tag }
  }
}
</script>
