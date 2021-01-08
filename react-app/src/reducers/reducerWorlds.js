import {SET_WORLDS} from "../types/typesWorlds";

const reducerWorlds = (state=[], action) => {
    switch (action.type) {
        case SET_WORLDS: {
            return action.payload.worlds
        } default: {
            return state
        }
    }
}

export default reducerWorlds