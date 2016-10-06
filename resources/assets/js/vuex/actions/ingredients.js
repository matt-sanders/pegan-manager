import {SET_INGREDIENTS, ADD_INGREDIENT} from '../mutation-types';
import {parseResponse} from './utils.js';
import * as Api from '../../api';

/**
 * Should retrieve all ingredients
 */
export function setIngredients({dispatch}){
    Api.getIngredients()
        .then( response => {
            let body = parseResponse(response);
            dispatch(SET_INGREDIENTS, body.ingredients);
        }, response => {

        });
}

/**
 * Should add a new ingredient
 */
export function saveIngredient({dispatch}, ingredient){
    Api.saveIngredient(ingredient)
        .then( response => {
            let body = parseResponse(response);
            dispatch(ADD_INGREDIENT, body.ingredient);
        }, response => {

        });
}
