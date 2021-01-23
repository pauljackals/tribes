const { Schema, model } = require('mongoose');

const worldSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    size: {
        type: Number,
        default: 10
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    villages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Village'
        }
    ]
});

module.exports = model('World', worldSchema);