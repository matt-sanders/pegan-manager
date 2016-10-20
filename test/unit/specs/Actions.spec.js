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
import * as menuActions from '../../../resources/assets/js/vuex/actions/menu';
import * as utils from '../../../resources/assets/js/vuex/actions/utils';
import {router} from '../../../resources/assets/js/app';
import Auth from '../../../resources/assets/js/vuex/modules/auth';
import Recipes from '../../../resources/assets/js/vuex/modules/recipes';
import Ingredients from '../../../resources/assets/js/vuex/modules/ingredients';
import Menu from '../../../resources/assets/js/vuex/modules/menu';
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
let menuState = Menu.state;

let routerSpy = sinon.spy(router, 'go');
let setRecipeSpy = sinon.spy(recipeActions, 'setRecipes');

describe('Actions', () => {

    describe('Menu', () => {
        it('should be true', done => {
            testAction(menuActions.setMenu, [true], menuState, [
                { name: 'SET_MENU', payload: [true] }
            ], done);
        });
    });

    describe('Auth', () => {

        describe('check auth', () => {
            it('no jwt should be false', done => {
                localStorage.removeItem('id_token');
                testAction(authActions.checkAuth, [], authState, [
                    { name: 'SET_AUTH', payload: [false] }
                ],done);
            });
            
            it('valid key should be true', done => {
                //create a new timestamp
                let timestamp = Math.round(new Date().getTime() / 1000 );
                //add an hour
                timestamp += 3600;
                //get the unix date
                let datetime = new Date(timestamp * 1000).getTime();
                let payload = {
                    exp: datetime
                };
                let jwt = '1234.'+utils.encodeBase64(payload);
                localStorage.setItem('id_token', jwt);
                testAction(authActions.checkAuth, [], authState, [
                    { name: 'SET_AUTH', payload: [true] }
                ],done);
            });

            it('expired jwt should be false', done => {
                //create a new timestamp
                let timestamp = Math.round(new Date().getTime() / 1000 );
                //less an hour
                timestamp -= 3600;
                //get the unix date
                let datetime = new Date(timestamp * 1000).getTime();
                let payload = {
                    exp: datetime / 1000
                };
                let jwt = '1234.'+utils.encodeBase64(payload);
                localStorage.setItem('id_token', jwt);
                testAction(authActions.checkAuth, [], authState, [
                    { name: 'SET_AUTH', payload: [false] }
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
            routerSpy.reset();
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

        it('saveRecipe redirect', done => {
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

            const dispatch = () => {};
            
            recipeActions.saveRecipe({dispatch}, recipe);
            
            setTimeout(() => {
                expect(router.go).to.be.calledWith('/recipe/test');
                expect(setRecipeSpy).to.be.called;
                done();
            });

            setRecipeSpy.reset();
            
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
        
        it('updateRecipe', done => {
            let recipes = [
                {
                    '_id': 1234,
                    foo: 'bar'
                }
            ];
            let recipe = {
                '_id': 1234,
                title: 'new'
            };

            Vue.http.interceptors.push((request, next) => {
                var body = {recipe: recipe};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            testAction(recipeActions.updateRecipe, [recipe], recipeState, [
                { name: 'SAVING_RECIPE', payload: [true] },
                { name: 'RECIPE_ERR', payload: [false] },
                { name: 'UPDATE_RECIPE', payload: [recipe] },
                { name: 'SAVING_RECIPE', payload: [false] }
            ], done);

            Vue.http.interceptors.shift();
        });

        it('deleteRecipe', done => {
            Vue.http.interceptors.push((request, next) => {
                var body = {};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            let recipe = {
                '_id': 1234
            };
            let dispatch = () => {};
            let state = {};
            
            recipeActions.deleteRecipe({dispatch, state}, recipe);

            setTimeout(()=>{
                //expect(router.go).to.be.calledWith('/recipes');
                expect(setRecipeSpy).to.be.called;
                done();
            });

            setRecipeSpy.reset();
            Vue.http.interceptors.shift();
        });
        
    });

    describe("Ingredients", () => {

        beforeEach(()=>{
            ingredientState.ingredients = [];
            ingredientState.open = false;
            ingredientState.saving = false;
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

        it('saveIngredient', done => {
            let ingredient = {};
            Vue.http.interceptors.push((request, next) => {
                var body = {ingredient: ingredient};
                next(request.respondWith(body, { status: 200, data: body }));
            });

            testAction(ingredientActions.saveIngredient, [ingredient], ingredientState, [
                {name: 'SAVING_INGREDIENT', payload: [true]},
                {name: 'ADD_INGREDIENT', payload: [ingredient]},
                {name: 'SAVING_INGREDIENT', payload: [false]}
            ], done);

            Vue.http.interceptors.shift();            
        });

        it('openAddIngredient', done => {
            testAction(ingredientActions.openAddIngredient, [true], ingredientState, [
                {name: 'OPEN_ADD_INGREDIENT', payload: [true]}
            ],done);
        });
    });
});
