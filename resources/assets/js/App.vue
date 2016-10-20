<template>
  <div :class="{'active': authenticated, 'menu-active': menuActive}" v-touch:swipeRight="setMenu(true)" v-touch:swipeLeft="setMenu(false)">
    <main-nav></main-nav>
    <div class="container-fluid margin-bottom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
 import store from './vuex/store';
 import mainNav from './components/Nav.vue';
 import Loader from './components/Loader.vue';
 import {checkAuth, logout} from './vuex/actions/auth';
 import * as menuActions from './vuex/actions/menu';
 export default {
     components: {
         mainNav,
         Loader
     },
     store: store,
     vuex: {
         getters: {
             authenticated: state => state.auth.authenticated,
             menuActive: state => state.menu.active
         },
         actions: {
             checkAuth: checkAuth,
             setMenu: menuActions.setMenu,
             logout: logout
         }
     },
     created(){
         this.checkAuth();
     }
 }
</script>
