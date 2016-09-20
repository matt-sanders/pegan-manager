import Vue from 'vue';
import App from './App.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
Vue.use(VueResource);
Vue.use(VueRouter);

//set the headers
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost';
//Vue.http.headers.common['Access-Control-Request-Method'] = '*';
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
