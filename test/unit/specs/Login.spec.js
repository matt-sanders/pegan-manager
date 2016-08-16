import Vue from 'vue'
const Login = require('!!vue?inject!src/components/Login');
//import Login from 'src/components/Login'

const LoginWithMocks = Login({
    '../auth': {
        message: 'test'
    }
})

describe('Login.vue', () => {

    const getComponent = () => {
        let vm = new Vue({
            template: '<div><login></login></div>',
            components: {
                'login': LoginWithMocks
            }
        })

        return vm
    }
    
    it('should call the login method', () => {
        /*let vm = new Vue({
            template: '<div><login></login></div>',
            components: {
                //'login': LoginWithMocks
                Login
            }
         }).$mount()*/

        const component = getComponent().$mount()

        console.log(component.$refs);

        //console.log(vm.$refs);

        let spy = sinon.spy()
        component.$on('login', spy)


        //vm.$refs.login.submit()

        //expect(spy).to.have.been.called()
        
    })
})
