const express = require('express');
const router = express.Router();

const World = require('../models/World');

router.get('/', async (req, res) => {
    World.find((error, worlds) => {
        return res.send({worlds});
    })
});

module.exports = router;
