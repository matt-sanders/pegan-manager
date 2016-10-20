import * as types from '../mutation-types';
import {parseResponse} from './utils.js';
import {router} from '../../app';
import * as Api from '../../api';
import * as utils from './utils';

/**
* Logs a user in
* @param {object} creds
* @param {string} redirect
*/
export function login({dispatch}, creds, redirect = false ){
    Api.login(creds)
        .then( response => {
            let body = parseResponse(response);
            //save the token for later
            localStorage.setItem('id_token', body.token);
            
            //update the store
            setAuth({dispatch}, true);
            setAuthErr({dispatch}, false);

            //redirect if we need to
            if ( redirect ) {
                router.go(redirect);
            }
        }, response => {
            let body = parseResponse(response);
            setAuth({dispatch}, false);
            setAuthErr({dispatch}, body.error);
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
 * Should detect 401 errors and log the user out
 * @param {object} response
 */
export function handleError({dispatch}, response){
    if ( response.status == '401' ){
        logout({dispatch});
    }
}

/**
 * Checks whether the user has a current token
 */
export function checkAuth({dispatch}){
    let jwt = localStorage.getItem('id_token');
    let currentTime = new Date().getTime();
    let isExpired = jwt ? utils.decodeBase64(jwt.split('.')[1]).exp < currentTime : true;
    if ( isExpired ){
        localStorage.removeItem('id_token');
        setAuth({dispatch}, false);
        router.go('/login');
    } else {
        setAuth({dispatch}, true);
    }
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
