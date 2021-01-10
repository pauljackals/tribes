import axios from 'axios'
import {logInAction, joinWorldAction} from "../actions/actionsUser";
import {getAxiosUrl} from "../functions";

const commonLogIn = (dispatch, response, email) => {
    const user = response.data.user
    dispatch(logInAction({...user, email}))
    return {
        success: true
    }
}

export const logInOperation = email => async dispatch => {
    try {
        const response = await axios.get(getAxiosUrl(`/users/login/${email}`))
        return commonLogIn(dispatch, response, email)

    } catch (error) {
        console.log("logIn operation error")
        const response = error.response
        return {
            success: false,
            status: response ? response.status : response,
        }
    }
}

export const registerOperation = (name, email) => async dispatch => {
    try {
        const response = await axios.post(getAxiosUrl('/users'), {name, email})
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
        await axios.post(getAxiosUrl(`/villages`), {idUser, idWorld})
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