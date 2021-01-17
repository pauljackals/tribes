const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Village = require('../models/Village');
const World = require('../models/World');
const Conversation = require('../models/Conversation');

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

    const user = await User.findByIdAndUpdate(idUser, {$pull: {worlds: idWorld}})
    const villages = await Village.find({user: user._id, world: idWorld})
    await Village.deleteMany({user: user._id, world: idWorld})
    await World.findByIdAndUpdate(idWorld, {$pull: {villages: {$in: villages.map(v => v._id)}, users: user._id}})
    await Conversation.updateMany({world: idWorld, users: user._id}, {$pull: {users: user._id}})

    return res.send({user})
})

module.exports = router;
