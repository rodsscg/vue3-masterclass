<template>
  <div
    v-if="thread && text"
    class="col-full push-top"
  >
    <h1>Editing <i>{{ thread.title }}</i></h1>
    <thread-editor
      :title="thread.title"
      :text="text"
      @reset="onReset"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import { findIn } from '@/helpers'
import ThreadEditor from '@/components/ThreadEditor.vue'

const router = useRouter()
const { dispatch, state } = useStore()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const thread = computed(() => findIn(state.threads).byId(props.id))
const text = computed(() => findIn(state.posts).byId(thread.value.posts[0])?.text ?? '')

const loadData = async () => {
  const loadedThread = await dispatch('fetchThread', { id: props.id })
  dispatch('fetchPost', { id: loadedThread.posts[0] })
}

const goToThread = () => {
  router.push({ name: 'Thread', params: { id: props.id } })
}

const onReset = () => {
  goToThread()
}

const onSubmit = async ({ title, text }) => {
  dispatch('updateThread', { title, text, id: props.id })
  goToThread()
}

loadData()
</script>
