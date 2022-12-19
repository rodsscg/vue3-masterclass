<template>
  <div class="profile-card">
    <p class="text-center">
      <img
        :src="user.avatar"
        alt="`${user.name} profile picture`"
        class="avatar-xlarge"
      >
    </p>

    <h1 class="title">
      {{ user.username }}
    </h1>

    <p class="text-lead">
      {{ user.name }}
    </p>

    <p class="text-justify">
      {{ user.bio || 'No bio specified' }}
    </p>

    <span class="online">{{ user.username }} is online</span>


    <div class="stats">
      <span>{{ postsCount }} posts</span>
      <span>{{ threadsCount }} threads</span>
    </div>

    <hr>

    <p
      v-if="user.website"
      class="text-large text-center"
    >
      <i class="fa fa-globe" />
      <a :href="user.website">
        {{ user.website }}</a>
    </p>

    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>

    <div class="text-center">
      <hr>
      <router-link
        :to="{ name:'ProfileEdit' }"
        class="btn-green btn-small"
      >
        Edit Profile
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  user: { type: Object, required: true },
  postsCount: { type: Number, required: true },
  threadsCount: { type: Number, required: true }
})
</script>
