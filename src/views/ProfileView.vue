<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <profile-edit
          v-if="isEditing"
          :user="user"
          :posts-count="posts.length"
          :threads-count="threads.length"
          @cancel-edit="cancelEdit"
          @save-user="saveUser"
        />

        <profile-card
          v-else
          :user="user"
          :posts-count="posts.length"
          :threads-count="threads.length"
        />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">
            {{ user.username }}'s recent activity
          </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr>

        <post-list
          :posts="posts"
          :users="users"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import PostList from '@/components/PostList.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'

const store = useStore()
const router = useRouter()

defineProps({
  isEditing: { type: Boolean, default: false }
})

const user = computed(() => store.getters.authUser)
const users = computed(() => store.state.users)
const posts = computed(() => user.value.posts)
const threads = computed(() => user.value.threads)

const returnToProfile = () => {
  router.push({ name: 'Profile' })
}

const saveUser = (payload) => {
  store.dispatch('updateUser', payload)
  returnToProfile()
}

const cancelEdit = () => {
  returnToProfile()
}
</script>

<style scoped>
</style>