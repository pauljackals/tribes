import {getApiUrl} from "../functions";
import {createAction} from "redux-api-middleware";
import {
    VILLAGE_GET_SUCCESS,
    VILLAGE_GET_FAILURE,
    VILLAGE_GET_REQUEST,
    VILLAGE_PATCH_SUCCESS,
    VILLAGE_PATCH_FAILURE,
    VILLAGE_PATCH_REQUEST
} from "../types/typesVillage";

export const getVillageDetailsOperation = idVillage => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/villages/${idVillage}/details`),
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            VILLAGE_GET_REQUEST,
            VILLAGE_GET_SUCCESS,
            VILLAGE_GET_FAILURE]
    }));

export const patchVillageNameOperation = (idVillage, name) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/villages/${idVillage}`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
        types: [
            VILLAGE_PATCH_REQUEST,
            {
                type: VILLAGE_PATCH_SUCCESS,
                payload: async (action, state, res) => {
                    const body = await res.json()
                    return {name: body.village.name}
                }
            },
            VILLAGE_PATCH_FAILURE]
    }));