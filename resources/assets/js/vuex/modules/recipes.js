import {SET_RECIPES} from '../mutation-types';
const state = {
    recipes: []
};

const mutations = {
    [SET_RECIPES](state, recipes){
        state.recipes = recipes;
    }
};

export default {
    state,
    mutations
};
