import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
const RecipeListInjector = require('!!vue?inject!../../../resources/assets/js/components/RecipeList.vue');
import recipes from '../../../resources/assets/js/vuex/modules/recipes';
Vue.use(Vuex);
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
chai.use(sinonChai);

let RecipeSpy = sinon.spy();

const RecipeListWithMocks = RecipeListInjector({
    '../vuex/actions/recipes': {
        setRecipes: RecipeSpy
    }
});

let store = new Vuex.Store({
    modules:{
        recipes
    }
});

const getComponent = () => {
    let vm = new Vue({
        template: '<div><recipe-list v-ref:recipe></recipe-list></div>',
        components: {
            'recipe-list': RecipeListWithMocks
        },
        store: store
    }).$mount();
    
    return vm;
};

describe('RecipeList', () => {
    it('should display error on no recipes', () => {

        getComponent();
        expect(RecipeSpy).to.be.called;
    });
});
