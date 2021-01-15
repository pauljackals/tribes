import {getApiUrl} from "../functions";
import {WORLDS_GET_FAILURE, WORLDS_GET_REQUEST, WORLDS_GET_SUCCESS} from "../types/typesWorlds";
import {createAction} from "redux-api-middleware";

export const fetchWorldsOperation = () => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/worlds`),
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            WORLDS_GET_REQUEST,
            WORLDS_GET_SUCCESS,
            WORLDS_GET_FAILURE]
    }));