import * as types from '../mutation-types';
import {parseResponse} from './utils.js';
import {router} from '../../app';
import * as Api from '../../api';

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
        }, response => {
            dispatch(types.RECIPE_ERR, true);
            dispatch(types.SAVING_RECIPE, false);
        });
}
