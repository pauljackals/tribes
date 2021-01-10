import {SET_VILLAGE} from "../types/typesVillage";

export const setVillageAction = village => {
    return {type: SET_VILLAGE, payload: {village}}
}