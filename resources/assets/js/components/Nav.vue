<template>
  <div id="main-nav" :class="{'active': authenticated}">
    <div class="nav-item" v-for="item in items">
      <a v-link="item.route">
        <span class="glyphicon glyphicon-{{item.icon}}"></span>
        <span class="nav-label">{{item.label}}</span>
      </a>
    </div>
  </div>
</template>

<script>
 export default {
     data(){
         return {
             items: [
                 {
                     label: 'Recipes',
                     route: 'recipes',
                     icon: 'cutlery'
                 },
                 {
                     label: 'Ingredients',
                     route: 'ingredients',
                     icon: 'apple'
                 },
                 {
                     label: 'Logout',
                     route: 'logout',
                     icon: 'off'
                 }
             ]
         }
     },
     vuex: {
         getters: {
             authenticated: state => state.auth.authenticated
         }
     }
 }
</script>
