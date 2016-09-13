import Vue from 'vue';
import {API_URL} from '../constants'

/**
* Makes a request to the login url
* @param {object} creds
* @return {Promise}
*/
export function login(creds){
    return Vue.http.post(API_URL+'authenticate', creds);
}
