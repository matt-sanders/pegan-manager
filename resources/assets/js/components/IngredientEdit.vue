<template>
  <div class="newIngredient">
    <form v-on:submit.prevent="submit">
      <formly-form :form="ingredientForm">
        <button class="btn btn-success" :disabled="!ingredientForm.$valid">{{this.working ? 'Saving...' : 'Save'}}</button>
      </formly-form>
    </form>
  </div>
</template>

<script>
 import * as ingredientActions from '../vuex/actions/ingredients';
 export default {
     data(){
         return {
             working: false,
             ingredientForm: {
                 title: {
                     type: 'input',
                     label: 'title',
                     required: true
                 },
                 desc: {
                     type: 'input',
                     label: 'description'
                 },
                 recipeId: {
                     type: 'input',
                     label: 'recipeId'
                 }
             }
         }
     },
     vuex: {
         actions: {
             saveIngredient: ingredientActions.saveIngredient
         }
     },
     methods: {
         submit(){
             if ( this.working || !this.ingredientForm.$valid ) return;

             let ingredient = {};
             Object.keys(this.ingredientForm).forEach(key => {
                 //stop the data binding so we can clear the form on success
                 ingredient[key] = this.ingredientForm[key].value+'';
             });

             this.saveIngredient(ingredient);
         }
     }
 }
</script>
