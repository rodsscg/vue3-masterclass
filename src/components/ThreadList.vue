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
            By <a href="#">{{ userById(thread.userId).name }}</a>, {{ thread.publishedAt }}.
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
            <p class="text-xsmall text-faded">
              {{ thread.publishedAt }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import sourceData from '@/assets/data.json'

defineProps({
  threads: { type: Array, required: true}
})

const users = reactive(sourceData.users)

const userById = (userId) => users.find(u => u.id === userId)
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

.reactions {
  display: flex;
  justify-content: flex-end;
  flex: 100%;
  position: relative;
}

.reactions button {
  display: flex;
  align-items: center;
  padding: 5px 8px;
  margin-left: 2px;
  color: #545454;
  border-radius: 5px;
}

.reactions button:hover {
  background: rgba(115, 192, 151, 0.25) !important;
  color: #545454 !important;
}

.reactions button.active-reaction {
  background: rgba(115, 192, 151, 0.12);
}

.reactions button.active-reaction:hover {
  background: white !important;
}

.reactions button .emoji {
  margin-right: 3px;
  font-size: 18px;
}

.reactions button.add-reaction .emoji {
  margin-left: 3px;
  margin-right: 0px;
}

.reactions ul {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: -45px;
  background-color: white !important;
}

.reactions ul li {
  font-size: 28px;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  opacity: 0.7;
}

.reactions ul li:hover {
  opacity: 1;
  border-radius: 5px;
  cursor: pointer;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  color: #838486;
}

.pagination button {
  background: #95cbb7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  padding: 0px;
  height: 35px;
  width: 35px;
  font-size: 22px;
}

.pagination button:hover {
  background: #57AD8D;
}

.pagination button:disabled {
  cursor: not-allowed;
}

.pagination button:disabled:hover {
  background: #95cbb7;
}

.pagination button:disabled:active {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.post-list {
  margin-top: 20px;
}

.post {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  padding: 20px 10px;
  padding-bottom: 7px;
  box-shadow: 2px 2px 1px rgba(136, 136, 136, 0.09);
  margin-bottom: 20px;
}

@media (max-width: 820px) {
  .post {
    padding: 0;
  }
}

.post .user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  flex: 1 1 15%;
  margin-right: 5px;
}

.post .user-info>* {
  margin-bottom: 10px;
}

@media (max-width: 820px) {
  .post .user-info {
    order: -2;
    flex-direction: row;
    justify-content: flex-start;
    background: rgba(73, 89, 96, 0.06);
    margin-right: 0;
    padding: 5px;
    padding-left: 10px;
  }

  .post .user-info .avatar-large {
    height: 35px;
    width: 35px;
    margin-right: 5px;
    order: 1;
  }

  .post .user-info .user-name {
    order: 2;
  }

  .post .user-info>* {
    margin-right: 5px;
    margin-bottom: 0;
  }
}

.post .post-date {
  flex-basis: 100%;
  font-size: 14px;
  text-align: right;
  margin-bottom: 5px;
  padding-right: 7px;
}

@media (max-width: 820px) {
  .post .post-date {
    order: -1;
    flex-basis: 40%;
    background: rgba(73, 89, 96, 0.06);
    padding-right: 10px;
    padding-top: 16px;
    margin-bottom: 0px;
  }
}

@media (max-width: 720px) {
  .post {
    padding: 0px;
  }
}

.post-content {
  display: flex;
  flex: 1 0 83%;
  padding-left: 15px;
  padding-right: 10px;
  font-size: 16px;
  text-align: justify;
  line-height: 1.5;
  word-break: break-word;
}

.post-content h1,
.post-content h2,
.post-content h3 {
  margin-bottom: 0;
}

.post-content p {
  margin-bottom: 20px;
}

.post-content pre {
  display: grid;
  overflow: auto;
  word-wrap: break-word;
  border-radius: 3px;
  padding: 10px;
}

.post-content blockquote {
  margin: 25px 0px;
}

.post-content blockquote.big {
  display: flex;
  position: relative;
}

.post-content blockquote.big::before {
  position: absolute;
  top: -25px;
  left: -25px;
  font-size: 42px;
  font-family: FontAwesome;
  content: "\f10e";
  color: #263959;
}

@media (max-width: 820px) {
  .post-content blockquote.big::before {
    top: -15px;
    left: -18px;
    font-size: 32px;
  }
}

.post-content blockquote.big .quote {
  padding-left: 20px;
  padding-right: 15px;
  flex-basis: 95%;
  font-weight: 100;
  font-style: italic;
  font-size: 17px;
}

.post-content blockquote.big .author {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

.post-content blockquote.big .author img {
  flex: 1;
  flex-basis: 100%;
  margin-top: 10px;
  width: 80px;
  height: 80px;
}

.post-content blockquote.small {
  position: relative;
  flex-direction: column;
  border: 2px solid rgba(152, 152, 152, 0.15);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.post-content blockquote.small::before {
  position: absolute;
  top: -20px;
  left: -20px;
  font-size: 42px;
  font-family: FontAwesome;
  content: "\f10e";
  color: #263959;
}

@media (max-width: 820px) {
  .post-content blockquote.small::before {
    top: -18px;
    left: -15px;
    font-size: 32px;
  }
}

.post-content blockquote.small .author {
  display: flex;
  flex-basis: 100%;
  padding: 3px 10px 3px 28px;
  background-color: rgba(152, 152, 152, 0.15);
  justify-content: center;
  align-items: center;
}

.post-content blockquote.small .author .time {
  margin-left: 10px;
}

.post-content blockquote.small .author .fa {
  margin-left: auto;
  font-size: 20px;
}

.post-content blockquote.small .author .fa:hover {
  cursor: pointer;
}

.post-content blockquote.small .quote {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 10px;
  font-weight: 100;
  font-style: italic;
  font-size: 17px;
}

.post-content blockquote.simple {
  position: relative;
  padding: 0px 10px 0px 20px;
  font-weight: 100;
  font-style: italic;
  font-size: 17px;
  letter-spacing: .15px;
}

.post-content blockquote.simple::before {
  position: absolute;
  top: -25px;
  left: -25px;
  font-size: 42px;
  font-family: FontAwesome;
  content: "\f10e";
  color: #263959;
}

@media (max-width: 820px) {
  .post-content blockquote.simple::before {
    top: -15px;
    left: -18px;
    font-size: 32px;
  }
}

.post-content blockquote.simple .author {
  display: block;
  margin-top: 10px;
  font-weight: normal;
}

.post-content blockquote.simple .author .time {
  margin-left: 10px;
}

.post-listing-editor {
  flex: 1 1 83%;
}
</style>