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
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);
Vue.use(VueResource);
Vue.use(VueRouter);

setHeaders();

export var router = new VueRouter();

router.map({
    '/login': {
        component: Login
    },
    '/recipes': {
        component: RecipeList
    },
    '/recipe/:recipeId': {
        component: RecipeEdit
    }
});

router.redirect({
    '*': '/login'
});


router.start(App, '#app');
