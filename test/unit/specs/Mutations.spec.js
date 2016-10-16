import chai from 'chai';
const expect = chai.expect;
import Auth from '../../../resources/assets/js/vuex/modules/auth';
import Recipes from '../../../resources/assets/js/vuex/modules/recipes';
import Ingredients from '../../../resources/assets/js/vuex/modules/ingredients';

let state;

describe('Mutations', () =>{

    describe('Auth', () => {

        beforeEach(()=>{
            state = {
                authenticated: false,
                error: null
            };
        });

        it('SET_AUTH', () => {
            Auth.mutations.SET_AUTH(state, true);
            expect(state.authenticated).to.be.true;
        });

        it('SET_AUTH_ERR', () => {
            Auth.mutations.SET_AUTH_ERR(state, 'Something');
            expect(state.error).to.equal('Something');
        });
        
    });

    describe('Recipes', () => {
        beforeEach(()=>{
            state = {
                recipes: [],
                savingRecipe: false,
                recipeErr: false
            };
        });

        it('SET_RECIPES', ()=>{
            let recipes = [
                {
                    foo: 'bar',
                    id: 'something'
                }
            ];
            Recipes.mutations.SET_RECIPES(state, recipes);
            expect(state.recipes).to.deep.equal(recipes);
        });

        it('ADD_RECIPE', () => {
            let recipe = {
                title: 'test'
            };
            Recipes.mutations.ADD_RECIPE(state, recipe);
            expect(state.recipes).to.be.length(1);
            expect(state.recipes[0]).to.deep.equal(recipe);
        });

        it('UPDATE_RECIPE', () => {
            let recipe = {
                '_id': 1234,
                title: 'test'
            };
            state.recipes.push(recipe);
            let newRecipe = Object.assign({}, recipe);
            newRecipe.title = 'testing';
            Recipes.mutations.UPDATE_RECIPE(state, newRecipe);
            expect(state.recipes).to.be.length(1);
            expect(state.recipes[0]).to.deep.equal(newRecipe);
        });

        it('UPDATE_RECIPE - norecipe', () => {
            let recipe = {
                '_id': 1234,
                title: 'test'
            };
            Recipes.mutations.UPDATE_RECIPE(state, recipe);
            expect(state.recipes).to.be.length(1);
            expect(state.recipes[0]).to.deep.equal(recipe);
        });

        it('SAVING_RECIPE', () => {
            Recipes.mutations.SAVING_RECIPE(state, true);
            expect(state.savingRecipe).to.be.true;
        });

        it('RECIPE_ERR', () => {
            Recipes.mutations.RECIPE_ERR(state, true);
            expect(state.recipeErr).to.be.true;
        });
    });

    describe('Ingredients', () => {

        beforeEach(()=>{
            state = {
                ingredients: [],
                open: false,
                saving: false
            };
        });

        it('SET_INGREDIENTS', () => {

            let ingredients = [{
                title: 'test'
            }];

            Ingredients.mutations.SET_INGREDIENTS(state, ingredients);
            expect(state.ingredients).to.deep.equal(ingredients);
        });

        it('ADD_INGREDIENT', () => {
            let ingredient = {
                name: 'test'
            };
            Ingredients.mutations.ADD_INGREDIENT(state, ingredient);
            expect(state.ingredients).to.be.length(1);
            expect(state.ingredients[0]).to.deep.equal(ingredient);
        });

        it('OPEN_ADD_INGREDIENT', () => {
            Ingredients.mutations.OPEN_ADD_INGREDIENT(state, true);
            expect(state.open).to.be.true;
        });

        it('SAVING_INGREDIENT', () => {
            Ingredients.mutations.SAVING_INGREDIENT(state, true);
            expect(state.saving).to.be.true;
        });
        
    });
    
});
