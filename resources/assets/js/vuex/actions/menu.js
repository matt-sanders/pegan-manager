import {SET_MENU} from '../mutation-types';

/**
 * Switches the menu state
 */
export function setMenu({dispatch}, active){
    dispatch(SET_MENU, active);
}
