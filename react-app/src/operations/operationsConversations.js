import axios from "axios";
import {getAxiosUrl} from "../functions";
import {setConversationsAction} from "../actions/actionsConversations";

export const getConversationsOperation = (idUser, idWorld) => dispatch => {
    axios.get(getAxiosUrl(`/conversations/filters?user=${idUser}&world=${idWorld}`))
        .then(res => {
            const conversations = res.data.conversations
            dispatch(setConversationsAction(conversations))
        }).catch(() => {
        console.log("getConversations operation error")
    })
}