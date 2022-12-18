<template lang="">
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id="post-text"
          v-model="text"
          name=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">
          Submit post
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['save-post'])

const text = ref('')

const save = () => {
  const post = {
    text: text.value,
    publishedAt: Math.floor(Date.now() / 1000),
    userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  }

  emit('save-post', { post })
 
  text.value = ''
}
</script>
