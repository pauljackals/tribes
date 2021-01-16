import {
    CONVERSATIONS_SUCCESS,
    SEND_MESSAGE_SUCCESS, DELETE_MESSAGE_SUCCESS, UPDATE_MESSAGE_SUCCESS,
    USER_KICK_SUCCESS, USER_INVITE_SUCCESS,
    EDIT_TITLE_SUCCESS,
    CREATE_CONVERSATION_SUCCESS
} from "../types/typesConversations";

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
        } case DELETE_MESSAGE_SUCCESS: {
            const message = action.payload.message
            return state.map(conversation =>
                conversation._id===message.conversation ?
                    {...conversation, messages: conversation.messages.filter(msg => msg._id!==message._id)} :
                    conversation
            )
        } case UPDATE_MESSAGE_SUCCESS: {
            const message = action.payload.message
            return state.map(conversation =>
                conversation._id===message.conversation ?
                    {...conversation, messages: conversation.messages.map(msg =>
                            msg._id===message._id ?
                                {...msg, content: message.content} :
                                msg
                        )} :
                    conversation
            )
        } case USER_KICK_SUCCESS:
        case USER_INVITE_SUCCESS: {
            const conversation = action.payload.conversation
            return state.map(conv => conv._id===conversation._id ?
                {...conv, users: conversation.users} :
                conv
            )
        } case EDIT_TITLE_SUCCESS: {
            const conversation = action.payload.conversation
            return state.map(conv => conv._id===conversation._id ?
                {...conv, title: conversation.title} :
                conv
            )
        } case CREATE_CONVERSATION_SUCCESS: {
            const conversation = action.payload.conversation
            return [...state, conversation]
        } default: {
            return state
        }
    }
}

export default reducerConversations