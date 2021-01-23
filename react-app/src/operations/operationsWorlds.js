import {getApiUrl} from "../functions";
import {
    WORLDS_GET_FAILURE, WORLDS_GET_REQUEST, WORLDS_GET_SUCCESS,
    WORLDS_CREATE_FAILURE, WORLDS_CREATE_REQUEST, WORLDS_CREATE_SUCCESS,
    WORLDS_DELETE_FAILURE, WORLDS_DELETE_REQUEST, WORLDS_DELETE_SUCCESS
} from "../types/typesWorlds";
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

export const createWorldsOperation = id => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/worlds`),
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
        types: [
            WORLDS_CREATE_REQUEST,
            WORLDS_CREATE_SUCCESS,
            WORLDS_CREATE_FAILURE]
    }));

export const deleteWorldsOperation = id => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/worlds/${id}`),
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            WORLDS_DELETE_REQUEST,
            WORLDS_DELETE_SUCCESS,
            WORLDS_DELETE_FAILURE]
    }));