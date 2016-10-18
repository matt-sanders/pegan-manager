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
import VueRouter from 'vue-router';
Vue.use(Vuex);
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
Vue.use(VueRouter);
chai.use(sinonChai);

let RecipeSpy = sinon.spy();
let DeleteSpy = sinon.spy();
let ConfSpy = sinon.stub(window, 'confirm').returns(true);

const RecipeListWithMocks = RecipeListInjector({
    '../vuex/actions/recipes': {
        setRecipes: RecipeSpy,
        deleteRecipe: DeleteSpy
    }
});

let store = new Vuex.Store({
    modules:{
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
        '/':{
            component: RecipeListWithMocks
        }
    });

    
    router.start(vm, document.createElement('div'));
    
    return router;
    
};

describe('RecipeList', () => {
    it('should confirm before deleting a recipe', () => {
        let router = getComponent();

        let el = router.app.$children[0];
        let recipe = {};
        el.removeRecipe(recipe);
        expect(ConfSpy).to.be.called;
        expect(DeleteSpy.args[0][1]).to.deep.equal(recipe);
    });
});
