<template>
  <div class="toggle-nav-wrapper">
    <a href="#" @click.prevent="setMenu(true)" class="toggle-menu-open"></a>
    <a href="#" @click.prevent="setMenu(false)" class="toggle-menu-cover"></a>
  </div>
</template>

<script>
 import * as menuActions from '../vuex/actions/menu';
 export default {
     vuex: {
         getters: {
             menuActive: state => state.menu.active
         },
         actions: {
             setMenu: menuActions.setMenu
         }
     }
 }
</script>
