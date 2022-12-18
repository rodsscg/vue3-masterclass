<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">
        Threads
      </h2>

      <div
        v-for="thread in threads"
        :key="thread.id"
        class="thread"
      >
        <div>
          <p>
            <router-link :to="{ name: 'Thread', params: { id: thread.id } }">
              {{ thread.title }}
            </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a>,
            <base-date :timestamp="thread.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.posts.length === 1 ? '1 reply' : `${thread.posts.length} replies` }}
          </p>

          <img
            :src="userById(thread.userId).avatar"
            class="avatar-medium"
            alt="user avatar"
          >

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <base-date
              :timestamp="thread.publishedAt"
              class="text-xsmall text-faded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import BaseDate from '@/components/BaseDate.vue';

const props = defineProps({
  threads: { type: Array, required: true},
  users: { type: Array, required: true}
})

const userById = (userId) => props.users.find(u => u.id === userId)
</script>

<style scoped>
  .thread-list {
  padding: 0;
  background-color: white;
}

.thread-list .thread {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 20px;
  min-height: 45px;
}

.thread-list .thread:nth-child(odd) {
  background: rgba(73, 89, 96, 0.06);
  border-bottom-left-radius: 20px;
}

.thread-list .thread:last-child {
  border-bottom-left-radius: 0;
}

.thread-list .thread .replies-count {
  flex-basis: 35%;
}

.thread-list .thread .activity {
  flex-basis: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.thread-list .thread .activity .avatar-medium {
  margin-right: 10px;
}

.thread-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>