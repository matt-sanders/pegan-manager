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
    let vm = new Vue({
        template: '<div><recipe-edit v-ref:recipe></recipe-edit></div>',
        components: {
            'recipe-edit': RecipeEditWithMocks
        },
        store: store
    }).$mount();
    
    return vm;
};

describe('RecipeEdit', () => {

    it('should save recipes', done => {
        let vm = getComponent();
        let re = vm.$refs.recipe;

        //just set the required fields
        re.recipeForm.title.value = 'test';
        re.recipeForm.desc.value = 'test';
        re.recipeForm.directions.value = 'test';

        setTimeout(()=>{
            re.methods.submit();
            expect(SaveRecipeSpy).to.be.called;
            done();
        });
    });
});
