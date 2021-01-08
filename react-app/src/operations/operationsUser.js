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
        const status = error.response.status
        const message = status===404 ? "Credentials don't match" : (
            status===500 ? "Issue with server" : ''
        )
        return {
            success: false,
            message
        }
    }
}