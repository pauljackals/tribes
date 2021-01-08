import {SET_WORLDS} from "../types/typesWorlds";

export const setWorldsAction = worlds => {
    return {
        type: SET_WORLDS,
        payload: {worlds}
    }
}