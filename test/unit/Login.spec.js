import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
import Login from '../../resources/assets/js/components/Login.vue';
import Auth from '../../resources/assets/js/auth';
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
chai.use(sinonChai);

const getComponent = () => {
    let vm = new Vue({
        template: '<div><login v-ref:login></login></div>',
        components: {
            Login
        }
    }).$mount();
    return vm;
};


describe('Login', () => {

    it('should trigger login', () => {
        let spy = sinon.spy(Auth, 'login');
        let vm = getComponent();
        let creds = {
            email: 'test@test.com',
            password: 'testing'
        };
        vm.$refs.login.credentials.email.value = creds.email;
        vm.$refs.login.credentials.password.value = creds.password;
        vm.$refs.login.submit();

        expect(Auth.login).to.be.called;
        expect(spy.args[0][1]).to.deep.equal(creds);
        expect(spy.args[0][2]).to.equal('/dashboard');
        spy.reset();
    });
    
});
