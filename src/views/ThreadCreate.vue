<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <form
      @reset.prevent="onReset"
      @submit.prevent="onSubmit"
    >
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          id="thread_title"
          v-model="title"
          type="text"
          class="form-input"
          name="title"
        >
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          v-model="text"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        />
      </div>

      <div class="btn-group">
        <button
          type="reset"
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          class="btn btn-blue"
          type="submit"
          name="Publish"
        >
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter()
const { dispatch, state } = useStore()

const props = defineProps({
  forumId: {
    type: String,
    required: true,
  },
})

let title = ''
let text = ''

const forum = computed(() => state.forums.find(f => f.id === props.forumId))

const onReset = () => {
  router.push({ name: 'Forum', params: { id: props.forumId } })
}

const onSubmit = async () => {
  const thread = await dispatch('createThread', { title, text, forumId: props.forumId })
  router.push({ name: 'Thread', params: { id: thread.id } })
}
</script>
