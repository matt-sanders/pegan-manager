<template>
  <div>
    <div v-show="recipes.length > 0" class="recipe-list">
      
    </div>
    <div v-show="recipes.length == 0" class="alert alert-warning" role="alert">
      You don't have any recipes
    </div>
  </div>
</template>

<script>
 import * as actions from '../vuex/actions';
 export default {
     data() {

     },
     vuex: {
         getters: {
             recipes: state => state.recipes.recipes
         },
         actions: {
             setRecipes: actions.setRecipes
         }
     },
     created(){
         this.setRecipes();
     }
 }
</script>
