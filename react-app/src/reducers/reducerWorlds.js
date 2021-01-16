import {WORLDS_GET_SUCCESS, WORLDS_CREATE_SUCCESS} from "../types/typesWorlds";

const reducerWorlds = (state=[], action) => {
    switch (action.type) {
        case WORLDS_GET_SUCCESS: {
            return action.payload.worlds
        } case WORLDS_CREATE_SUCCESS: {
            return [...state, action.payload.world]
        } default: {
            return state
        }
    }
}

export default reducerWorlds