<template>
  <div v-if="categories.length">
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
  </div>
  <div
    v-else
    class="container col-full push-top"
  >
    <div class="text-center">
      <h1>No categories found</h1>
    </div>
  </div>
</template>

<script setup>
import { filterIn } from '@/helpers'
import ForumList from '@/components/ForumList.vue'

const props = defineProps({
  categories: { type: Array, required: true },
  forums: { type: Array, required: true }
})

const getCategoryForums = categoryId => filterIn(props.forums).where('categoryId', categoryId)
</script>

<style scoped>
</style>