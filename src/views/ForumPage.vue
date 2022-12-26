<template>
  <div
    v-if="forum"
    class="col-full push-top"
  >
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">
          {{ forum.description }}
        </p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
      >
        Start a thread
      </router-link>
    </div>
  </div>

  <div
    v-if="forum"
    class="col-full push-top"
  > 
    <thread-list
      :threads="threads"
      :users="users"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'

import { findIn } from '@/helpers'
import ThreadList from '@/components/ThreadList.vue'

const { dispatch, state, getters } = useStore()

const props = defineProps({
  id: { type: String, required: true }
})

const forum = computed(() => findIn(state.forums).byId(props.id))
const threads = computed(() => forum.value?.threads.map(id => getters.thread(id)).filter(thread => thread.id) || [])
const users = computed(() => state.users)
 
const loadData = async () => {
  const forum = await dispatch('fetchForum', { id: props.id })
  const threads = await dispatch('fetchThreads', { ids: forum.threads })
  dispatch('fetchUsers', { ids: threads.map(thread => thread.userId) })
}

loadData()
</script>
