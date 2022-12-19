<template>
  <form
    @reset.prevent="$emit('reset')"
    @submit.prevent="$emit('submit', { title: formData.title, text: formData.text })"
  >
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        id="thread_title"
        v-model="formData.title"
        type="text"
        class="form-input"
        name="title"
      >
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        v-model="formData.text"
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
        :name="title ? 'Update' : 'Publish'"
      >
        {{ title ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

defineEmits(['reset', 'submit'])

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  }
})

const formData = { title: props.title, text: props.text }
</script>
