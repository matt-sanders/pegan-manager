import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import Auth from 'src/auth'

const creds = {
    email: 'test',
    password: 'test'
}

describe('Auth', () => {

    const getComponent = () => {
        let vm = new Vue({
            data: {
                error: ''
            }
        }).$mount();
        
        return vm;
    }

    beforeEach(() => {
        Auth.user.authenticated = false
        localStorage.removeItem('id_token')
    })
    
    it('should check if the user has a current token', () => {
        Auth.checkAuth()
        expect(Auth.user.authenticated).to.be.false

        localStorage.setItem('id_token', '1234')
        Auth.checkAuth()
        expect(Auth.user.authenticated).to.be.true
    });

    it('should throw an error on unsuccessful login', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'error': 'something'};
            next(request.respondWith(body, {
                status: 401
            }));
        });

        const vm = getComponent()
        
        Auth.login(vm, creds)


        setTimeout(function(){
            expect(vm.error).to.equal('something')
            done()
        }, 0)

        Vue.http.interceptors.shift()
        
    })

    it('should log the user in', (done) => {

        Vue.http.interceptors.unshift((request, next) => {
            var body = {'token' : '1234'}
            next(request.respondWith(body, { status: 200 }))
        })

        const vm = getComponent()

        Auth.login(vm, creds)

        setTimeout(function(){
            expect(Auth.user.authenticated).to.be.true
            expect(localStorage.getItem('id_token')).to.equal('1234')
            done()
        }, 0)

        Vue.http.interceptors.shift()
        
    })
})
