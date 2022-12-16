<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div class="container">
    <home-page />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
@import "assets/style.css";
</style>
