import {LOG_IN, LOG_OUT} from "../types/typesUser";

export const logInAction = (id, name, email, worlds) => {
    return {
        type: LOG_IN,
        payload: {
            user: {
                id,
                name,
                email,
                worlds
            }
        }
    }
}

export const logOutAction = () => {
    return {type: LOG_OUT}
}