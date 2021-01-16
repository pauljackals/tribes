import {LOG_OUT, USER_CLEAR_ERRORS,
    LOG_IN_SUCCESS, LOG_IN_FAILURE,
    REGISTER_SUCCESS, REGISTER_FAILURE,
    JOIN_WORLD_SUCCESS
} from "../types/typesUser";

const INITIAL_STATE = {
    user: {
        _id: '',
        name: '',
        email: '',
        loggedIn: false,
        worlds: [],
        admin: false
    },
    errors: {
        email: false,
        name: false
    }
}

const reducerUser = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    loggedIn: true
                }
            }
        } case REGISTER_FAILURE:
        case LOG_IN_FAILURE: {
            return {...state, errors: {...INITIAL_STATE.errors, ...action.payload.errors}}

        } case USER_CLEAR_ERRORS: {
            return {...state, errors: INITIAL_STATE.errors}
        } case LOG_OUT: {
            return INITIAL_STATE
        } case JOIN_WORLD_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    worlds: [...state.user.worlds, action.payload.world]
                }
            }
        } default: {
            return state
        }
    }
}

export default reducerUser