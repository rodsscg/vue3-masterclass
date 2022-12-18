<template>
  <h1>Welcome to the Forum</h1>
  <category-list
    :categories="categories"
    :forums="forums"
  />
</template>

<script setup>
import { reactive } from 'vue'

import sourceData from '@/assets/data.json'
import CategoryList from '@/components/CategoryList.vue'

const categories = reactive(sourceData.categories)
const forums = reactive(sourceData.forums)
</script>
