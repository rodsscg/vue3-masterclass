import { filterIn, findIn } from '@/helpers'

export default {
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
          return user.postsCount ?? 0
        },
        get threads() {
          return filterIn(state.threads).where('userId', user.id)
        },
        get threadsCount() {
          return user.threads?.length ?? 0
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
}
