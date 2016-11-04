<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './components/Index.vue';
import Login from './components/Admin.vue';

export default {
  components: {
    Index,
    Login,
  }
}
</script>

<style>
</style>
