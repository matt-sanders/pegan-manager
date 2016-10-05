import {SET_RECIPES, ADD_RECIPE, SAVING_RECIPE, RECIPE_ERR} from '../mutation-types';
const state = {
    recipes: [],
    saving_recipe: false,
    recipe_err: false
};

const mutations = {
    [SET_RECIPES](state, recipes){
        state.recipes = recipes;
    },
    [ADD_RECIPE](state, recipe){
        state.recipes.push(recipe);
    },
    [SAVING_RECIPE](state, saving){
        state.saving_recipe = saving;
    },
    [RECIPE_ERR](state, err){
        state.recipe_err = err;
    }
};

export default {
    state,
    mutations
};
