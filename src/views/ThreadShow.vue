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
import { computed } from 'vue'
import { useStore } from 'vuex'

import { filterIn } from '@/helpers'
import BaseDate from '@/components/BaseDate.vue'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const { dispatch, getters, state} = useStore()

const props = defineProps({ id: { type: String, required: true} })

const posts = computed(() => state.posts)
const thread = computed(() => getters.thread(props.id))
const threadPosts = computed(() => filterIn(posts.value).where('threadId', props.id))
const users = computed(() => state.users)  

const getThreadData = () => dispatch('fetchThread', { id: props.id })
const getThreadPosts = (thread) => dispatch('fetchPosts', { ids: thread.posts })
const getUserIds = (posts) => Promise.resolve(posts.map(post => post.userId).concat(thread.value.userId))
const getUsers = (ids) => dispatch('fetchUsers', { ids })
const onSavePost = (eventData) => dispatch('createPost', { ...eventData.post, threadId: props.id })

getThreadData()
  .then(getThreadPosts)
  .then(getUserIds)
  .then(getUsers)
</script>
