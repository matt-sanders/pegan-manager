<template>
  <div class="ingredient-list">
    <h4>Ingredients</h4>
    <form v-on:submit.prevent="submit">
      <div class="btn-group">
        <button class="btn btn-default" type="submit">Add Ingredient</button>
        <button class="btn btn-default" type="button" @click.prevent="openAddIngredient(true)">Create Ingredient</button>
      </div>
      <div class="ingredient-items margin-top">
        <add-ingredient class="ingredient-wrap" v-for="ingredient in ingredients" :ingredient.sync="ingredient" :idx="$index"></add-ingredient>
      </div>
    </form>
    <ingredient-edit></ingredient-edit>
  </div>
</template>

<script>
 import addIngredient from './AddIngredient.vue';
 import ingredientEdit from './IngredientEdit.vue';
 import * as ingredientActions from '../vuex/actions/ingredients';
 export default {
     props: ['ingredients'],
     data(){
         return {}
     },
     vuex: {
         actions: {
             saveIngredient: ingredientActions.saveIngredient,
             setIngredients: ingredientActions.setIngredients,
             openAddIngredient: ingredientActions.openAddIngredient
         }
     },
     components: {
         addIngredient,
         ingredientEdit
     },
     methods: {
         addIngredient(){
             let ingredient = {
                 label: false,
                 unit: 'cup',
                 amount: '',
                 ing_id: '',
                 edit: true
             };
             this.ingredients.push(ingredient);
         },
         submit(){
             this.addIngredient();
         }
     },
     created: function(){
         this.setIngredients();
     }
 }
</script>
