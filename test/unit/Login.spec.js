import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
import * as actions from '../../resources/assets/js/vuex/actions';
import Login from '../../resources/assets/js/components/Login.vue';
Vue.use(Vuex);
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
chai.use(sinonChai);

let store = new Vuex.Store();

const getComponent = () => {
    let vm = new Vue({
        template: '<div><login v-ref:login></login></div>',
        components: {
            Login
        },
        store: store
    }).$mount();
    
    return vm;
}
describe('Login', () => {

    it('should trigger login', () => {
        sinon.stub(actions, 'login').returns({});

        let vm = getComponent();

        let loginComp = vm.$refs.login;

        loginComp.credentials.email.value = 'test@test.com';
        loginComp.credentials.email.password = 'testing';

        vm.$el.querySelectorAll('form')[0].submit();
        //vm.$el.querySelectorAll('button')[0].click();

        expect(actions.login).to.be.called;

        /*const stubs = {
            '../vuex/actions': {
                login: function(){console.log('hit');}
            }
        };*/
        //const proxyquire = require('proxyquireify')(require)

    });
    
});
