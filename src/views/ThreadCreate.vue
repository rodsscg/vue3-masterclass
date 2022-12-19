<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>
    <thread-editor
      @reset="onReset"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import { findIn } from '@/helpers'
import ThreadEditor from '@/components/ThreadEditor.vue'

const router = useRouter()
const { dispatch, state } = useStore()

const props = defineProps({
  forumId: {
    type: String,
    required: true,
  },
})

const forum = computed(() => findIn(state.forums).byId(props.forumId))

const onReset = () => {
  router.push({ name: 'Forum', params: { id: props.forumId } })
}

const onSubmit = async ({ title, text }) => {
  const thread = await dispatch('createThread', { title, text, forumId: props.forumId })
  router.push({ name: 'Thread', params: { id: thread.id } })
}
</script>
