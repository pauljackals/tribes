import {VILLAGE_GET_SUCCESS, VILLAGE_PATCH_SUCCESS} from "../types/typesVillage";

const INITIAL_STATE = {
    _id: '',
    location: {
        x: -1,
        y: -1
    },
    user: {
        _id: '',
        name: ''
    },
    world: {
        _id: '',
        id: -1
    },
    name: ''
}

const reducerVillage = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case VILLAGE_GET_SUCCESS: {
            return action.payload.village
        } case VILLAGE_PATCH_SUCCESS: {
            return {...state, ...action.payload}
        } default: {
            return state
        }
    }
}

export default reducerVillage