import {LOG_IN, LOG_OUT} from "../types/typesUser";

const INITIAL_STATE = {
    id: '',
    name: '',
    email: '',
    loggedIn: false
}

const reducerUser = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN: {
            const user = action.payload.user
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                loggedIn: true
            }
        } case LOG_OUT: {
            return INITIAL_STATE
        } default: {
            return state
        }
    }
}

export default reducerUser