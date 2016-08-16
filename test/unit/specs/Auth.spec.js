import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import Auth from 'src/auth'

const creds = {
    email: 'test',
    password: 'test'
}

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
            data: {
                error: ''
            }
        }).$mount()

        
        Auth.login(vm, creds)


        setTimeout(function(){
            expect(vm.error).to.equal('something')
            done()
        }, 0)

        Vue.http.interceptors.shift();
        
    });
});
