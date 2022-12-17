<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />

    <div class="col-full">
      <form @submit.prevent="addPost">
        <div class="form-group">
          <textarea
            id="post-text"
            v-model="newPostText"
            name=""
            cols="30"
            rows="10"
            class="form-input"
          />
        </div>
        <div class="form-actions">
          <button class="btn-blue">
            Submit post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, reactive, ref } from 'vue'

import sourceData from '@/assets/data.json'
import PostList from '@/components/PostList.vue'

const props = defineProps({
  id: { type: String, required: true}
})

const newPostText = ref('')
const threads = reactive(sourceData.threads)
const posts = reactive(sourceData.posts)

const thread = computed(() => threads.find(thread => thread.id === props.id))
const threadPosts = computed(() => posts.filter(post => post.threadId === props.id))

const addPost = () => {
  const postId = 'abc' + Math.random()
  const post = {
    id: postId,
    text: newPostText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: props.id,
    userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  }

  posts.push(post)
  thread.value.posts.push(postId)

  newPostText.value = ''
}

</script>
