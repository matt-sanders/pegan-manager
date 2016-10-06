import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import * as authActions from '../../../resources/assets/js/vuex/actions/auth';
import * as recipeActions from '../../../resources/assets/js/vuex/actions/recipes';
import * as ingredientActions from '../../../resources/assets/js/vuex/actions/ingredients';
import {router} from '../../../resources/assets/js/app';
import Auth from '../../../resources/assets/js/vuex/modules/auth';
import Recipes from '../../../resources/assets/js/vuex/modules/recipes';
import Ingredients from '../../../resources/assets/js/vuex/modules/ingredients';
chai.use(sinonChai);
Vue.use(VueResource);
Vue.use(VueRouter);

// helper for testing action with expected mutations
const testAction = (action, args, state, expectedMutations, done) => {
    let count = 0;
    // mock dispatch
    const dispatch = (name, ...payload) => {
        const mutation = expectedMutations[count];
        expect(mutation.name).to.equal(name);
        if (payload) {
            expect(mutation.payload).to.deep.equal(payload);
        }
        count++;
        if (count >= expectedMutations.length) {
            done();
        }
    };
    // call the action with mocked store and arguments
    action({dispatch, state}, ...args);

    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
        expect(count).to.equal(0);
        done();
    }
};

const creds = {
    email: 'test',
    password: 'test'
};

let authState = Auth.state;
let recipeState = Recipes.state;
let ingredientState = Ingredients.state;

sinon.spy(router, 'go');

describe('Actions', () => {

    describe('Auth', () => {

        describe('check auth', () => {
            it('should be false', done => {
                localStorage.removeItem('id_token');
                testAction(authActions.checkAuth, [], authState, [
                    { name: 'SET_AUTH', payload: [false] }
                ],done);
            });
            
            it('should be true', done => {
                localStorage.setItem('id_token', '1234');
                testAction(authActions.checkAuth, [], authState, [
                    { name: 'SET_AUTH', payload: [true] }
                ],done);
            });
        });

        describe('logout', () => {
            beforeEach(() => {
                authState.authenticated = true;
                localStorage.setItem('id_token', '1234');
            });

            it('should log the user out', done => {
                testAction(authActions.logout, [], authState, [
                    { name: 'SET_AUTH', payload: [false] }
                ], done);
            });

            it('should remove from local storage', () => {
                const dispatch = function(){};
                authActions.logout({dispatch});
                expect(localStorage.getItem('id_token')).to.equal(null);
                expect(router.go).to.have.been.calledWith('/login');
            });
        });

        describe('login', () => {
            
            beforeEach(() => {
                authState.authenticated = false;
                localStorage.removeItem('id_token');
            });

            it('should throw an error on unsuccesful login', done => {
                Vue.http.interceptors.push((request, next) => {
                    var body = {error: 'something'};
                    next(request.respondWith(body, {
                        status: 401
                    }));
                });

                
                testAction(authActions.login, [creds], authState, [
                    { name: 'SET_AUTH', payload: [false] },
                    { name: 'SET_AUTH_ERR', payload: ['something'] }
                ], done);

                Vue.http.interceptors.shift();
            });

            it('should log the user in', done => {
                Vue.http.interceptors.push((request, next) => {
                    var body = {'token' : '1234'};
                    next(request.respondWith(body, { status: 200, data: body }));
                });

                testAction(authActions.login, [creds], authState, [
                    { name: 'SET_AUTH', payload: [true] },
                    { name: 'SET_AUTH_ERR', payload: [false] }
                ], done);
                
                Vue.http.interceptors.shift();
            });

            it('should save to local storage', done => {
                Vue.http.interceptors.push((request, next) => {
                    var body = {'token' : '1234'};
                    next(request.respondWith(body, { status: 200, data: body }));
                });
                const dispatch = function(){};

                authActions.login({dispatch}, creds);

                setTimeout(()=>{
                    expect(localStorage.getItem('id_token')).to.equal('1234');
                    done();
                }, 0);
                
                Vue.http.interceptors.shift();
            });

            it('should redirect the user', done => {
                Vue.http.interceptors.push((request, next) => {
                    var body = {'token' : '1234'};
                    next(request.respondWith(body, { status: 200, data: body }));
                });

                const dispatch = function(){};
                
                authActions.login({dispatch}, creds, '/test');

                setTimeout(()=>{
                    expect(router.go).to.have.been.called;
                    done();
                }, 0);

                Vue.http.interceptors.shift();            
            });
            
        });

        it('handleError', done => {
            let response = {
                status: 401
            };

            testAction(authActions.handleError, [response], authState, [
                { name: 'SET_AUTH', payload: [false] }
            ], done);
        });

        it('setAuth', done => {

            testAction(authActions.setAuth, [true], authState, [
                { name: 'SET_AUTH', payload: [true] }
            ], done);
            
        });

        it('setAuthErr', done => {
            testAction(authActions.setAuthErr, ['some error'], authState,[
                { name: 'SET_AUTH_ERR', payload: ['some error'] }
            ], done);
        });

    });

    describe('Recipes', () => {

        beforeEach(()=>{
            recipeState.recipes = [];
        });
        
        it('setRecipes', done =>{
            let recipes = [
                {
                    foo: 'bar'
                }
            ];
            Vue.http.interceptors.push((request, next) => {
                var body = {recipes: recipes};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            testAction(recipeActions.setRecipes, [], recipeState, [
                { name: 'SET_RECIPES', payload: [recipes] },
            ], done);

            Vue.http.interceptors.shift();
        });

        it('saveRecipe', done => {
            let recipes = [
                {
                    foo: 'bar'
                }
            ];
            let recipe = {
                '_id': 'test',
                title: 'new'
            };

            recipes.push(recipe);

            Vue.http.interceptors.push((request, next) => {
                var body = {recipe: recipe};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            testAction(recipeActions.saveRecipe, [recipe], recipeState, [
                { name: 'SAVING_RECIPE', payload: [true] },
                { name: 'RECIPE_ERR', payload: [false] },
                { name: 'ADD_RECIPE', payload: [recipe] },
                { name: 'SAVING_RECIPE', payload: [false] }
            ], done);

            Vue.http.interceptors.shift();
        });

        it('saveRecipe redirect', () => {
            let recipes = [
                {
                    foo: 'bar'
                }
            ];
            let recipe = {
                '_id': 'test',
                title: 'new'
            };

            recipes.push(recipe);

            Vue.http.interceptors.push((request, next) => {
                var body = {recipe: recipe};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            expect(router.go).to.be.calledWith('/recipe/test');
            
            Vue.http.interceptors.shift();
        });

        it('saveRecipe error', done => {
            Vue.http.interceptors.push((request, next) => {
                var body = {};
                next(request.respondWith(body, { status: 500, data: body }));
            });

            let recipe = {};

            testAction(recipeActions.saveRecipe, [recipe], recipeState, [
                { name: 'SAVING_RECIPE', payload: [true] },
                { name: 'RECIPE_ERR', payload: [false] },
                { name: 'RECIPE_ERR', payload: [true] },
                { name: 'SAVING_RECIPE', payload: [false] }
            ], done);

            Vue.http.interceptors.shift();
        });
    });

    describe("Ingredients", () => {

        beforeEach(()=>{
            ingredientState.ingredients = [];
        });
        
        it('setIngredients', done => {
            let ingredients = [
                {
                    title: 'test'
                }
            ];
            Vue.http.interceptors.push((request, next) => {
                var body = {ingredients: ingredients};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            testAction(ingredientActions.setIngredients, [], ingredientState, [
                {name: 'SET_INGREDIENTS', payload: [ingredients]}
            ], done);

            Vue.http.interceptors.shift();
        });
    });
});
