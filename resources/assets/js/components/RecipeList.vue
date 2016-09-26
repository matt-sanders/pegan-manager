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
 import * as recipeActions from '../vuex/actions/recipes';
 export default {
     data() {

     },
     vuex: {
         getters: {
             recipes: state => state.recipes.recipes
         },
         actions: {
             setRecipes: recipeActions.setRecipes
         }
     },
     created(){
         this.setRecipes();
     }
 }
</script>
