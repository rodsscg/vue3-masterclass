import { findIn } from '@/helpers'
import {
  arrayUnion,
  batch,
  getAllDocs,
  getDoc,
  getDocById,
  getDocRef,
  increment,
  serverTimestamp
} from '@/services/firestore'

export default {
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id }),
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }),
  fetchAuthUser: ({ dispatch, state }) => dispatch('fetchUser', { id: state.authId }),
  
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'threads', ids }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'posts', ids }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids }),

  async fetchAllCategories({ commit }) {
    const docs = await getAllDocs('categories')

    return docs.map(doc => {
      const item = { id: doc.id, ...doc.data() }
      commit('setItem', { resource: 'categories', item })
      return item
    })
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
  },

  async createPost({ commit, state }, post) {
    const postRef = getDocRef('posts')
    const threadRef = getDocRef('threads', post.threadId)
    const userRef = getDocRef('users', state.authId)

    post.userId = state.authId
    post.publishedAt = serverTimestamp()

    await batch()
      .set(postRef, post)
      .update(threadRef, { posts: arrayUnion(postRef.id), contributors: arrayUnion(post.userId) })
      .update(userRef, { postsCount: increment(1) })
      .commit()

    const newPost = await getDoc(postRef)

    commit('setItem', { resource: 'posts', item: { ...newPost.data(), id: newPost.id } })
    commit('appendPostToThread', { childId: newPost.id, parentId: post.threadId })
    commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId })
  },

  async createThread({ commit, dispatch, state }, { text, title, forumId }) {
    const userId = state.authId

    const threadRef = getDocRef('threads')
    const forumRef = getDocRef('forums', forumId)
    const userRef = getDocRef('users', userId)

    const publishedAt = serverTimestamp()
    const thread = { forumId, publishedAt, title, userId, id: threadRef.id }

    await batch()
      .set(threadRef, thread)
      .update(forumRef, { threads: arrayUnion(threadRef.id) })
      .update(userRef, { threads: arrayUnion(threadRef.id) })
      .commit()

    const newThread = await getDoc(threadRef)

    commit('setItem', { resource: 'threads', item: { ...newThread.data(), id: newThread.id } })
    commit('appendThreadToForum', { childId: threadRef.id, parentId: forumId })
    commit('appendThreadToUser', { childId: threadRef.id, parentId: userId })

    await dispatch('createPost', { text, threadId: threadRef.id })

    return findIn(state.threads).byId(threadRef.id)
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
  }
}
