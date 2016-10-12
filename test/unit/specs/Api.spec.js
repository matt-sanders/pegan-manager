import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueResource from 'vue-resource';
import * as Api from '../../../resources/assets/js/api';
import {API_URL} from '../../../resources/assets/js/constants';
chai.use(sinonChai);
Vue.use(VueResource);

Vue.http.interceptors.unshift((request, next)=>{
    let body = {};
    next(request.respondWith(body,{
        status: 200
    }));
});

let postSpy = sinon.spy(Vue.http, 'post');
let getSpy = sinon.spy(Vue.http, 'get');
let putSpy = sinon.spy(Vue.http, 'put');

describe('Api', () => {

    it('login', () => {
        Api.login({});
        expect(Vue.http.post).to.be.calledWith(API_URL+'authenticate', {});
    });

    it('getRecipes', () => {
        Api.getRecipes();
        expect(Vue.http.get).to.be.calledWith(API_URL+'recipes');
    });

    it('saveRecipe', () => {
        let recipe = {
            title: 'test'
        };
        Api.saveRecipe(recipe);
        expect(Vue.http.post).to.be.calledWith(API_URL+'recipe', recipe);
    });

    it('updateRecipe', () => {
        let recipe = {
            '_id': '12354',
            title: 'test'
        };
        Api.updateRecipe(recipe);
        expect(Vue.http.put).to.be.calledWith(API_URL+'recipe/'+recipe._id, recipe);
    });

    it('getIngredients', () => {
        Api.getIngredients();
        expect(Vue.http.get).to.be.calledWith(API_URL+'ingredients');
    });

    it('saveIngredient', () => {
        let ingredient = {};
        Api.saveIngredient(ingredient);
        expect(Vue.http.post).to.be.calledWith(API_URL+'ingredient', ingredient);
    });
    
});
