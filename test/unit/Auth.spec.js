import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {router} from '../../resources/assets/js/app';
chai.use(sinonChai);
Vue.use(VueResource);
Vue.use(VueRouter);
import Auth from '../../resources/assets/js/auth';

const creds = {
    email: 'test',
    password: 'test'
};

describe('Auth', () => {

    const getComponent = () => {
        let vm = new Vue({
            data: {
                error: ''
            }
        }).$mount();
        
        return vm;
    };

    beforeEach(() => {
        Auth.user.authenticated = false;
        localStorage.removeItem('id_token');
    });
    
    it('should check if the user has a current token', () => {
        Auth.checkAuth();
        expect(Auth.user.authenticated).to.be.false;

        localStorage.setItem('id_token', '1234');
        Auth.checkAuth();
        expect(Auth.user.authenticated).to.be.true;
    });

    it('should throw an error on unsuccessful login', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'error': 'something'};
            next(request.respondWith(body, {
                status: 401
            }));
        });

        const vm = getComponent();
        
        Auth.login(vm, creds);


        setTimeout(function(){
            expect(vm.error).to.equal('something');
            done();
        }, 0);

        Vue.http.interceptors.shift();
        
    });

    it('should log the user in', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'token' : '1234'};
            next(request.respondWith(body, { status: 200 }));
        });

        const vm = getComponent();

        Auth.login(vm, creds);

        setTimeout(function(){
            expect(Auth.user.authenticated).to.be.true;
            expect(localStorage.getItem('id_token')).to.equal('1234');
            done();
        }, 0);

        Vue.http.interceptors.shift();
        
    });

    it('should redirect if given the parameter', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'token' : '1234'};
            next(request.respondWith(body, { status: 200 }));
        });

        const vm = getComponent();
        sinon.spy(router, 'go');

        Auth.login(vm, creds, '/home');

        Vue.http.interceptors.shift();
        setTimeout(()=>{
            expect(router.go).to.have.been.called;
            done();
        },0);
        
    });

    it('should log the user out', () => {
        localStorage.setItem('id_token', 'testing');
        Auth.user.authenticated = true;
        Auth.logout();
        expect(localStorage.getItem('id_token')).to.equal(null);
        expect(Auth.user.authenticated).to.be.false;
    });
});
