import axios from 'axios'
import {createAction} from "redux-api-middleware";
import {joinWorldAction} from "../actions/actionsUser";
import {getApiUrl} from "../functions";
import {
    LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "../types/typesUser";

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
                payload: (action, state, res) => {
                    return {
                        errors: {
                            email: res.status===404
                        }
                    }
                }
            },
        ]
    }))

export const registerOperation = (name, email) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl('/users'),
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email}),
        types: [
            REGISTER_REQUEST,
            {
                type: REGISTER_SUCCESS,
                payload: async (action, state, res) => {
                    const body = await res.json()
                    return {user: body.user}
                }
            },
            {
                type: REGISTER_FAILURE,
                payload: async (action, state, res) => {
                    const body = await res.json()
                    const errors = body.error.keyPattern
                    return {
                        errors: {
                            email: !!errors.email,
                            name: !!errors.name
                        }
                    }
                }
            },
        ]
    }))

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