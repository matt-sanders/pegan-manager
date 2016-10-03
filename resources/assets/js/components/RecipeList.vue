<template>
  <div>
    <div v-show="recipes.length > 0" class="recipe-list">
      
    </div>
    <div v-show="recipes.length == 0" class="alert alert-warning" role="alert">
      You don't have any recipes
    </div>

    {{recipes.length}}
    <a v-link="'/recipe/new'" class="new-recipe btn btn-success">
      <span class="glyphicon glyphicon-plus"></span>
    </a>
  </div>
</template>

<script>
 import * as recipeActions from '../vuex/actions/recipes';
 export default {
     data() {
         return {

         }
     },
     vuex: {
         getters: {
             recipes: state => state.recipes
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
