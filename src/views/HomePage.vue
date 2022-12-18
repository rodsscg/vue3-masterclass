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

const store = useStore()

const categories = computed(() => store.state.categories)
const forums = computed(() => store.state.forums)
</script>
