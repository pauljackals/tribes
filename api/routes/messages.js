const express = require('express');
const router = express.Router();

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

router.post('/', async (req, res) => {
    const body = req.body
    const user = body.idUser;
    const conversation = body.idConversation
    const content = body.content
    const time = body.time
    const messageNew = new Message({
        user,
        conversation,
        content,
        time
    });
    const message = await messageNew.save().then(m => m.populate('user', 'name').execPopulate())
    await Conversation.findByIdAndUpdate(conversation, {$push: {
            messages: message._id,
        }})
    return res.send({message});
});

module.exports = router;
