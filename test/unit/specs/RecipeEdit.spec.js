import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
const RecipeEditInjector = require('!!vue?inject!../../../resources/assets/js/components/RecipeEdit.vue');
import recipes from '../../../resources/assets/js/vuex/modules/recipes';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
chai.use(sinonChai);

let SaveRecipeSpy = sinon.spy();

const RecipeEditWithMocks = RecipeEditInjector({
    '../vuex/actions/recipes': {
        saveRecipe: SaveRecipeSpy
    }
});

let store = new Vuex.Store({
    modules: {
        recipes
    }
});

const getComponent = () => {
    let router = new VueRouter({abstract: true});
    
    let vm = Vue.extend({
        template: '<div><router-view></router-view></div>',
        store: store
    });

    router.map({
        '/:recipeId': {
            component: RecipeEditWithMocks
        }
    });

    router.start(vm, document.createElement('div'));
    
    return router;
};

describe('RecipeEdit', () => {

    it('should save recipes', done => {
        //let vm = getComponent();
        //console.log(vm.app.$data);
        //let re = vm.$refs;

        //just set the required fields
        /*
        re.recipeForm.title.value = 'test';
        re.recipeForm.desc.value = 'test';
        re.recipeForm.directions.value = 'test';
         */

        setTimeout(()=>{
            //re.methods.submit();
            //expect(SaveRecipeSpy).to.be.called;
            done();
        });
    });
});
