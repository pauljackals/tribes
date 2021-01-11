const express = require('express');
const router = express.Router();

const Conversation = require('../models/Conversation');

router.get('/filters', async (req, res) => {
    const world = req.query.world;
    const user = req.query.user;
    const conversations = await Conversation.find({world, users: user}).populate('users', 'name')
    return res.send({conversations});
});

router.post('/', async (req, res) => {
    const body = req.body
    const users = body.idsUsers;
    const world = body.idWorld
    const conversationNew = new Conversation({
        users,
        world
    });
    conversationNew.save( (error, conversation) => {
        return res.send({conversation});
    })
});

module.exports = router;
