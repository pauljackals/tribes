const express = require('express');
const router = express.Router();

const World = require('../models/World');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Village = require('../models/Village');
const User = require('../models/User');

router.get('/', async (req, res) => {
    const worlds = await World.find().select('-villages -users -size')
    return res.send({worlds});
});

router.get('/:id', async (req, res) => {
    const world = await World.findById(req.params.id).populate('users', '-email -worlds').populate('villages', '-world')
    return res.send({world});
});

router.post('/', async (req, res) => {
    const body = req.body;
    const worldNew = new World({
        id: body.id
    });
    try {
        const world = await worldNew.save()
        return res.send({world: {__v: world.__v, _id: world._id, id: world.id}});
    } catch (e) {
        return res.status(409).send({error: e})
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const world = await World.findByIdAndDelete(id).select('id')

    const conversations = await Conversation.find({world: world._id})
    await Conversation.deleteMany({world: world._id})
    await Message.deleteMany({conversation: {$in: conversations.map(c => c._id)}});
    await Village.deleteMany({world: world._id})
    await User.updateMany({worlds: world._id}, {$pull: {worlds: world._id}})
    return res.send({world})
})

module.exports = router;
