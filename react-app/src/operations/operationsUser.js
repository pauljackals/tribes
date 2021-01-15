import axios from 'axios'
import {createAction} from "redux-api-middleware";
import {logInAction, joinWorldAction} from "../actions/actionsUser";
import {getApiUrl} from "../functions";
import {LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS} from "../types/typesUser";

const commonLogIn = (dispatch, response, email) => {
    const user = response.data.user
    dispatch(logInAction({...user, email}))
    return {
        success: true
    }
}

export const logInOperation = email => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/users/login/${email}`),
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            LOG_IN_REQUEST,
            {
                type: LOG_IN_SUCCESS,
                payload: async (action, state, res) => {
                    const body = await res.json()
                    return {user: {...body.user, email}}
                }
            },
            {
                type: LOG_IN_FAILURE,
                payload: async (action, state, res) => {
                    return {
                        errors: {
                            email: !!res.status
                        }
                    }
                }
            },
        ]
    }))

export const registerOperation = (name, email) => async dispatch => {
    try {
        const response = await axios.post(getApiUrl('/users'), {name, email})
        return commonLogIn(dispatch, response, email)

    } catch (error) {
        console.log("register operation error")
        const response = error.response
        const status = response ? response.status : response
        const keyPattern = status===409 ? response.data.error.keyPattern :
            {}
        return {
            success: false,
            status,
            error: keyPattern
        }
    }
}

export const joinWorldOperation = (idUser, idWorld) => async dispatch => {
    try {
        await axios.post(getApiUrl(`/villages`), {idUser, idWorld})
        dispatch(joinWorldAction(idWorld))
        return {
            success: true
        }
    } catch {
        console.log("joinWorld operation error")
        return {
            success: false
        }
    }
}