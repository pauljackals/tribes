const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    time: {
        required: true,
        type: Date
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = model('Message', messageSchema);