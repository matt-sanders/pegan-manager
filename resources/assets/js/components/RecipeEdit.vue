<template>
  <div class="recipe-edit">
    <div class="row">
      <div class="col-md-4">
        <h1 v-if="newRecipe">New Recipe</h1>
        <h1 v-if="!newRecipe">Edit {{recipe.title}}</h1>
        <div v-if="!newRecipe">Image: {{recipe.image}}</div>
        <form v-on:submit.prevent="submit">
          <formly-form :form="recipeForm">
            <button class="btn btn-success" :disabled="!recipeForm.$valid">{{this.working ? 'Saving...' : 'Save'}}</button>
            <a class="btn btn-default" v-link="'/recipes'">Cancel</a>
          </formly-form>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
 import * as recipeActions from '../vuex/actions/recipes';
 export default {
     data() {
         return {
             newRecipe: false,
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
             setRecipes: recipeActions.setRecipes
         }
     },
     methods: {
         submit() {
             if ( this.working || !this.recipeForm.$valid ) return;

             let recipe = {};
             Object.keys(this.recipeForm).forEach(key => {
                 recipe[key] = this.recipeForm[key].value;
             });

             this.saveRecipe(recipe);
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
                 if ( !recipes[0][key] ) return;
                 this.recipeForm[key].value = recipes[0][key];
             });
             return recipes[0];
         }
     },
     created(){
         this.setRecipes();
         if ( this.$route.params.recipeId == 'new' ){
             this.newRecipe = true;
         }
     }
 }
</script>
