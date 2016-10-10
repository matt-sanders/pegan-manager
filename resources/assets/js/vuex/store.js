import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import recipes from './modules/recipes';
import ingredients from './modules/ingredients';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        recipes,
        ingredients
    }
});
