import { createStore } from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3' //batman
  },
  getters: { ...getters },
  actions: { ...actions },
  mutations: { ...mutations }
})
