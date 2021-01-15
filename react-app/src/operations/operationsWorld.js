import {getApiUrl} from "../functions";
import {createAction} from "redux-api-middleware";
import {WORLD_GET_SUCCESS, WORLD_GET_FAILURE, WORLD_GET_REQUEST} from "../types/typesWorld";

export const playWorldOperation = idWorld => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/worlds/${idWorld}`),
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            WORLD_GET_REQUEST,
            WORLD_GET_SUCCESS,
            WORLD_GET_FAILURE]
    }));