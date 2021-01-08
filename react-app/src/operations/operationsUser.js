import axios from 'axios'
import {logInAction} from "../actions/actionsUser";

export const logInOperation = email => dispatch => {
    axios.get(`http://localhost:5000/users/login/${email}`).then(res => {
        const user = res.data.user
        dispatch(logInAction(user._id, user.name, user.email))

    }).catch(() => {
        console.log("LogIn operation error")
    })
}