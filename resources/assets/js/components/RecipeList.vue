<template>
  <div class="margin-top" >
    <div v-show="recipes.length > 0" class="recipe-list">
      <table class="table table-hover">
        <tr>
          <th>Recipe</th>
          <th></th>
        </tr>
        <tr v-for="recipe in recipes">
          <td>
            <a v-link="'/recipe/'+recipe._id">{{recipe.title}}</a>
          </td>
          <td class="text-right">
            <a href="#" class="on-hover" @click.prevent="removeRecipe(recipe)">
              <span class="glyphicon glyphicon-remove"></span>
            </a>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="recipes.length == 0" class="alert alert-warning" role="alert">
      You don't have any recipes
    </div>
    
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
             recipes: state => state.recipes.recipes
         },
         actions: {
             setRecipes: recipeActions.setRecipes,
             deleteRecipe: recipeActions.deleteRecipe
         }
     },
     methods: {
         removeRecipe(recipe){
             
             let c = confirm('Are you sure you want to delete this recipe?');
             if ( c == true ){
                 this.deleteRecipe(recipe);
             }
             
         }
     },
     created(){
         this.setRecipes();
     }
 }
</script>
