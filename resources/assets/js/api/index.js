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

/**
 * Sets the authorisation header
 */
export function setHeaders(){
    Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost';
    Vue.http.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('id_token');
}

/**
 * Retrieves all available recipes
 * @return {Promise}
 */
export function getRecipes(){
    return Vue.http.get(API_URL+'recipes');
}

/**
 * Saves a recipe
 * @param {object} $recipe
 * @return {Promise}
 */
export function saveRecipe(recipe){
    setHeaders();
    return Vue.http.post(API_URL+'recipe', recipe);
}
