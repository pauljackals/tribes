import {SET_CONVERSATIONS} from "../types/typesConversations";

const reducerConversations = (state=[], action) => {
    switch (action.type) {
        case SET_CONVERSATIONS: {
            return action.payload.conversations
        } default: {
            return state
        }
    }
}

export default reducerConversations