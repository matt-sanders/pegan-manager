import { SET_AUTH, SET_AUTH_ERR } from '../mutation-types';

const state = {
    authenticated: false,
    error: null
};

const mutations = {
    [SET_AUTH](state, isAuthenticated){
        state.authenticated = isAuthenticated;
    },
    [SET_AUTH_ERR](state, error){
        state.error = error;
    }
};

export default {
    state,
    mutations
};
