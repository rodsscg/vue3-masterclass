<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'

import sourceData from '@/assets/data.json'
import PostList from '@/components/PostList.vue'

const props = defineProps({
  id: { type: String, required: true}
})

const threads = ref(sourceData.threads)
const posts = ref(sourceData.posts)

const thread = computed(() => threads.value.find(thread => thread.id === props.id))
const threadPosts = computed(() => posts.value.filter(post => post.threadId === props.id))
</script>
