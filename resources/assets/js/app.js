import Vue from 'vue';
import App from './App.vue';
import Login from './components/Login.vue';
import RecipeList from './components/RecipeList.vue';
import RecipeEdit from './components/RecipeEdit.vue';
import {setHeaders} from './api';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
import VueTouch from 'vue-touch';
//import * as authActions from './vuex/actions/auth';
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueTouch);

setHeaders();

export var router = new VueRouter();

router.map({
    '/login': {
        component: Login
    },
    '/recipes': {
        component: RecipeList,
        auth: true
    },
    '/recipe/:recipeId': {
        component: RecipeEdit,
        auth: true
    }
});

router.redirect({
    '*': '/login'
});

router.beforeEach(transition => {
    if ( transition.to.auth ){
        router.app.checkAuth();
    } else {
        transition.next();
    }
});


router.start(App, '#app');
