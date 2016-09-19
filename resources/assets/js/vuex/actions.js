import * as types from './mutation-types';
import {router} from '../app';
import * as Api from '../api';

/**
* Logs a user in
* @param {object} creds
* @param {string} redirect
*/
export function login({dispatch}, creds, redirect = false ){
    console.log('hit');
    Api.login(creds)
        .then( response => {
            //save the token for later
            localStorage.setItem('id_token', response.body.token);
            
            //update the store
            setAuth({dispatch}, true);
            setAuthErr({dispatch}, false);

            //redirect if we need to
            if ( redirect ) {
                router.go(redirect);
            }
        }, response => {
            setAuth({dispatch}, false);
            setAuthErr({dispatch}, response.body.error);
        });
}

/**
 * Logs a user out
 */
export function logout({dispatch}){
    localStorage.removeItem('id_token');
    setAuth({dispatch}, false);
    router.go('/login');
}

/**
 * Checks whether the user has a current token
 */
export function checkAuth({dispatch}){
    let jwt = localStorage.getItem('id_token');
    setAuth({dispatch}, !!jwt);
}

/**
* Set the app state to be authed or not
* @param {boolean} authenticated
*/
export function setAuth({dispatch}, authenticated){
    dispatch(types.SET_AUTH, authenticated);
}

/**
* Set any authentication errors
* @param {string/object/null/boolean} error
*/
export function setAuthErr({dispatch}, error){
    dispatch(types.SET_AUTH_ERR, error);
}
