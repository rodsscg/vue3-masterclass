<template lang="">
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id="post-text"
          v-model="postCopy.text"
          name=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">
          {{ post.id ? 'Update Post' : 'Submit post' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['save-post'])

const props = defineProps({
  post: {
    type: Object,
    default: () => ({ text: null })
  }
})

const postCopy = reactive({ ...props.post })

const save = () => {
  emit('save-post', { post: postCopy })
 
  postCopy.text.value = ''
}
</script>
