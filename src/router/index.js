import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/components/HomePage.vue'
import ThreadShow from '@/components/ThreadShow.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/thread/:id', name: 'Thread', component: ThreadShow, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
