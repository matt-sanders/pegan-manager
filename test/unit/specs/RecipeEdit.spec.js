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
let SetRecipeSpy = sinon.spy();

let IngredientMock = Vue.extend({
    props: ['ingredients'],
    template: '<div></div>'
});

const RecipeEditWithMocks = RecipeEditInjector({
    '../vuex/actions/recipes': {
        saveRecipe: SaveRecipeSpy,
        setRecipes: SetRecipeSpy
    },
    './RecipeIngredients.vue': IngredientMock
});

let store = new Vuex.Store({
    modules: {
        recipes
    }
});

const getComponent = () => {
    let router = new VueRouter({abstract: true});
    
    let vm = Vue.extend({
        template: '<div><router-view v-ref:router></router-view></div>',
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

    it('should display an empty form', ()=> {
        
        let router = getComponent();

        router.go('/new');
        expect(router.app.$el.querySelector('h1').textContent).to.equal('New Recipe');
        expect(router.app.$el.querySelectorAll('input.form-control')[0].value).to.equal('');
    });

    it('should populate the form with the correct recipe data', () =>{
        let recipe = {
            '_id': 1234,
            'title': 'Foo'
        };

        store.state.recipes.recipes = [recipe];

        let router = getComponent();
        router.go('/1234');
        expect(router.app.$el.querySelector('h1').textContent).to.equal('Edit '+recipe.title);
        expect(router.app.$el.querySelectorAll('input.form-control')[0].value).to.equal(recipe.title);
    });
});
