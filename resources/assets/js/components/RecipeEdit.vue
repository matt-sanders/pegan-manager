<template>
  <div class="recipe-edit">
    <div class="row">
      <div class="col-md-8">
        <h1 v-if="newRecipe">New Recipe</h1>
        <h1 v-if="!newRecipe">Edit {{recipe.title}}</h1>
      </div>
      <div class="col-md-4 text-right">
        <div class="btn-group margin-top" role="group">
          <a class="btn btn-success" :disabled="!formValid" href="#" @click.prevent="submit">{{working ? 'Saving...' : 'Save'}}</a>
          <a class="btn btn-default" v-link="'/recipes'">Cancel</a>
        </div>
      </div>
    </div>
      <div class="row">
        <div class="col-md-4">
          <form v-on:submit.prevent="submit">
            <formly-form :form="recipeForm" :custom-layout="true">
              <formly-field :form.sync="recipeForm" :key="'title'"></formly-field>

              <div class="row">
                <div class="col-md-6">
                  <formly-field :form.sync="recipeForm" :key="'prep'"></formly-field>
                </div>
                <div class="col-md-6">
                  <formly-field :form.sync="recipeForm" :key="'cook'"></formly-field>
                </div>
              </div>

              <formly-field :form.sync="recipeForm" :key="'yield'"></formly-field>

              <formly-field :form.sync="recipeForm" :key="'desc'"></formly-field>

              <formly-field :form.sync="recipeForm" :key="'directions'"></formly-field>

              <formly-field :form.sync="recipeForm" :key="'tags'"></formly-field>

              
              <div class="row">
                <div class="col-md-6">
                  <formly-field :form.sync="recipeForm" :key="'linkTitle'"></formly-field>
                </div>
                <div class="col-md-6">
                  <formly-field :form.sync="recipeForm" :key="'link'"></formly-field>
                </div>
              </div>

              <formly-field :form.sync="recipeForm" :key="'image'"></formly-field>
            </formly-form>
          </form>
        </div>
        <div class="col-md-4">
          <recipe-ingredients :ingredients="ingredients"></recipe-ingredients>

          <div v-if="image64">
            <h4>Image</h4>
            <div class="recipeImage" v-bind:style="{ backgroundImage: 'url('+image64+')' };"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
 import recipeIngredients from './RecipeIngredients.vue';
 import * as recipeActions from '../vuex/actions/recipes';
 export default {
     data() {
         return {
             newRecipe: false,
             ingredients: [],
             image64: '',
             recipeForm: {
                 title: {
                     type: 'input',
                     label: 'title',
                     required: true
                 },
                 prep: {
                     type: 'input',
                     label: 'prep time'
                 },
                 cook: {
                     type: 'input',
                     label: 'cook time'
                 },
                 'yield': {
                     type: 'input',
                     label: 'yield'
                 },
                 desc: {
                     type: 'textarea',
                     label: 'desc',
                     required: true
                 },
                 directions: {
                     type: 'textarea',
                     label: 'directions',
                     required: true
                 },
                 tags: {
                     type: 'input',
                     label: 'tags'
                 },
                 linkTitle: {
                     type: 'input',
                     label: 'link title'
                 },
                 link: {
                     type: 'input',
                     label: 'link'
                 },
                 image: {
                     type: 'input',
                     label: 'image',
                     inputType: 'file'
                 }
             }
         }
     },
     vuex: {
         getters: {
             working: state => state.recipes.savingRecipe,
             recipeErr: state => state.recipes.recipeErr,
             recipes: state => state.recipes.recipes
         },
         actions: {
             saveRecipe: recipeActions.saveRecipe,
             setRecipes: recipeActions.setRecipes,
             updateRecipe: recipeActions.updateRecipe
         }
     },
     methods: {
         set64() {
             if ( !this.recipeForm.image.files ) {
                 this.image64 = '';
                 return;
             }
             let fr = new FileReader();
             fr.onload = e => {
                 this.image64 = e.target.result;
             };
             fr.readAsDataURL( this.recipeForm.image.files[0] );
         },
         submit() {
             if ( this.working || !this.recipeForm.$valid ) return;

             let recipe = {};
             let patt = /^\$/;
             Object.keys(this.recipeForm).forEach(key => {
                 //we don't want keys like $errors and $valid to come through
                 if ( patt.test(key) ) return true;
                 recipe[key] = this.recipeForm[key].value;
             });

             recipe.image = this.image64 || '';

             if ( this.recipe._id ) recipe._id = this.recipe._id;

             recipe.ingredients = [];
             //get all the ingredients
             if ( this.ingredients ){
                 this.ingredients.forEach((ing) => {
                     let ingredient = {
                         label: '',
                         amount: '',
                         unit: '',
                         ingId: ''
                     };
                     if ( ing.isLabel ) {
                         ingredient.label = ing.label;
                     } else {
                         ingredient.ing_id = ing.ing_id;
                         ingredient.amount = ing.amount;
                         ingredient.unit = ing.unit;
                     }
                     recipe.ingredients.push(ingredient);
                 });
             }

             if ( recipe._id ){
                 this.updateRecipe(recipe);
             } else {
                 this.saveRecipe(recipe);
             }
         }
     },
     computed: {
         recipe(){
             if ( this.$route.params.recipeId == 'new' ) return {};
             let recipes =  this.recipes.filter(recipe => {
                 return recipe._id == this.$route.params.recipeId;
             });
             if ( recipes.length == 0 ) return {};

             //go through and set all the fields data
             Object.keys(this.recipeForm).forEach(key=>{
                 if ( !recipes[0][key] || key == 'image') return;
                 this.recipeForm[key].value = recipes[0][key];
             });

             //reset the image
             this.image64 = recipes[0].image;

             this.ingredients = recipes[0].ingredients;
             return recipes[0];
         },
         formValid(){
             //check if the form is valid AND if the image has been uploaded
             return ( this.recipeForm.$valid && ( !this.recipeForm.image.value || ( this.recipeForm.image.value && this.image64 ) ) );
         }
     },
     watch: {
         'recipeForm.image.files': function(){
             if ( !this.recipeForm.image.files ) return;
             this.set64();
         }
     },
     created(){
         this.setRecipes();
         if ( this.$route.params.recipeId == 'new' ){
             this.newRecipe = true;
         }
     },
     components: {
         recipeIngredients
     }
 }
</script>
