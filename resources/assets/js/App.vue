<template>
  <div>
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
 import store from './vuex/store';
 import mainNav from './components/Nav.vue';
 export default {
     components: {
         mainNav
     },
     store: store
 }
</script>
