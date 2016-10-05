import {SET_RECIPES, ADD_RECIPE, SAVING_RECIPE, RECIPE_ERR} from '../mutation-types';
const state = {
    recipes: [],
    savingRecipe: false,
    recipeErr: false
};

const mutations = {
    [SET_RECIPES](state, recipes){
        state.recipes = recipes;
    },
    [ADD_RECIPE](state, recipe){
        state.recipes.push(recipe);
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
