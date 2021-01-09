import axios from 'axios'
import {logInAction, joinWorldAction} from "../actions/actionsUser";
import {getAxiosUrl} from "../functions";

const commonLogIn = (dispatch, response) => {
    const user = response.data.user
    dispatch(logInAction(user._id, user.name, user.email, user.worlds))
    return {
        success: true
    }
}

export const logInOperation = email => async dispatch => {
    try {
        const response = await axios.get(getAxiosUrl(`/users/login/${email}`))
        return commonLogIn(dispatch, response)

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
        return commonLogIn(dispatch, response)

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

export const joinWorldOperation = (idUser, idWorld) => dispatch => {
    axios.patch(getAxiosUrl(`/users/${idUser}/world`), {idWorld})
        .then(() => {
            dispatch(joinWorldAction(idWorld))
        }).catch(() => {
            console.log("joinWorld operation error")
        })
}