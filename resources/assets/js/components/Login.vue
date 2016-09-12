<template>
  <form @submit="submit()">
    <formly-form :form="credentials"></formly-form>
    <button>Login</button>
  </form>
</template>

<script>
 import Auth from '../auth';
 export default {
     data() {
         return {
             credentials: {
                 email: {
                     type: 'input',
                     inputType: 'email'
                 },
                 password: {
                     type: 'input',
                     inputType: 'password'
                 }
             },
             error: ''
         }
     },
     methods: {
         submit() {
             var credentials = {
                 email: this.credentials.email.value,
                 password: this.credentials.password.value
             }

             Auth.login(this, credentials, '/dashboard')
         }
     }
 }
</script>
