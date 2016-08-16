import Vue from 'vue'
import App from './App'
import Login from './components/Login'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'

//set the headers
Vue.http.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('id_token')

//check the users status when the app starts
auth.checkAuth();

export var router = new VueRouter()

router.map({
    '/login': {
        component: Login
    }
})

router.redirect({
    '*': '/home'
})

/* eslint-disable no-new */
router.start(App, '#app')
