import {SET_VILLAGE} from "../types/typesVillage";

const reducerVillage = (state={}, action) => {
    switch (action.type) {
        case SET_VILLAGE: {
            return action.payload.village
        } default: {
            return state
        }
    }
}

export default reducerVillage