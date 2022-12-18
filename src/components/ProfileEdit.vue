<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name} profile picture`"
          class="avatar-xlarge img-update"
        >
      </p>

      <div class="form-group">
        <input
          v-model="formData.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        >
      </div>

      <div class="form-group">
        <input
          v-model="formData.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        >
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          id="user_bio"
          v-model="formData.bio"
          placeholder="Write a few words about yourself."
          class="form-input text-lead"
        />
      </div>

      <div class="stats">
        <span>{{ postsCount }} posts</span>
        <span>{{ threadsCount }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label
          class="form-label"
          for="user_website"
        >
          Website
        </label>
        <input
          id="user_website"
          v-model="formData.website"
          autocomplete="off"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label
          class="form-label"
          for="user_email"
        >
          Email
        </label>
        <input
          id="user_email"
          v-model="formData.email"
          autocomplete="off"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label
          class="form-label"
          for="user_location"
        >
          Location
        </label>
        <input
          id="user_location"
          v-model="formData.location"
          autocomplete="off"
          class="form-input"
        >
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost">
          Cancel
        </button>
        <button
          type="submit"
          class="btn-blue"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['save-user'])

const props = defineProps({
  user: { type: Object, required: true },
  postsCount: { type: Number, required: true },
  threadsCount: { type: Number, required: true }
})

const formData = { ...props.user }

const save = () => {
  emit('save-user', { ...formData })
}
</script>
