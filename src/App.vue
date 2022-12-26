<template>
  <the-navbar />
  <div class="push-top">
    <router-view />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import TheNavbar from './components/TheNavbar.vue'

const { dispatch } = useStore()

dispatch('fetchAuthUser')
</script>

<style>
@import "assets/style.css";
</style>
