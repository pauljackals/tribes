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

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const message = await Message.findByIdAndDelete(id)
    await Conversation.findByIdAndUpdate(message.conversation, {$pull: {
            messages: message._id,
        }})
    return res.send({message});
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const content = req.body.content
    const message = await Message.findByIdAndUpdate(id, {content}, {new: true})
    return res.send({message});
});

module.exports = router;
