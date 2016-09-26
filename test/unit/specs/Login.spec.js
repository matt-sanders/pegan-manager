import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
const LoginInjector = require('!!vue?inject!../../../resources/assets/js/components/Login.vue');
import auth from '../../../resources/assets/js/vuex/modules/auth';
Vue.use(Vuex);
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
chai.use(sinonChai);

let LoginSpy = sinon.spy();

const LoginWithMocks = LoginInjector({
    '../vuex/actions/auth': {
        login: LoginSpy
    }
});

let store = new Vuex.Store({
    modules: {
        auth
    }
});

const getComponent = () => {
    let vm = new Vue({
        template: '<div><login v-ref:login></login></div>',
        components: {
            login: LoginWithMocks
        },
        store: store
    }).$mount();
    
    return vm;
};

describe('Login', () => {
    
    it('should trigger login', () => {

        let vm = getComponent();

        let loginComp = vm.$refs.login;

        loginComp.credentials.email.value = 'test@test.com';
        loginComp.credentials.password.value = 'testing';

        loginComp.submit();

        expect(LoginSpy).to.be.called;
        expect(LoginSpy.args[0][1]).to.deep.equal({ email: 'test@test.com', password: 'testing'});

    });
    
});
