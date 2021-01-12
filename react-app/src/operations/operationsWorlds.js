import axios from "axios";
import {setWorldsAction, setWorldAction} from "../actions/actionsWorlds";
import {getApiUrl} from "../functions";
import {generateBoardAction, boardAddVillagesAction} from "../actions/actionsBoard";

export const fetchWorldsOperation = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/worlds')
        dispatch(setWorldsAction(response.data.worlds))
        return {
            success: true
        }
    } catch (error) {
        console.log("fetchWorlds operation error")
        return {
            success: false
        }
    }
}

export const playWorldOperation = idWorld => dispatch => {
    axios.get(getApiUrl(`/worlds/${idWorld}`))
        .then(res => {
            const world = res.data.world
            dispatch(setWorldAction(world))
            dispatch(generateBoardAction(world.size))
            dispatch(boardAddVillagesAction(world.villages))
        }).catch(() => {
        console.log("playWorld operation error")
    })
}