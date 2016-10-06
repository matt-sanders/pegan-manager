import {SET_INGREDIENTS, ADD_INGREDIENT} from '../mutation-types';
const state = {
    ingredients: []
};

const mutations = {
    [SET_INGREDIENTS](state, ingredients){
        state.ingredients = ingredients;
    },
    [ADD_INGREDIENT](state, ingredient){
        state.ingredients.push(ingredient);
    }
};

export default {
    state,
    mutations
};
