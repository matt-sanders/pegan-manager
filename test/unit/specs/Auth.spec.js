import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import Auth from 'src/auth'

const creds = {
    email: 'test',
    password: 'test'
}

const component = Vue.component({
    data: function(){
        return { error: '' }
    }
})

describe('Auth', () => {
    
    it('should check if the user has a current token', () => {
        Auth.checkAuth()
        expect(Auth.user.authenticated).to.equal(false)

        localStorage.setItem('id_token', '1234')
        Auth.checkAuth()
        expect(Auth.user.authenticated).to.equal(true)
    });

    it('should throw an error on unsuccessful login', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'error': 'something'};
            next(request.respondWith(body, {
                status: 401
            }));
        });
        

        const vm = new Vue({
            template: '<div><component></component></div>',
            components: {testComponent}
        }).$mount()

        let testComponent = vm.$refs.component;
        
        Auth.login(vm.$refs.component, creds);


        testComponent.$nextTick(() => {
            expect(testComponent.error).to.equal('something');
            done();
        });

        Vue.http.interceptors.shift();
        
    });
});
