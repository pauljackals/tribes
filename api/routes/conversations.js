const express = require('express');
const router = express.Router();

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

router.get('/filters', async (req, res) => {
    const world = req.query.world;
    const user = req.query.user;
    const conversations = await Conversation.find({world, users: user}).populate('users', 'name').populate('world', 'id').populate({path: 'messages', populate: {path: 'user', select: 'name'}})
    return res.send({conversations});
});

router.post('/', async (req, res) => {
    const body = req.body
    const users = body.idsUsers;
    const world = body.idWorld
    const title = body.title
    const conversationNew = new Conversation({
        users,
        world,
        title
    });
    const conversation = await conversationNew.save().then(c => c.populate('users', 'name').populate('world', 'id').execPopulate())
    return res.send({conversation})
});

router.patch('/:idConversation/invite', async (req, res) => {
    const idConversation = req.params.idConversation
    const idUser = req.body.idUser
    const conversation = await Conversation.findByIdAndUpdate(idConversation, {$push: {
        users: idUser
    }}, {new: true}).populate('users', 'name')
    return res.send({conversation});
});

router.patch('/:idConversation/kick', async (req, res) => {
    const idConversation = req.params.idConversation
    const idUser = req.body.idUser
    const conversation = await Conversation.findByIdAndUpdate(idConversation, {$pull: {
            users: idUser
        }}, {new: true}).populate('users', 'name')
    return res.send({conversation});
});

router.patch('/:idConversation/title', async (req, res) => {
    const idConversation = req.params.idConversation
    const title = req.body.title
    const conversation = await Conversation.findByIdAndUpdate(idConversation, {title}, {new: true})
    return res.send({conversation});
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const conversation = await Conversation.findByIdAndDelete(id)
    await Message.deleteMany({conversation: conversation._id})

    return res.send({conversation})
})

module.exports = router;
