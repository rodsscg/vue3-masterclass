<template>
  <div class="col-full push-top">
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

  <div class="col-full push-top"> 
    <thread-list
      :threads="threads"
      :users="users"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'

import { filterIn, findIn } from '@/helpers'
import ThreadList from '@/components/ThreadList.vue'

const store = useStore()

const props = defineProps({
  id: { type: String, required: true }
})

const forum = computed(() => findIn(store.state.forums).byId(props.id))
const threads = computed(() => filterIn(store.state.threads).where('forumId', props.id))
const users = computed(() => store.state.users)
</script>
