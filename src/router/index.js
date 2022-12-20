import { createRouter, createWebHistory } from 'vue-router'

// import { findIn } from '@/helpers'
// import store from '@/store'
import NotFound from '@/views/NotFound.vue'
import HomePage from '@/views/HomePage.vue'
import ForumPage from '@/views/ForumPage.vue'
import ProfileView from '@/views/ProfileView.vue'
import ThreadCreate from '@/views/ThreadCreate.vue'
import ThreadEdit from '@/views/ThreadEdit.vue'
import ThreadShow from '@/views/ThreadShow.vue'

// const beforeEnterThread = (to, from, next) => {
//   const threadExists = findIn(store.state.threads).byId(to.params.id)

//   // The pathMatch is used to maintain the incorrect URL passed by the user
//   next(threadExists ? null : {
//     name: 'NotFound',
//     params: {
//       pathMatch: to.path.substring(1).split('/')
//     }
//   })
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: ForumPage,
    props: true
  },
  {
    path: '/me',
    name: 'Profile',
    component: ProfileView,
    meta: {
      toTop: true,
      smoothScroll: true
    }
  },
  {
    path: '/edit',
    name: 'ProfileEdit',
    component: ProfileView,
    props: { isEditing: true }
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    component: ThreadShow,
    props: true
    // beforeEnter: beforeEnterThread
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.meta.toTop) {
      return { top: 0, behavior: to.meta.smoothScroll ? 'smooth' : 'auto' }
    }
  }
})
