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
  timestamp: { type: [Number, Object], required: true }
})
console.log(props.timestamp)
const timestamp = computed(() => props.timestamp?.seconds ?? props.timestamp)
const relativeDate = computed(() => dayjs.unix(timestamp.value).fromNow())
const exactDate = computed(() => dayjs.unix(timestamp.value).format('LLLL'))
</script>