import chai from 'chai';
const expect = chai.expect;
import Auth from '../../resources/assets/js/vuex/modules/auth';

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
    
});
