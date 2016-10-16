import {SET_INGREDIENTS, ADD_INGREDIENT, OPEN_ADD_INGREDIENT, SAVING_INGREDIENT} from '../mutation-types';
const state = {
    ingredients: [],
    open: false,
    saving: false
};

const mutations = {
    [SET_INGREDIENTS](state, ingredients){
        state.ingredients = ingredients;
    },
    [ADD_INGREDIENT](state, ingredient){
        state.ingredients.push(ingredient);
    },
    [OPEN_ADD_INGREDIENT](state, open){
        state.open = open;
    },
    [SAVING_INGREDIENT](state, saving){
        state.saving = saving;
    }
};

export default {
    state,
    mutations
};
