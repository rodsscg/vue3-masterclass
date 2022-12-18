<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <profile-card
          :user="user"
          :posts-count="posts.length"
          :threads-count="threads.length"
        />

        <profile-edit
          :user="user"
          :posts-count="posts.length"
          :threads-count="threads.length"
          @save-user="saveUser"
        />

        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>

        <div class="text-center">
          <hr>
          <a
            href="edit-profile.html"
            class="btn-green btn-small"
          >Edit Profile</a>
        </div>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">
            Joker's recent activity
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
import { computed } from 'vue'
import { useStore } from 'vuex'

import PostList from '@/components/PostList.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'

const store = useStore()

const user = computed(() => store.getters.authUser)
const users = computed(() => store.state.users)
const posts = computed(() => user.value.posts)
const threads = computed(() => user.value.threads)

const saveUser = (payload) => store.dispatch('updateUser', payload)
</script>

<style scoped>
</style>