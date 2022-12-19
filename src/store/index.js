import { createStore } from 'vuex'

import sourceData from '@/assets/data.json'
import { filterIn, findIn, findIndexIn, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3' //batman
  },
  getters: {
    authUser(state) {
      const user = findIn(state.users).byId(state.authId)

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
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'abc' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', { post })
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    async createThread({ commit, dispatch, state }, { text, title, forumId }) {
      const id = 'abc' + Math.random()
      const publishedAt = Math.floor(Date.now() / 1000)
      const userId = state.authId
      const thread = { id, forumId, publishedAt, title, userId }

      commit('setThread', { thread })
      commit('appendThreadToForum', { threadId: id, forumId })
      commit('appendThreadToUser', { threadId: id, userId })

      await dispatch('createPost', { text, threadId: id })

      return findIn(state.threads).byId(id)
    },
    updateThread({ commit, state }, { title, text, id }) {
      const originalThread = findIn(state.threads).byId(id)
      const originalPost = findIn(state.posts).byId(originalThread.posts[0])
      const publishedAt = Math.floor(Date.now() / 1000)

      commit('setThread', { thread: { ...originalThread, publishedAt, title } })
      commit('setPost', { post: { ...originalPost, publishedAt, text } })
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = findIn(state.threads).byId(threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    setUser(state, { user, userId }) {
      const userIndex = findIndexIn(state.users).byId(userId)
      state.users[userIndex] = user
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    appendThreadToForum(state, { threadId, forumId }) {
      const forum = findIn(state.forums).byId(forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },
    appendThreadToUser(state, { threadId, userId }) {
      const user = findIn(state.users).byId(userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    }
  }
})
