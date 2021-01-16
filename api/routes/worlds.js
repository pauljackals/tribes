const express = require('express');
const router = express.Router();

const World = require('../models/World');

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
        size: body.size,
        id: body.id
    });
    const world = await worldNew.save()
    return res.send({world: {__v: world.__v, _id: world._id, id: world.id}});
});

module.exports = router;
