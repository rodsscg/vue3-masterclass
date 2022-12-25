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

import BaseDate from '@/components/BaseDate.vue'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const { dispatch, getters, state} = useStore()

const props = defineProps({
  id: { type: String, required: true}
})

const posts = computed(() => state.posts)
const thread = computed(() => getters.thread(props.id))
const threadPosts = computed(() => filterIn(posts.value).where('threadId', props.id))
const users = computed(() => state.users)

const loadData = async () => {
  const threadData = await getThreadData()

  if (threadData) {
    getUserData(threadData.userId)
    getThreadPosts()
  }
}

const getThreadData = () => dispatch('fetchThread', { id: props.id })

const getUserData = (id) => dispatch('fetchUser', { id })

const getThreadPosts = async () => {
  const posts = await dispatch('fetchPosts', { ids: thread.value.posts })
  const users = posts.map(post => post.userId)

  dispatch('fetchUsers', { ids: users })
}

const onSavePost = (eventData) => {
  const post = { ...eventData.post, threadId: props.id}
  dispatch('createPost', post)
}

loadData()
</script>
