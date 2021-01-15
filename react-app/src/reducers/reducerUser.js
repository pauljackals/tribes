import {LOG_OUT, JOIN_WORLD, USER_CLEAR_ERRORS, LOG_IN_SUCCESS, LOG_IN_FAILURE} from "../types/typesUser";

const INITIAL_STATE = {
    user: {
        id: '',
        name: '',
        email: '',
        loggedIn: false,
        worlds: []
    },
    errors: {
        email: false
    }
}

const reducerUser = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    loggedIn: true
                }
            }
        } case LOG_IN_FAILURE: {
            return {...state, errors: {...INITIAL_STATE.errors, ...action.payload.errors}}

        } case LOG_OUT: {
            return INITIAL_STATE
        } case JOIN_WORLD: {
            return {
                ...state,
                user: {
                    ...state.user,
                    worlds: [...state.user.worlds, action.payload._id]
                }
            }
        } case USER_CLEAR_ERRORS: {
            return {...state, errors: INITIAL_STATE.errors}
        } default: {
            return state
        }
    }
}

export default reducerUser