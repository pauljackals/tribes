const { Schema, model } = require('mongoose');

const worldSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = model('World', worldSchema);