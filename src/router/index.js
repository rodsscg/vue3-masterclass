import { createRouter, createWebHistory } from 'vue-router'

import sourceData from '@/assets/data.json'
import NotFound from '@/views/NotFound.vue'
import HomePage from '@/views/HomePage.vue'
import ThreadShow from '@/views/ThreadShow.vue'

const beforeEnterThread = (to, from, next) => {
  const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)

  // The pathMatch is used to maintain the incorrect URL passed by the user
  next(threadExists ? null : {
    name: 'NotFound',
    params: {
      pathMatch: to.path.substring(1).split('/')
    }
  })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    component: ThreadShow,
    props: true,
    beforeEnter: beforeEnterThread
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
