<template>
  <div
    v-if="thread"
    class="col-large push-top"
  >
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadEdit', params: { id: thread.id }}">
        <button class="btn-green btn-small">
          Edit Thread
        </button>
      </router-link>
    </h1>

    <p>
      By <a
        href="#"
        class="link-unstyled"
      >{{ thread.author?.name }}</a>, <base-date
        :timestamp="thread.publishedAt"
      />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >
        {{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors
      </span>
    </p>

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

import { filterIn } from '@/helpers'
import { queryDocById } from '@/services/firestore'

import BaseDate from '@/components/BaseDate.vue'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const store = useStore()

const props = defineProps({
  id: { type: String, required: true}
})

const posts = computed(() => store.state.posts)
const thread = computed(() => store.getters.thread(props.id))
const threadPosts = computed(() => filterIn(posts.value).where('threadId', props.id))
const users = computed(() => store.state.users)

const onSavePost = (eventData) => {
  const post = { ...eventData.post, threadId: props.id}
  store.dispatch('createPost', post)
}

const loadData = async () => {
  const threadData = await getThreadData()

  if (threadData) {
    getUserData(threadData.userId)
    getThreadPosts()
  }
}

const getThreadData = async() => {
  const threadSnap = await queryDocById('threads', props.id)

  if (!threadSnap.exists()) return null
  
  const threadData = { ...threadSnap.data(), id: threadSnap.id }
  store.commit('setThread', { thread: threadData })
    
  return threadData
}

const getUserData = async (userId) => {
  const userSnap = await queryDocById('users', userId)

  if (userSnap.exists()) {
    const user = { ...userSnap.data(), id: userSnap.id }
    store.commit('setUser', { user })
  }
}

const getThreadPosts = async () => {
  thread.value.posts.forEach(async (postId) => {
    const postSnap = await queryDocById('posts', postId)

    if (postSnap.exists()) {
      const post = { ...postSnap.data(), id: postSnap.id }
      store.commit('setPost', { post })
      
      getUserData(post.userId)
    }
  })
}

loadData()
</script>
