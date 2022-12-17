<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />

    <post-editor @save-post="onSavePost" />
  </div>
</template>

<script setup>
import { computed, defineProps, reactive } from 'vue'

import sourceData from '@/assets/data.json'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const props = defineProps({
  id: { type: String, required: true}
})

const threads = reactive(sourceData.threads)
const posts = reactive(sourceData.posts)

const thread = computed(() => threads.find(thread => thread.id === props.id))
const threadPosts = computed(() => posts.filter(post => post.threadId === props.id))

const onSavePost = (eventData) => {
  const post = { ...eventData.post, threadId: props.id}
  
  posts.push(post)
  thread.value.posts.push(post.id)
}
</script>
