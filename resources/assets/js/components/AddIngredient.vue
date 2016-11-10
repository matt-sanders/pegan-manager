<template>
  <div class="ingredient-item" :class="{'editing': ingredient.edit}" v-show="!ingredient.remove">
    <label for="ingredient_edit_{{idx}}" class="toggle-edit glyph-check">
      <input type="checkbox" v-model="ingredient.edit" id="ingredient_edit_{{idx}}">
      <span class="glyphicon glyphicon-pencil"></span>
    </label>
    <div v-show="ingredient.edit">
      <div v-show="!ingredient.isLabel" class="ing-input">
        <input type="text" v-model="ingredient.amount" placeholder="amt">
        <select v-model="ingredient.unit">
          <option value=''>No unit</option>
          <option v-for="unit in units" :value="unit._id">{{unit.single}}</option>
        </select>
        <select v-model="ingredient.ing_id">
          <option value=''>Select Ingredient</option>
          <option v-for="ing in availableIngredients" value="{{ing._id}}">{{ing.title}}{{ing.desc ? ' - '+ing.desc : ''}}</option>
        </select>
      </div>
      <div v-show="ingredient.isLabel" class="label-input">
        <input type="text" v-model="ingredient.label" placeholder="eg For the sauce">
      </div>
      <label for="ingredient_{{idx}}" :class="{'active': ingredient.isLabel}" class="label-toggle glyph-check">
        <input type="checkbox" v-model="ingredient.isLabel" value="true" id="ingredient_{{idx}}">
        <span class="glyphicon glyphicon-tag"></span>
      </label>

      <label for="ingredient_remove_{{idx}}" class="glyph-check">
        <input type="checkbox" v-model="ingredient.remove" value="true" id="ingredient_remove_{{idx}}">
        <span class="glyphicon glyphicon-remove"></span>
      </label>
    </div>
    <div v-show="!ingredient.edit">
      <div v-show="ingredient.label" class="ingredient-label">{{ingredient.label}}</div>
      <div v-show="!ingredient.label">{{ingredient.amount}} {{unitsById[ingredient.unit]}} {{ingredientLabel}}</div>
    </div>
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
         },
         unitsById: function(){
             let units = {};
             this.units.forEach( unit => {
                 units[ unit._id ] = unit.single;
             });
             return units;
         }
     },
     vuex: {
         getters: {
             availableIngredients: state => {
                 let ings = [...state.ingredients.ingredients];
                 return ings.sort(function(a, b){
                     if ( a.title < b.title ) return -1;
                     if ( a.title > b.title ) return 1;
                     return 0;
                 });
             },
             units: state => state.recipes.units
         }
     }
 }
</script>
