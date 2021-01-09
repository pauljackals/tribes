import axios from "axios";
import {setWorldsAction} from "../actions/actionsWorlds";

export const fetchWorldsOperation = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/worlds')
        dispatch(setWorldsAction(response.data.worlds))
        return {
            success: true
        }
    } catch (error) {
        console.log("Worlds fetch operation error")
        return {
            success: false
        }
    }
}