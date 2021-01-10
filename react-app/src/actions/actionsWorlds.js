import {SET_WORLDS, SET_WORLD} from "../types/typesWorlds";

export const setWorldsAction = worlds => {
    return {
        type: SET_WORLDS,
        payload: {worlds}
    }
}

export const setWorldAction = world => {
    return {
        type: SET_WORLD,
        payload: {world}
    }
}