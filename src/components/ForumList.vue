<template>
  <div>
    <div
      v-for="forum in forums"
      :key="forum.id"
      class="forum-listing"
    >
      <div class="forum-details">
        <router-link
          :to="{ name: 'Forum', params: { id: forum.id } }"
          class="forum-name"
        >
          {{ forum.name }}
        </router-link>

        <p class="forum-description ">
          {{ forum.description }}
        </p>
      </div>


      <div class="threads-count">
        <p class="count text-lead">
          {{ forum.threads?.length }}
        </p>
        <span>{{ getThreadWord(forum) }}</span>
      </div>

      <div class="last-thread" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'	

defineProps({
  forums: { type: Array, required: true }
})

const getThreadWord = (forum) => {
  if (!forum.threads?.length) return 'no threads'

  return forum.threads.length > 1 ? 'threads' : 'thread'
}
</script>
