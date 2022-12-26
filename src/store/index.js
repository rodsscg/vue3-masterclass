import { createStore } from 'vuex'

import { filterIn, findIn, upsert } from '@/helpers'
import { getAllDocs, getDocById } from '@/services/firestore'

const makeAppendChildToParentMutation = ({ parent, child }) => (state, { childId, parentId }) => {
  const resource = state[parent].find(item => item.id === parentId)
  resource[child] = resource[child] || []
  if (!resource[child].includes(childId)) resource[child].push(childId)
}

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3' //batman
  },
  getters: {
    authUser(state, getters) {
      return getters.user(state.authId)
    },
    user(state) {
      return (id) => {
        const user = findIn(state.users).byId(id)
        if (!user) return null

        return {
          ...user,
          get posts() {
            return filterIn(state.posts).where('userId', user.id)
          },
          get postsCount() {
            return this.posts.length
          },
          get threads() {
            return filterIn(state.threads).where('userId', user.id)
          },
          get threadsCount() {
            return this.threads.length
          }
        }
      }
    },
    thread(state) {
      return (id) => {
        const thread = findIn(state.threads).byId(id)
        if (!thread) return {}

        return {
          ...thread,
          get author() {
            return findIn(state.users).byId(thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors?.length || 0
          }
        }
      }
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'abc' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setItem', { resource: 'posts', item: post })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId })
    },

    async createThread({ commit, dispatch, state }, { text, title, forumId }) {
      const id = 'abc' + Math.random()
      const publishedAt = Math.floor(Date.now() / 1000)
      const userId = state.authId
      const thread = { id, forumId, publishedAt, title, userId }

      commit('setItem', { resource: 'threads', item: thread })
      commit('appendThreadToForum', { childId: id, parentId: forumId })
      commit('appendThreadToUser', { childId: id, parentId: userId })

      await dispatch('createPost', { text, threadId: id })

      return findIn(state.threads).byId(id)
    },

    updateThread({ commit, state }, { title, text, id }) {
      const originalThread = findIn(state.threads).byId(id)
      const originalPost = findIn(state.posts).byId(originalThread.posts[0])
      const publishedAt = Math.floor(Date.now() / 1000)

      commit('setItem', { resource: 'threads', item: { ...originalThread, publishedAt, title } })
      commit('setItem', { resource: 'posts', item: { ...originalPost, publishedAt, text } })
    },

    updateUser({ commit }, user) {
      commit('setItem', { resource: 'users', item: user })
    },

    async fetchAllCategories({ commit }) {
      const docs = await getAllDocs('categories')

      return docs.map(doc => {
        const item = { id: doc.id, ...doc.data() }
        commit('setItem', { resource: 'categories', item })
        return item
      })
    },

    fetchForum({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'forums', id })
    },

    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'threads', id })
    },

    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'posts', id })
    },
    
    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'users', id })
    },

    fetchForums({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'forums', ids })
    },

    fetchThreads({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'threads', ids })
    },

    fetchPosts({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'posts', ids })
    },

    fetchUsers({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'users', ids })
    },

    async fetchItem({ commit }, { resource, id }) {
      const resourceSnap = await getDocById(resource, id)

      if (!resourceSnap.exists()) return null

      const item = { ...resourceSnap.data(), id: resourceSnap.id }

      commit('setItem', { resource, item })
      
      return item
    },

    fetchItems({ dispatch }, { resource, ids }) {
      return Promise.all(ids.map(id => dispatch('fetchItem', { resource, id })))
    }
  },
  mutations: {
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    setItem: (state, { resource, item }) => upsert(state[resource], item)
  }
})
