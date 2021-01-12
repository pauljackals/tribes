import {CONVERSATIONS_SUCCESS} from "../types/typesConversations";

const reducerConversations = (state=[], action) => {
    switch (action.type) {
        case CONVERSATIONS_SUCCESS: {
            return action.payload.conversations
        } default: {
            return state
        }
    }
}

export default reducerConversations