import {router} from '../app';
import * as Api from '../api';
export default {
    user: {
        authenticated: false
    },

    /**
     * logs the user in
     *
     * @param object $context
     * @param object $creds
     * @param string $redirect
     */
    login(context, creds, redirect){
        Api.login(creds)
            .then((response) => {
                localStorage.setItem('id_token', response.data.token);
                this.user.authenticated = true;

                if ( redirect ){
                    router.go(redirect);
                }
                
            }, (response) => {
                context.error = response.body.error;
            });
    },

    /**
     * logs the user out
     */
    logout(){
        localStorage.removeItem('id_token');
        this.user.authenticated = false;
        router.go('/login');
    },

    /**
     * Checks whether the user has a current token and updates the model
     */
    checkAuth() {
        var jwt = localStorage.getItem('id_token');
        if (jwt) {
            this.user.authenticated = true;
        } else {
            this.user.authenticated = false;
        }
    }
};
