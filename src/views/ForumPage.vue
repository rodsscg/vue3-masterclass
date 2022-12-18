<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">
          {{ forum.description }}
        </p>
      </div>
      <a
        href="new-thread.html"
        class="btn-green btn-small"
      >Start a thread</a>
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

import ThreadList from '@/components/ThreadList.vue'

const store = useStore()

const props = defineProps({
  id: { type: String, required: true }
})

const forum = computed(() => store.state.forums.find(f => f.id === props.id))
const threads = computed(() => store.state.threads.filter(t => t.forumId === props.id))
const users = computed(() => store.state.users)
</script>
