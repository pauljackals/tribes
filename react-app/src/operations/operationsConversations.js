import {getApiUrl} from "../functions";
import {createAction} from "redux-api-middleware";
import {
    CONVERSATIONS_FAILURE, CONVERSATIONS_REQUEST, CONVERSATIONS_SUCCESS,
    SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE, DELETE_MESSAGE_REQUEST, DELETE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_FAILURE, UPDATE_MESSAGE_REQUEST, UPDATE_MESSAGE_SUCCESS,
    USER_INVITE_FAILURE, USER_INVITE_REQUEST, USER_INVITE_SUCCESS,
    USER_KICK_FAILURE, USER_KICK_REQUEST, USER_KICK_SUCCESS
} from "../types/typesConversations";

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
            CONVERSATIONS_FAILURE
        ]
    }));

export const sendMessageOperation = (idUser, idConversation, content, time) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/messages`),
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser,
            idConversation,
            content,
            time
        }),
        types: [
            SEND_MESSAGE_REQUEST,
            SEND_MESSAGE_SUCCESS,
            SEND_MESSAGE_FAILURE
        ]
    }));

export const deleteMessageOperation = id => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/messages/${id}`),
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            DELETE_MESSAGE_REQUEST,
            DELETE_MESSAGE_SUCCESS,
            DELETE_MESSAGE_FAILURE
        ]
    }));

export const updateMessageOperation = (id, content) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/messages/${id}`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content}),
        types: [
            UPDATE_MESSAGE_REQUEST,
            UPDATE_MESSAGE_SUCCESS,
            UPDATE_MESSAGE_FAILURE
        ]
    }));

export const inviteUserOperation = (idConversation, idUser) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/conversations/${idConversation}/invite`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idUser}),
        types: [
            USER_INVITE_REQUEST,
            USER_INVITE_SUCCESS,
            USER_INVITE_FAILURE
        ]
    }));

export const kickUserOperation = (idConversation, idUser) => dispatch =>
    dispatch(createAction({
        endpoint: getApiUrl(`/conversations/${idConversation}/kick`),
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idUser}),
        types: [
            USER_KICK_REQUEST,
            USER_KICK_SUCCESS,
            USER_KICK_FAILURE
        ]
    }));