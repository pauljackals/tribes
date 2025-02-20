const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Village = require('../models/Village');
const World = require('../models/World');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

router.get('/login/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({email}).select('-email')
    const status = user===null ? 404 : 200
    return res.status(status).send({user});
});

router.get('/', async (req, res) => {
    const users = await User.find().select('name')
    return res.send({users});
});

router.post('/', async (req, res) => {
    const body = req.body;
    const userNew = new User({
        name: body.name,
        email: body.email
    });
    userNew.save( (error, user) => {
        if(error){
            return res.status(409).send({error});
        }
        return res.send({user});
    })
});

router.patch('/:idUser/leave', async (req, res) => {
    const idUser = req.params.idUser
    const idWorld = req.body.idWorld

    const user = await User.findByIdAndUpdate(idUser, {$pull: {worlds: idWorld}}, {new: true})
    const villages = await Village.find({user: user._id, world: idWorld})
    await Village.deleteMany({user: user._id, world: idWorld})
    await World.findByIdAndUpdate(idWorld, {$pull: {users: user._id, villages: {$in: villages.map(v => v._id)}}})
    await Conversation.updateMany({world: idWorld, users: user._id}, {$pull: {users: user._id}})

    return res.send({user})
})

router.patch('/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    const name = body.name
    const email = body.email
    try {
        const user = await User.findByIdAndUpdate(id, {name, email}, {new: true})
        return res.send({user})
    } catch (error) {
        return res.status(409).send({error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findByIdAndDelete(id)
    const villages = await Village.find({user: user._id})
    await Village.deleteMany({user: user._id})
    await World.updateMany({users: user._id}, {$pull: {villages: {$in: villages.map(v => v._id)}, users: user._id}})
    const messages = await Message.find({user: user._id})
    await Message.deleteMany({user: user._id})
    await Conversation.updateMany({users: user._id}, {$pull: {messages: {$in: messages.map(m => m._id)}, users: user._id}})

    return res.send({user})
})

router.patch('/:name/admin', async (req, res) => {
    const name = req.params.name
    const admin = req.body.admin
    const user = await User.updateOne({name}, {admin})
    const status = !user.nModified ? 404 : 200
    return res.status(status).send({user})
})

module.exports = router;
