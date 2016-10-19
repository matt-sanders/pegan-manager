import {SET_MENU} from '../mutation-types';
const state = {
    active: false
};

const mutations = {
    [SET_MENU](state, active){
        state.active = active;
    }
};

export default {
    state,
    mutations
};
