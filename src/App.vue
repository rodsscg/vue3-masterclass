<template>
  <the-navbar />
  <div class="container push-top">
    <router-view />
  </div>
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue';
</script>

<style>
@import "assets/style.css";
</style>
