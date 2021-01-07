import {LOG_IN, LOG_OUT} from "../types/typesUser";

export const logInAction = (name, email) => {
    return {
        type: LOG_IN,
        payload: {
            user: {
                name,
                email
            }
        }
    }
}

export const logOutAction = () => {
    return {type: LOG_OUT}
}