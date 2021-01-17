import {createAction} from "redux-api-middleware";
import {getApiUrl} from "../functions";
import {
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    JOIN_WORLD_FAILURE,
    JOIN_WORLD_REQUEST,
    JOIN_WORLD_SUCCESS,
    LEAVE_WORLD_FAILURE,
    LEAVE_WORLD_REQUEST,
    LEAVE_WORLD_SUCCESS,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    EDIT_PROFILE_REQUEST,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
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
            REGISTER_SUCCESS,
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

export const joinWorldOperation = (idUser, idWorld) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl('/villages'),
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idWorld, idUser}),
        types: [
            JOIN_WORLD_REQUEST,
            {
                type: JOIN_WORLD_SUCCESS,
                payload: async (action, state, res) => {
                    const body = await res.json()
                    return {world: body.village.world}
                }
            },
            JOIN_WORLD_FAILURE
        ]
    }))

export const leaveWorldOperation = (idUser, idWorld) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/users/${idUser}/leave`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idWorld}),
        types: [
            LEAVE_WORLD_REQUEST,
            LEAVE_WORLD_SUCCESS,
            LEAVE_WORLD_FAILURE
        ]
    }))

export const editProfileOperation = (id, name, email) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/users/${id}`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email}),
        types: [
            EDIT_PROFILE_REQUEST,
            EDIT_PROFILE_SUCCESS,
            {
                type: EDIT_PROFILE_FAILURE,
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
            }
        ]
    }))

export const deleteUserOperation = id => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/users/${id}`),
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            DELETE_USER_REQUEST,
            DELETE_USER_SUCCESS,
            DELETE_USER_FAILURE
        ]
    }))