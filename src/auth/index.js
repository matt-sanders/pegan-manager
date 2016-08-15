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
                console.log("passed")
            }, (response) => {
                console.log("not passed")
                context.error = response.data.error
            })
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
