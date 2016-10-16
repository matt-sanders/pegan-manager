<template>
  <div class="newIngredient" :class="{'active': open}">
    <div class="row margin-top">
      <div class="col-md-4 col-md-offset-4">
        <form v-on:submit.prevent="submit">
          <formly-form :form="ingredientForm">
            <div class="btn-group">
              <button class="btn btn-success" :disabled="!ingredientForm.$valid">{{this.working ? 'Saving...' : 'Save'}}</button>
              <button class="btn btn-default" type="button" @click.prevent="openAddIngredient(false)">Cancel</button>
            </div>
          </formly-form>
        </form>
      </div>
    </div>
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
         getters: {
             saving: state => state.ingredients.saving,
             open: state => state.ingredients.open
         },
         actions: {
             saveIngredient: ingredientActions.saveIngredient,
             openAddIngredient: ingredientActions.openAddIngredient
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
     },
     watch: {
         saving: function(){
             if( !this.saving ) this.openAddIngredient(false);
         }
     }
 }
</script>
