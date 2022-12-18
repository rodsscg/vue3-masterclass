<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list
      :posts="threadPosts"
      :users="users"
    />

    <post-editor @save-post="onSavePost" />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'

import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const store = useStore()

const props = defineProps({
  id: { type: String, required: true}
})

const posts = computed(() => store.state.posts)
const thread = computed(() => store.state.threads.find(thread => thread.id === props.id))
const threadPosts = computed(() => posts.value.filter(post => post.threadId === props.id))
const users = computed(() => store.state.users)

const onSavePost = (eventData) => {
  const post = { ...eventData.post, threadId: props.id}
  store.dispatch('createPost', post)
}
</script>
