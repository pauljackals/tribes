import {SET_VILLAGE, RESET_VILLAGE, SET_VILLAGE_NAME} from "../types/typesVillage";

export const setVillageAction = village => {
    return {type: SET_VILLAGE, payload: {village}}
}
export const resetVillageAction = () => {
    return {type: RESET_VILLAGE}
}
export const setVillageNameAction = name => {
    return {type: SET_VILLAGE_NAME, payload: {name}}
}