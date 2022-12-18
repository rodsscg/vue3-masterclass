<template>
  <div
    v-for="category in categories"
    :key="category.id"
    class="col-full"
  >
    <div class="forum-list">
      <h2 class="list-title">
        {{ category.name }}
      </h2>

      <forum-list :forums="getCategoryForums(category.id)" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import ForumList from '@/components/ForumList.vue'

const props = defineProps({
  categories: { type: Array, required: true },
  forums: { type: Array, required: true }
})

const getCategoryForums = categoryId => props.forums.filter(forum => forum.categoryId === categoryId)
</script>

<style scoped>
</style>