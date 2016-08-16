const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'authenticate'
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
        context.$http.post(LOGIN_URL, creds)
            .then((response) => {

                localStorage.setItem('id_token', response.data.token)
                this.user.authenticated = true
                
            }, (response) => {
                context.error = response.data.error
            })
    },

    /**
     * logs the user out
     */
    logout(){
        //localStorage.removeItem('id_token')
        //this.user.authenticated = false
    },

    /**
     * Checks whether the user has a current token and updates the model
     */
    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
        } else {
            this.user.authenticated = false
        }
    }
}
