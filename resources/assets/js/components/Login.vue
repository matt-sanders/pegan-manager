<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default"> 
        <div class="panel-heading text-center">
          <h2>Login</h2>
        </div>
        <div class="panel-body">
          <form :submit.prevent="login(this.credentials.email.value, this.credentials.password.value)">
            <formly-form :form="credentials"></formly-form>
            <div class="row">
              <div class="col-md-4 col-md-offset-4">
                <button class="btn btn-success btn-block">Login</button>
              </div>
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
             error: ''
         }
     },
     vuex: {
         getters: {
             authenticated: state => {
                 return state.auth.authenticated;
             },
             errors: state => {
                 return state.auth.error
             }                                            
         },
         actions: { login: actions.login }
     },
     methods: {
         submit() {
             var credentials = {
                 email: this.credentials.email.value,
                 password: this.credentials.password.value
             }
             console.log('hit submission');
             //login(store, credentials);
             //Auth.login(this, credentials, '/dashboard')
         }
     }
 }
</script>
