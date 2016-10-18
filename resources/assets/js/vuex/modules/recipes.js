import {SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, SAVING_RECIPE, RECIPE_ERR} from '../mutation-types';
const state = {
    recipes: [],
    savingRecipe: false,
    recipeErr: false
};

const mutations = {
    [SET_RECIPES](state, recipes){
        recipes.forEach( recipe => {
            if ( typeof recipe.ingredients != 'object' || recipe.ingredients.length == 0 ) return true;
            recipe.ingredients.forEach( ing => {
                if ( ing.label ){
                    ing.isLabel = true;
                } else {
                    ing.label = '';
                }
            });
        });
        state.recipes = recipes;
    },
    [ADD_RECIPE](state, recipe){
        state.recipes.push(recipe);
    },
    [UPDATE_RECIPE](state, recipe){
        let updated = false;
        state.recipes.forEach( (rec, idx) =>{
            if ( rec._id == recipe._id ){
                updated = true;
                state.recipes[idx] = recipe;
            }
        });
        
        //if we haven't found one, just add it in
        if ( !updated )state.recipes.push(recipe);
    },
    [SAVING_RECIPE](state, saving){
        state.savingRecipe = saving;
    },
    [RECIPE_ERR](state, err){
        state.recipeErr = err;
    }
};

export default {
    state,
    mutations
};
