<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadEdit', params: { id: thread.id }}">
        <button class="btn-green btn-small">
          Edit Thread
        </button>
      </router-link>
    </h1>

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

import { filterIn, findIn } from '@/helpers'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

const store = useStore()

const props = defineProps({
  id: { type: String, required: true}
})

const posts = computed(() => store.state.posts)
const thread = computed(() => findIn(store.state.threads).byId(props.id))
const threadPosts = computed(() => filterIn(posts.value).where('threadId', props.id))
const users = computed(() => store.state.users)

const onSavePost = (eventData) => {
  const post = { ...eventData.post, threadId: props.id}
  store.dispatch('createPost', post)
}
</script>
