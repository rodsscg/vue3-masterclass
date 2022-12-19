<template>
  <div class="col-full push-top">
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
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import ThreadEditor from '@/components/ThreadEditor.vue'

const router = useRouter()
const { dispatch, state } = useStore()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const thread = computed(() => state.threads.find(t => t.id === props.id))
const text = computed(() => state.posts.find(p => p.id === thread.value.posts[0]).text)

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
</script>
