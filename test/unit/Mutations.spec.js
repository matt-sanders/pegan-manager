import chai from 'chai';
const expect = chai.expect;
import Auth from '../../resources/assets/js/vuex/modules/auth';
import Recipes from '../../resources/assets/js/vuex/modules/recipes';

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
                recipes: []
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
    });
    
});
