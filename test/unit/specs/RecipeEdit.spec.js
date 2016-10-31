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
let UpdateRecipeSpy = sinon.spy();
let SetUnitSpy = sinon.spy();

let IngredientMock = Vue.extend({
    props: ['ingredients'],
    template: '<div></div>'
});

let recipeBase = {
    title: '',
    prep: '',
    cook: '',
    'yield': '',
    desc: '',
    directions: '',
    tags: '',
    link: '',
    linkTitle: '',
    image: '',
    ingredients: []
};

const RecipeEditWithMocks = RecipeEditInjector({
    '../vuex/actions/recipes': {
        saveRecipe: SaveRecipeSpy,
        setRecipes: SetRecipeSpy,
        updateRecipe: UpdateRecipeSpy,
        setUnits: SetUnitSpy
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
            title: 'Foo',
            ingredients: []
        };

        store.state.recipes.recipes = [recipe];

        let router = getComponent();
        router.go('/1234');
        expect(router.app.$el.querySelector('h1').textContent).to.equal('Edit '+recipe.title);
        expect(router.app.$el.querySelectorAll('input.form-control')[0].value).to.equal(recipe.title);
    });

    it('should not include deleted ingredient items', () => {
        let recipe = {
            '_id': 1234,
            'title': 'Foo',
            'desc': 'Some Desc',
            'directions': 'Some Directions',
            'ingredients': []
        };
        store.state.recipes.recipes = [recipe];
        let router = getComponent();
        router.go('/1234');

        let el = router.app.$children[0];
        el.ingredients.push({label: 'test1'});
        el.ingredients.push({label: 'test', remove: true});
        el.submit();

        expect(UpdateRecipeSpy.args[0][1].ingredients).to.be.length(1);
        UpdateRecipeSpy.reset();
    });

    it('should update an existing record', () => {
        let recipe = {
            '_id': 1234,
            'title': 'Foo',
            'desc': 'Some Desc',
            'directions': 'Some Directions',
            'ingredients': []
        };
        store.state.recipes.recipes = [recipe];
        let router = getComponent();
        router.go('/1234');

        let el = router.app.$children[0];
        el.submit();

        //update recipe for output
        let outRecipe = Object.assign({}, recipeBase, recipe);
        expect(UpdateRecipeSpy).to.be.called;
        expect(UpdateRecipeSpy.args[0][1]).to.deep.equal(outRecipe);
        
    });

    it('should create a new record', () => {
        store.state.recipes.recipes = [];
        let router = getComponent();
        router.go('/new');

        let recipe = {
            title: 'Foo',
            desc: 'Some Desc',
            directions: 'Some Directions'
        };

        let el = router.app.$children[0];

        //populate our form
        Object.keys(recipe).forEach(key=>{
            el.recipeForm[key].value = recipe[key];
        });

        el.submit();
        
        let outRecipe = Object.assign({}, recipeBase, recipe);
        expect(SaveRecipeSpy).to.be.called;
        expect(SaveRecipeSpy.args[0][1]).to.deep.equal(outRecipe);
    });
});
