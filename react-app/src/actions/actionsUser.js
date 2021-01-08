import {LOG_IN, LOG_OUT} from "../types/typesUser";

export const logInAction = (id, name, email) => {
    return {
        type: LOG_IN,
        payload: {
            user: {
                id,
                name,
                email
            }
        }
    }
}

export const logOutAction = () => {
    return {type: LOG_OUT}
}