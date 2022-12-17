<template>
  <span :title="exactDate">
    {{ relativeDate }}
  </span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const props = defineProps({
  timestamp: { type: Number, required: true }
})

const relativeDate = computed(() => dayjs.unix(props.timestamp).fromNow())
const exactDate = computed(() => dayjs.unix(props.timestamp).format('LLLL'))
</script>