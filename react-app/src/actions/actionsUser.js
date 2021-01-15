import {LOG_OUT, USER_CLEAR_ERRORS} from "../types/typesUser";

export const logOutAction = () => {
    return {type: LOG_OUT}
}

export const userClearErrorsAction = () => {
    return {type: USER_CLEAR_ERRORS}
}