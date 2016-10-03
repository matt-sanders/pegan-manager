<template>
  <div class="recipe-edit">
    <div class="row">
      <div class="col-md-4">
        <h1 v-if="newRecipe">New Recipe</h1>
        <h1 v-if="!newRecipe">Edit {{recipe.title}}</h1>
        
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
 export default {
     data() {
         return {
             working: false,
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
     methods: {
         submit() {
             if ( this.working ) return;
             this.working = true;
         }
     },
     created(){
         if ( this.$route.params.recipeId == 'new' ){
             this.newRecipe = true;
         } else {

         }
     }
 }
</script>
