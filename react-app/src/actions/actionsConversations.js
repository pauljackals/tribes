import {SET_CONVERSATIONS} from '../types/typesConversations'

export const setConversationsAction = conversations => {
    return {type: SET_CONVERSATIONS, payload: {conversations}}
}