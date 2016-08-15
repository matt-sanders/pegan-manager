import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(VueRouter);
import auth from './auth';

//set the headers
Vue.http.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('id_token');

//check the users status when the app starts
auth.checkAuth();

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
