<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default"> 
        <div class="panel-heading text-center">
          <h2>Login</h2>
        </div>
        <div class="panel-body">
          <form v-on:submit.prevent="submit(this.credentials.email.value, this.credentials.password.value)">
            <formly-form :form="credentials"></formly-form>
            <div class="row">
              <div class="col-md-4 col-md-offset-4">
                <button class="btn btn-success btn-block">{{this.working ? 'Loading...' : 'Log In'}}</button>
              </div>
            </div>
            <div class="alert alert-danger" role="alert" v-show="errors">
              Uh oh! Looks like something didn't quite add up. Check your details and try again.
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
 import * as actions from '../vuex/actions';
 export default {
     data() {
         return {
             credentials: {
                 email: {
                     type: 'input',
                     label: 'email',
                     inputType: 'email'
                 },
                 password: {
                     type: 'input',
                     label: 'password',
                     inputType: 'password'
                 }
             },
             working: false
         }
     },
     vuex: {
         getters: {
             authenticated: state => state.auth.authenticated,
             errors: state => state.auth.error            
         },
         actions: { login: actions.login }
     },
     methods: {
         submit() {
             this.working = true;
             this.login(this.credentials.email.value, this.credentials.password.value);
         }
     },
     watch: {
         'errors': function(value) {
             this.working = false;
         }
     }
 }
</script>
