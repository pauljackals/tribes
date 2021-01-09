import {LOG_IN, LOG_OUT, JOIN_WORLD} from "../types/typesUser";

const INITIAL_STATE = {
    id: '',
    name: '',
    email: '',
    loggedIn: false,
    worlds: []
}

const reducerUser = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN: {
            const user = action.payload.user
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                loggedIn: true,
                worlds: user.worlds
            }
        } case LOG_OUT: {
            return INITIAL_STATE
        } case JOIN_WORLD: {
            return {...state, worlds: [...state.worlds, action.payload._id]}
        } default: {
            return state
        }
    }
}

export default reducerUser