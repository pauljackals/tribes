import axios from 'axios'
import {logInAction} from "../actions/actionsUser";

export const logInOperation = email => async dispatch => {
    // await axios.get(`http://localhost:5000/users/login/${email}`).then(res => {
    //     const user = res.data.user
    //     dispatch(logInAction(user._id, user.name, user.email))
    //
    // }).catch(() => {
    //     console.log("LogIn operation error")
    // })
    try {
        const response = await axios.get(`http://localhost:5000/users/login/${email}`)
        const user = response.data.user
        dispatch(logInAction(user._id, user.name, user.email))
        return {
            success: true
        }
    } catch (error) {
        console.log("LogIn operation error")
        return {
            success: false,
            status: error.response.status
        }
    }
}

export const registerOperation = (name, email) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/users', {name, email})
        const user = response.data.user
        dispatch(logInAction(user._id, user.name, user.email))
        return {
            success: true
        }
    } catch (error) {
        console.log("Register operation error")
        const response = error.response
        const status = response.status
        const keyPattern = status===409 ? response.data.error.keyPattern :
            {}
        return {
            success: false,
            status,
            error: keyPattern
        }
    }
}