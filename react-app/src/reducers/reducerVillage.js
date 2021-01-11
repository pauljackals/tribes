import {SET_VILLAGE, RESET_VILLAGE, SET_VILLAGE_NAME} from "../types/typesVillage";

const INITIAL_STATE = {
    __v: -1,
    _id: '',
    location: {
        x: -1,
        y: -1
    },
    user: {
        __v: -1,
        _id: '',
        name: ''
    },
    world: {
        __v: -1,
        _id: '',
        id: 0
    }
}

const reducerVillage = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_VILLAGE: {
            return action.payload.village
        } case RESET_VILLAGE: {
            return INITIAL_STATE
        } case SET_VILLAGE_NAME: {
            return {...state, name: action.payload.name}
        } default: {
            return state
        }
    }
}

export default reducerVillage