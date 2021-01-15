import {WORLD_GET_SUCCESS} from "../types/typesWorld";

const INITIAL_STATE = {
    _id: '',
    villages: [],
    users: [],
    id: -1,
    size: -1
}

const reducerWorld = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case WORLD_GET_SUCCESS: {
            return action.payload.world
        } default: {
            return state
        }
    }
}

export default reducerWorld