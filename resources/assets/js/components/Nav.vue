<template>
  <div id="main-nav" v-touch:swipeLeft="setMenu(false)">
    <div class="nav-item" v-for="item in items">
      <a v-link="item.route">
        <span class="glyphicon glyphicon-{{item.icon}}"></span>
        <span class="nav-label">{{item.label}}</span>
      </a>
    </div>
  </div>
</template>

<script>
 import * as menuActions from '../vuex/actions/menu';
 export default {
     data(){
         return {
             items: [
                 {
                     label: 'Recipes',
                     route: '/recipes',
                     icon: 'cutlery'
                 },
                 {
                     label: 'Logout',
                     route: '/logout',
                     icon: 'off'
                 }
             ]
         }
     },
     actions: {
         setMenu: menuActions.setMenu
     }
 }
</script>
