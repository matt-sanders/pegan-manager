import Vue from 'vue';
import auth from './auth';
import App from './App.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
//import VueResource from 'vue-resource';
//Vue.use(VueResource);
Vue.use(VueRouter);
//import auth from './auth';

//set the headers
//Vue.http.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('id_token');

//check the users status when the app starts
//auth.checkAuth();

export var router = new VueRouter();

router.map({
    '/login': {
        component: Login
    }
});

router.redirect({
    '*': '/login'
});


router.start(App, '#app');
