import axios from "axios";
import {setWorldsAction} from "../actions/actionsWorlds";

export const fetchWorldsOperation = () => dispatch => {
    console.log('fetching worlds')
    axios.get('http://localhost:5000/worlds').then(res => {
        dispatch(setWorldsAction(res.data.worlds))
    }).catch(() => {
        console.log("Worlds fetch operation error")
    })
}