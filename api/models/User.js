const { Schema, model } = require('mongoose');

const validateEmail = email => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validateEmail
    },
    worlds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'World'
        }
    ],
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = model('User', userSchema);