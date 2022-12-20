import { initializeApp } from "firebase/app";
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import firebaseConfig from './config/firebase'

initializeApp(firebaseConfig);

const forumApp = createApp(App)

forumApp.use(router)
forumApp.use(store)

forumApp.mount('#app')
