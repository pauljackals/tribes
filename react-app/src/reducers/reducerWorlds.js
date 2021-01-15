import {SET_WORLD, WORLDS_GET_SUCCESS} from "../types/typesWorlds";

const reducerWorlds = (state=[], action) => {
    switch (action.type) {
        case WORLDS_GET_SUCCESS: {
            return action.payload.worlds
        } case SET_WORLD: {
            const worldPayload = action.payload.world
            return state.map(world => world._id===worldPayload._id ? worldPayload : world)
        } default: {
            return state
        }
    }
}

export default reducerWorlds