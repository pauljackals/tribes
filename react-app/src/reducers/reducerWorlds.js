import {SET_WORLDS, SET_WORLD} from "../types/typesWorlds";

const reducerWorlds = (state=[], action) => {
    switch (action.type) {
        case SET_WORLDS: {
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