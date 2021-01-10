import {LOG_IN, LOG_OUT, JOIN_WORLD} from "../types/typesUser";

export const logInAction = (user) => {
    return {
        type: LOG_IN,
        payload: {user}
    }
}

export const logOutAction = () => {
    return {type: LOG_OUT}
}

export const joinWorldAction = _id => {
    return {type: JOIN_WORLD, payload: {_id}}
}