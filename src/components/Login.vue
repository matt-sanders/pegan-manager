<template>
  <button @click="submit()"></button>
</template>

<script>
 import Auth from '../auth';
 export default {
     data() {
         return {
             credentials: {
                 email: '',
                 password: ''
             },
             error: ''
         }
     },
     methods: {
         submit() {
             var credentials = {
                 email: this.credentials.email,
                 password: this.credentials.password
             }

             auth.login(this, credentials, 'dashboard')
         }
     }
 }
</script>
