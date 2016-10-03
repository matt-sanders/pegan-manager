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
            console.log(body.recipes);
            dispatch(types.SET_RECIPES, body.recipes);
        }, response => {
            
        });
}
