import Vue from 'vue';
import {API_URL, ORIGIN} from '../constants'

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
    Vue.http.headers.common['Access-Control-Allow-Origin'] = ORIGIN;
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

/**
 * Updates a recipe
 * @param {Object} $recipe
 * @return {Promise}
 */
export function updateRecipe(recipe){
    setHeaders();
    return Vue.http.put(API_URL+'recipe/'+recipe._id, recipe);
}

/**
 * Deletes a recipe
 * @param {String} $recipeID
 */
export function deleteRecipe(recipeID){
    setHeaders();
    return Vue.http.delete(API_URL+'recipe/'+recipeID);
}

/**
 * Retrieves all ingredients
 * @return {Promise}
 */
export function getIngredients(){
    return Vue.http.get(API_URL+'ingredients');
}

/**
 * Saves an ingredient
 * @param {object} $ingredient
 * @return {Promise}
 */
export function saveIngredient(ingredient){
    setHeaders();
    return Vue.http.post(API_URL+'ingredient', ingredient);
}
