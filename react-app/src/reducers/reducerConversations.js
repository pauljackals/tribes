import {CONVERSATIONS_SUCCESS, SEND_MESSAGE_SUCCESS} from "../types/typesConversations";

const reducerConversations = (state=[], action) => {
    switch (action.type) {
        case CONVERSATIONS_SUCCESS: {
            return action.payload.conversations
        } case SEND_MESSAGE_SUCCESS: {
            const message = action.payload.message
            return state.map(conversation =>
                conversation._id===message.conversation ?
                    {...conversation, messages: [...conversation.messages, message]} :
                    conversation
            )
        } default: {
            return state
        }
    }
}

export default reducerConversations