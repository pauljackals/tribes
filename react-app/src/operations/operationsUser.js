import axios from 'axios'
import {logInAction} from "../actions/actionsUser";

const commonLogIn = (dispatch, response) => {
    const user = response.data.user
    dispatch(logInAction(user._id, user.name, user.email, user.worlds))
    return {
        success: true
    }
}

export const logInOperation = email => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/users/login/${email}`)
        return commonLogIn(dispatch, response)

    } catch (error) {
        console.log("LogIn operation error")
        const response = error.response
        return {
            success: false,
            status: response ? response.status : response,
        }
    }
}

export const registerOperation = (name, email) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/users', {name, email})
        return commonLogIn(dispatch, response)

    } catch (error) {
        console.log("Register operation error")
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