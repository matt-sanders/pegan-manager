<template>
  <div :class="{'active': authenticated}">
    <main-nav></main-nav>
    <div class="container-fluid margin-bottom">
      <toggle-nav></toggle-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
 import store from './vuex/store';
 import mainNav from './components/Nav.vue';
 import Loader from './components/Loader.vue';
 import ToggleNav from './components/ToggleNav.vue';
 import {checkAuth} from './vuex/actions/auth';
 export default {
     components: {
         mainNav,
         Loader,
         ToggleNav
     },
     store: store,
     vuex: {
         getters: {
             authenticated: state => state.auth.authenticated
         },
         actions: {
             checkAuth: checkAuth
         }
     },
     created(){
         this.checkAuth();
     }
 }
</script>
