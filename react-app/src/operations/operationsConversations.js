import {getApiUrl} from "../functions";
import {createAction} from "redux-api-middleware";
import {CONVERSATIONS_FAILURE, CONVERSATIONS_REQUEST, CONVERSATIONS_SUCCESS} from "../types/typesConversations";

export const getConversationsOperation = (idUser, idWorld) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/conversations/filters?user=${idUser}&world=${idWorld}`),
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            CONVERSATIONS_REQUEST,
            CONVERSATIONS_SUCCESS,
            CONVERSATIONS_FAILURE]
    }));