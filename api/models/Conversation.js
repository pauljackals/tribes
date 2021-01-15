const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
    world: {
        type: Schema.Types.ObjectId,
        ref: 'World',
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    title: {
        type: String,
        required: true
    }
});

module.exports = model('Conversation', conversationSchema);