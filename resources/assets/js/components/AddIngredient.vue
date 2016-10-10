<template>
  <div class="ingredient-item">
    <div v-show="ingredient.edit">
      <div v-show="!ingredient.label">
        <input type="text" v-model="ingredient.amount" placeholder="amt">
        <select v-model="ingredient.unit">
          <option value="cup">Cup</option>
        </select>
        <select v-model="ingredient.ing_id">
          <option value=''>Select Ingredient</option>
          <option v-for="ing in availableIngredients" value="{{ing._id}}">{{ing.title}}</option>
        </select>
      </div>
      <div v-show="ingredient.label">
        <input type="text" v-model="ingredient.label" placeholder="eg For the sauce">
      </div>
      <label for="ingredient_{{idx}}" class="'active': ingredient.isLabel">
        label
        <input type="checkbox" v-model="ingredient.label" value="true" id="ingredient_{{idx}}">
      </label>
    </div>
    <div v-show="!ingredient.edit">
      <div v-show="ingredient.label">{{ingredient.label}}</div>
      <div v-show="!ingredient.label">{{ingredient.amount}} {{ingredient.unit}} {{ingredientLabel}}</div>
    </div>
    <label for="ingredient_edit_{{idx}}">
      edit
      <input type="checkbox" v-model="ingredient.edit" id="ingredient_edit_{{idx}}">
    </label>
  </div>
</template>

<script>
 import * as ingredientActions from '../vuex/actions/ingredients';
 export default {
     props: ['ingredient','idx'],
     computed: {
         ingredientLabel: function(){
             let ingredient = this.availableIngredients.filter(ing => {
                 return this.ingredient.ing_id == ing._id;
             });
             return ingredient.length == 0 ? '' : ingredient[0].title;
         }
     },
     vuex: {
         getters: {
             availableIngredients: state => state.ingredients.ingredients
         }
     }
 }
</script>
