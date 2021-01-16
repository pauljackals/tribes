import {WORLDS_GET_SUCCESS, WORLDS_CREATE_SUCCESS, WORLDS_DELETE_SUCCESS} from "../types/typesWorlds";

const reducerWorlds = (state=[], action) => {
    switch (action.type) {
        case WORLDS_GET_SUCCESS: {
            return action.payload.worlds
        } case WORLDS_CREATE_SUCCESS: {
            return [...state, action.payload.world]
        } case WORLDS_DELETE_SUCCESS: {
            return state.filter(world => world._id!==action.payload.world._id)
        } default: {
            return state
        }
    }
}

export default reducerWorlds