<template>
  <div class="ingredient-list">
    <form v-on:submit.prevent="submit">
      <button type="submit">New Ingredient</button>
      <add-ingredient class="ingredient-wrap" v-for="ingredient in ingredients" :ingredient="ingredient"></add-ingredient>
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
             setIngredients: ingredientActions.setIngredients
         }
     },
     components: {
         addIngredient,
         ingredientEdit
     },
     methods: {
         addIngredient(){
             let ingredient = {
                 label: '',
                 unit: 'cup',
                 amount: '',
                 ing_id: '',
                 isLabel: false
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
