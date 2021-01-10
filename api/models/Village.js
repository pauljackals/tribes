const { Schema, model } = require('mongoose');

const villageSchema = new Schema({
    name: String,
    world: {
        type: Schema.Types.ObjectId,
        ref: 'World'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    }
});

module.exports = model('Village', villageSchema);