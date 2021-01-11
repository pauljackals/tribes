const express = require('express');
const router = express.Router();

const User = require('../models/User');
const World = require('../models/World')
const Village = require('../models/Village')

router.post('/', async (req, res) => {
    const idUser = req.body.idUser;
    const idWorld = req.body.idWorld;

    const world = await World.findById(idWorld).select('villages size').populate('villages')
    const size = world.size
    const locationsTaken = world.villages.map(village => village.location)
    const locationsFree = Array(size).fill([]).map(
        (x, indexX) => Array(size).fill({}).map(
            (y, indexY) => ({x: indexX, y: indexY})
        )
    ).flat().filter(location => !locationsTaken.find(locationTaken => locationTaken.x===location.x && locationTaken.y===location.y))

    const getRandomIntInclusive = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const location = locationsFree[getRandomIntInclusive(0, locationsFree.length-1)]

    const villageNew = new Village({
        user: idUser,
        world: idWorld,
        location
    });
    const village = await villageNew.save()
    await World.findByIdAndUpdate(idWorld, {$push: {
            villages: village._id,
            users: idUser
        }})
    await User.findByIdAndUpdate(idUser, {$push: {
            worlds: idWorld,
        }})
    return res.send({village})
})

router.get('/:id/details', async (req, res) => {
    const id = req.params.id
    const village = await Village.findById(id).populate('world user', '-villages -users -size -email -worlds')
    return res.send({village})
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const village = await Village.findByIdAndUpdate(id, {name: (name===undefined ? null : name)}, {new: true}).populate('world user', '-villages -users -size -email -worlds')
    return res.send({village})
})

module.exports = router;
