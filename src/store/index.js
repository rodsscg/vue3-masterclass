import { createStore } from 'vuex'

import sourceData from '@/assets/data.json'
import { filterIn, findIn, findIndexIn, upsert } from '@/helpers'

const makeAppendChildToParentMutation = ({ parent, child }) => (state, { childId, parentId }) => {
  const resource = state[parent].find(item => item.id === parentId)
  resource[child] = resource[child] || []
  if (!resource[child].includes(childId)) resource[child].push(childId)
}

export default createStore({
  state: {
    ...sourceData,
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
        if (!thread) return null

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

      commit('setPost', { post })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId })
    },
    async createThread({ commit, dispatch, state }, { text, title, forumId }) {
      const id = 'abc' + Math.random()
      const publishedAt = Math.floor(Date.now() / 1000)
      const userId = state.authId
      const thread = { id, forumId, publishedAt, title, userId }

      commit('setThread', { thread })
      commit('appendThreadToForum', { childId: id, parentId: forumId })
      commit('appendThreadToUser', { childId: id, parentId: userId })

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
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    setUser(state, { user, userId }) {
      const userIndex = findIndexIn(state.users).byId(userId)
      state.users[userIndex] = user
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    }
  }
})
