<template>
  <div class="row margin-top" id="login">
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
                <button class="btn btn-success btn-block" :disabled="!credentials.$valid">{{this.working ? 'Loading...' : 'Log In'}}</button>
              </div>
            </div>
            
            <div class="alert alert-danger margin-top margin-no-bottom" role="alert" v-show="errors && !working">
              Uh oh! Looks like something didn't quite add up. Check your details and try again.
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
 import * as authActions from '../vuex/actions/auth';
 export default {
     data() {
         return {
             credentials: {
                 email: {
                     type: 'input',
                     label: 'email',
                     inputType: 'email',
                     required: true
                 },
                 password: {
                     type: 'input',
                     label: 'password',
                     inputType: 'password',
                     required: true
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
         actions: { login: authActions.login }
     },
     methods: {
         submit() {
             this.working = true;
             let creds = {
                 email: this.credentials.email.value,
                 password: this.credentials.password.value
             };
             this.login(creds, 'recipes');
         }
     },
     watch: {
         'errors': function(value) {
             this.working = false;
         }
     }
 }
</script>
