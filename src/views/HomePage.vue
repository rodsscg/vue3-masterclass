<template>
  <h1>Welcome to the Forum</h1>
  <thread-list :threads="threads" />
</template>

<script setup>
import { ref } from 'vue'

import sourceData from '@/assets/data.json'
import ThreadList from '@/components/ThreadList.vue'

const threads = ref(sourceData.threads)
</script>
