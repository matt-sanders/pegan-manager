import * as types from '../mutation-types';
import {parseResponse} from './utils.js';
import {router} from '../../app';
import * as Api from '../../api';

/**
 * Should retrieve all the units
 */
export function setUnits({dispatch}){
    Api.getUnits()
        .then( response => {
            let body = parseResponse(response);
            dispatch(types.SET_UNITS, body.units);
        }, response => {

        });
}

/**
 * Should retrieve all recipes
 */
export function setRecipes({dispatch}){
    Api.getRecipes()
        .then( response => {
            let body = parseResponse(response);
            dispatch(types.SET_RECIPES, body.recipes);
        }, response => {
            
        });
}

/**
 * Should save a recipe
 * @param {Object} $recipe
 */
export function saveRecipe({dispatch}, recipe){
    dispatch(types.SAVING_RECIPE, true);
    dispatch(types.RECIPE_ERR, false);
    Api.saveRecipe(recipe)
        .then( response => {
            let body = parseResponse(response);
            dispatch(types.ADD_RECIPE, body.recipe);
            dispatch(types.SAVING_RECIPE, false);
            router.go('/recipe/'+body.recipe._id);
            this.setRecipes();
        }, response => {
            dispatch(types.RECIPE_ERR, true);
            dispatch(types.SAVING_RECIPE, false);
        });
}

/**
 * Should update a recipe
 * @param {Object} $recipe
 */
export function updateRecipe({dispatch}, recipe){
    if ( !recipe._id ) return;
    dispatch(types.SAVING_RECIPE, true);
    dispatch(types.RECIPE_ERR, false);
    Api.updateRecipe(recipe)
        .then( response => {
            let body = parseResponse(response);
            dispatch(types.UPDATE_RECIPE, body.recipe);
            dispatch(types.SAVING_RECIPE, false);
        }, response => {
            dispatch(types.RECIPE_ERR, true);
            dispatch(types.SAVING_RECIPE, false);            
        });        
}

/**
 * Should delete a recipe, then re-retrieve the recipes
 */
export function deleteRecipe({dispatch}, recipe){
    if ( !recipe._id ) return;
    Api.deleteRecipe(recipe._id)
        .then(response => {
            this.setRecipes();
        }, response => {
        });
}
