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

    <p>
      By <a
        href="#"
        class="link-unstyled"
      >{{ thread.author.name }}</a>, <base-date
        :timestamp="thread.publishedAt"
      />.
      <span
        style="
        float:right;
        margin-top:
        2px;"
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
</script>
