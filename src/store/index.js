import { createStore } from 'vuex'
import sourceData from '@/assets/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3' //batman
  },
  getters: {
    authUser(state) {
      const user = state.users.find(user => user.id === state.authId)

      if (!user) return null

      return {
        ...user,
        get posts() {
          return state.posts.filter(post => post.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threads() {
          return state.threads.filter(thread => thread.userId === user.id)
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

      return state.threads.find(thread => thread.id === id)
    },
    updateThread({ commit, state }, { title, text, id }) {
      const originalThread = state.threads.find(thread => thread.id === id)
      console.log('originalThread', originalThread)

      const originalPost = state.posts.find(post => post.id === originalThread.posts[0])
      console.log('originalPost', originalPost)
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
      const index = state.posts.findIndex(p => p.id === post.id)

      if (post.id && index !== -1) {
        state.posts[index] = post
      } else {
        state.posts.push(post)
      }
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find(thread => thread.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(u => u.id === userId)
      state.users[userIndex] = user
    },
    setThread(state, { thread }) {
      const index = state.threads.findIndex(t => t.id === thread.id)

      if (thread.id && index !== -1) {
        state.threads[index] = thread
      } else {
        state.threads.push(thread)
      }
    },
    appendThreadToForum(state, { threadId, forumId }) {
      const forum = state.forums.find(forum => forum.id === forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },
    appendThreadToUser(state, { threadId, userId }) {
      const user = state.users.find(user => user.id === userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    }
  }
})
