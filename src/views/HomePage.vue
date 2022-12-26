<template>
  <h1>Welcome to the Forum</h1>
  <category-list
    :categories="categories"
    :forums="forums"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import CategoryList from '@/components/CategoryList.vue'

const { state, dispatch } = useStore()

const categories = computed(() => state.categories)
const forums = computed(() => state.forums)

const loadCategories = async () => {
  const categories = await dispatch('fetchAllCategories')
  const forumIds = categories.map(category => category.forums).flat()

  dispatch('fetchForums', { ids: forumIds })
}

loadCategories()

</script>
